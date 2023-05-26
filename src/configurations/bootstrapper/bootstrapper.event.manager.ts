import { EventEmitter as eventsManagement } from 'events';

/**
 * Manage all events related to the startup and shutdown phases of the system.
 */
class BootstrapperEventManagerClass extends eventsManagement {
    /**
     * Emit an event to all listeners of {@link BootstrapperEventManager} indicating
     * that a shutdown has been requested.
     */
    public emitShutdownEvent(): void {
        this.emit(BOOTSTRAPPER_EVENTS.SHUT_DOWN);
    }

    /**
     * Emit an event to all listeners of {@link BootstrapperEventManager} indicating
     * that the system is starting.
     */
    public emitStartingEvent(): void {
        this.emit(BOOTSTRAPPER_EVENTS.STARTING);
    }

    /**
     * Emit an event to all listeners of {@link BootstrapperEventManager} indicating
     * that the system has been bootstrapped.
     */
    public emitBootstrappedEvent(): void {
        this.emit(BOOTSTRAPPER_EVENTS.BOOT_STRAPPED);
    }

    public emitTestbedShutdown(): void {
        this.emit(BOOTSTRAPPER_EVENTS.TESTBED_SHUTDOWN);
        this.emit(BOOTSTRAPPER_EVENTS.SHUT_DOWN);
    }

    public emitTestbedStarting(): void {
        this.emit(BOOTSTRAPPER_EVENTS.TESTBED_STARTING);
    }

    public emitCriticalSignal(): void {
        this.emit(BOOTSTRAPPER_EVENTS.CRITICAL);
    }

    public emitFlushLogs(): void {
        this.emit(BOOTSTRAPPER_EVENTS.FLUSH_LOGS);
    }

    public emitDBPoolError(): void {
        this.emit(BOOTSTRAPPER_EVENTS.DATABASE);
    }
}

export const BootstrapperEventManager = new BootstrapperEventManagerClass().setMaxListeners(2048);
export enum CUSTOM_SIGNALS {
    CRITICAL = 'critical'
}
export enum BOOTSTRAPPER_EVENTS {
    FLUSH_LOGS = 'flush_logs',
    SHUT_DOWN = 'shutdown',
    STARTING = 'starting',
    BOOT_STRAPPED = 'bootstrapped',
    TESTBED_STARTING = 'testbed_starting',
    TESTBED_SHUTDOWN = 'testbed_shutdown',
    CRITICAL = 'critical',
    DATABASE = 'database'
}
