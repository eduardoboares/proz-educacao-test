import util = require('util');

import { shuttingDownBadge } from '../badge/message';
import { ConfigurationInjectionTokens } from '../constants/configuration-injection-tokens';
import { Inject, Provide } from '../ioc';
import { BOOTSTRAPPER_EVENTS, BootstrapperEventManager } from './bootstrapper.event.manager';
import { PidManager } from './pid.manager';

let shuttingDown = false;

/**
 * Manage all the necessary logic for a graceful application exit
 * when requested.
 */
@Provide(ConfigurationInjectionTokens.bootstrapper.applicationTerminator)
export class ApplicationTerminator {
    constructor(
        @Inject(ConfigurationInjectionTokens.bootstrapper.pidManager) private readonly pidManager: PidManager
    )
    {
        BootstrapperEventManager.on(BOOTSTRAPPER_EVENTS.SHUT_DOWN, async () => {
            await this.applicationExit('INTERNAL_REQUEST');
        });
    }

    /**
     * Perform the graceful exit procedure, including all necessary shutdowns and events.
     *
     * @param signalName - The name or description of the signal that triggered the application exit.
     */
    public async applicationExit(signalName: string): Promise<void> {
        if (this.isShuttingDown()) {
            return;
        }

        console.log(shuttingDownBadge, `Received closing event ${signalName} and will be processed...`);
        shuttingDown = true;

        BootstrapperEventManager.emitFlushLogs();

        await new Promise(r => setTimeout(r, 300));

        BootstrapperEventManager.emitShutdownEvent();

        try {
            // Close queues
            process.exitCode = 0;
        } catch (err) {
            console.log(shuttingDownBadge, 'An error occurred during the shutdown procedure.', err);

            process.exitCode = 1;
        } finally {
            this.pidManager.removePidFile();
            this.printUsageToStdout();

            console.log(shuttingDownBadge, '--- APPLICATION HAS FINALIZED ---');

            process.exit();
        }
    }

    /**
     * Prepare the shutdown procedure and indicate whether it has already been initiated or not.
     *
     * @returns False if there is no ongoing shutdown process.
     */
    private isShuttingDown(): boolean {
        return shuttingDown || !(shuttingDown = true);
    }

    /**
     * Print to the log all some information about the application resource usage.
     */
    private printUsageToStdout(): void {
        const processMemory = process.memoryUsage();
        const processMemoryInMB = {
            heapTotal: Math.round((processMemory.heapTotal / 1024 / 1024) * 100) / 100,
            heapUsed: Math.round((processMemory.heapUsed / 1024 / 1024) * 100) / 100,
            external: Math.round((processMemory.external / 1024 / 1024) * 100) / 100,
            ss: Math.round((processMemory.rss / 1024 / 1024) * 100) / 100,
        };

        console.log(
            shuttingDownBadge,
            'Memory Usage [MB]: ',
            util.inspect(processMemoryInMB, {
                compact: true,
                depth: Infinity,
                breakLength: 80,
                colors: true
            })
        );
    }
}
