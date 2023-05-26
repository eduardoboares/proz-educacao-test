import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { reportBadge } from '../badge/message';
import { ConfigurationInjectionTokens } from '../constants/configuration-injection-tokens';
import { Provide } from '../ioc';

const pidDirectory = '/tmp';
const processId: number = process.pid;

/**
 * Manage all the necessary logic to create and handle a PID file.
 */
@Provide(ConfigurationInjectionTokens.bootstrapper.pidManager)
export class PidManager {
    /**
     * Generate the PID file for a service during the bootstrapping process.
     */
    public createdPidFile(): void {
        if (!existsSync(pidDirectory)) {
            mkdirSync(pidDirectory);
        }

        writeFileSync(`${pidDirectory}/${processId}.pid`, 'BOOTSTRAPPED');
    }

    /**
    * Delete a previously created PID file.
    */
    public removePidFile(): void {
        try {
            unlinkSync(`${pidDirectory}/${processId}.pid`);
            console.log(reportBadge, `PID file removed for process ${processId}.`);
        } catch (e) {
            console.log(reportBadge, `Failed to remove PID file for process ${processId}.`, e);
        }
    }
}
