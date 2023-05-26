import { ApplicationStarter } from '@configurations/bootstrapper/application.starter';
import 'reflect-metadata';

/**
 * Defines an application launcher.
 * It configures essential services within CommonLib,
 * performs component scanning, and initiates the application.
 * @param configuration - The configuration for the backend application.
 */
export function AppLauncher<T>(): (target: T) => void {
    const applicationStarter: ApplicationStarter = new ApplicationStarter();

    return (target: T): void => {
        Promise.resolve()
            .then(() => applicationStarter.applicationStart(target))
            .catch(e => {
                console.error(e);
            });
    };
}

/**
 * Implementing this interface ensures that the system termination process will
 * execute the graceful exit procedure of the microservice before invoking the
 * microservice chassis' exit procedures.
 */
export interface OnExit {
    /**
     * Implementing this method in your service ensures that it will be
     * called as the first step during the execution of exit procedures.
     */
    safeShutdown(): Promise<void>;
}

/**
 * Indicates that the Dependency Injection (DI) loading process has completed.
 */
export abstract class OnInit implements IOnInit {
    public abstract onInit(): Promise<void>;
}

export interface IOnInit {
    onInit(): Promise<void>;
}
