import { bootstrapBadge } from '../badge/message';
import { ConfigurationInjectionTokens } from '../constants/configuration-injection-tokens';
import { ComponentScan, container } from '../ioc';
import { IAppMain } from '../models/app-main.interface';
import { ApplicationTerminator } from './application.terminator';
import { BOOTSTRAPPER_EVENTS, BootstrapperEventManager, CUSTOM_SIGNALS } from './bootstrapper.event.manager';
import { PidManager } from './pid.manager';

/**
 * Manage all the functionalities required to initiate the application.
 *
 * The application initializer handles the following tasks:
 * Retrieve all the Classes registered for the Inversion of Control (IOC).
 * Retrieve and initiate application configuration.
 * Set up the necessary listeners for a smooth termination of the application.
 */
export class ApplicationStarter {
    private applicationTerminator: ApplicationTerminator;
    private pidManager: PidManager;
    private mainApp: IAppMain;

    /**
     * Start the application by executing the necessary steps in the correct sequence.
     *
     * before allowing it to process data from queued messages. It is crucial to maintain
     * the specific order of execution in this context...
     *
     * @param target - The main class of the application, provided by the IOC Container.
     */
    public async applicationStart(target: any): Promise<void> {
        this.initiateApplicationBootstrap(target);
    }

    private async initiateApplicationBootstrap(target: Object): Promise<void> {
        try {
            this.prepareCriticalListeners();
            await this.prepareConfiguration();
            await this.scanClassesForIoc(target);
            await this.initBootstrapper();
            await this.prepareApplicationEvents();

            BootstrapperEventManager.emitStartingEvent();

            /**
             * From this moment onwards, is possible utilize
             * the IOC by directly accessing the CONTAINER.
             */

            await this.bootstrapMainApp();

            this.pidManager.createdPidFile();

            BootstrapperEventManager.emitBootstrappedEvent();

            console.log('Service has Bootstrapped.');
        } catch (error) {
            console.error(bootstrapBadge, 'Application failed so bad to start. Cannot continue at all!', error);
            process.exitCode = 2;
            process.exit();
        }
    }

    /**
     * Include all the essential listeners that need to be activated
     * during the application's startup.
     */
    private prepareCriticalListeners(): void {
        BootstrapperEventManager.on(BOOTSTRAPPER_EVENTS.CRITICAL, async () => {
            await this.applicationTerminator.applicationExit(CUSTOM_SIGNALS.CRITICAL);
        });
    }

    /**
     * Perform the initial configuration setup for a service's configuration reader.
     */
    private async prepareConfiguration(): Promise<void> {
        // Print your name at the console ... :)
        process.stdout.write([String.fromCharCode(0x1b), ']0;', String.fromCharCode(0x7)].join(''));
    }

    /**
     * Perform the main application Bootstrap procedure and trigger an event
     * for the listeners.
     */
    private async bootstrapMainApp(): Promise<void> {
        if (this.mainApp.bootstrap) {
            await this.mainApp.bootstrap();
        }
    }

    /**
     * Set up the event listeners for the application.
     *
     * This will also replace the console/terminal where the application is running with
     * a new handling for the SIGINT signal, preventing any lingering processes on the
     * underlying operating system.
     */
    private async prepareApplicationEvents(): Promise<void> {
        // This will avoid console to listen to SIGINT.
        const rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('SIGINT', function () {
            process.emit('SIGTERM', 'SIGTERM');
        });

        const signals: Array<NodeJS.Signals> = [
            'SIGINT',
            'SIGTERM',
            'SIGQUIT',
            'SIGABRT',
            'SIGBREAK',
            'SIGHUP',
            'SIGTSTP',
            'SIGCONT'
        ];

        signals.forEach(sig =>
            process.on(sig, async () => {
                await this.applicationTerminator.applicationExit(sig);
            })
        );

        process.on('exit', () => { return; });

        process.on('unhandledRejection', (error, promise) => {
            console.log(`[Anonymous scope] Forgot to handle a promise rejection in this code segment.: ${JSON.stringify(promise)}`);
            console.log('[Anonymous scope] An asynchronous promise rejection was encountered!', error as any);
            throw error;
        });

        process.on('uncaughtException', error => {
            console.log(
                '[Anonymous scope] An asynchronous promise rejection was encountered! ' +
                    'This serves as the final safeguard, forcing an exit if necessary.',
                error as any
            );
        });
    }

    /**
     * Start all the bootstrapper classes.
     */
    private async initBootstrapper(): Promise<void> {
        this.pidManager = container().get<PidManager>(ConfigurationInjectionTokens.bootstrapper.pidManager);
        this.applicationTerminator = container().get<ApplicationTerminator>(
            ConfigurationInjectionTokens.bootstrapper.applicationTerminator
        );

        if (!this.pidManager || !this.applicationTerminator || !BootstrapperEventManager) {
            throw new Error('A mandatory class has not been initiated. The system cannot continue.');
        }
    }

    /**
     * Invoke the IOC implementation to scan and locate providers within
     * all directories.
     *
     * @param target - The main class of the application, provided by the IOC Container.
     */
    private async scanClassesForIoc(target: Object): Promise<void> {
        ComponentScan(target)();

        this.mainApp = container().get<IAppMain>(ConfigurationInjectionTokens.initialMainApp);
    }
}
