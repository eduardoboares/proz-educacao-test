import { chain } from 'lodash';
import { bootstrapBadge } from '../badge/message';

const startDate: Date = new Date();
const allLoadedInjectionTokens: Set<symbol> = new Set();


/**
 * Print telemetry information about the DI container.
 *
 * @param injectionTokens - The local injection tokens object of your application.
 */
export function showDependencyTelemetry(injectionTokens: object): void {
    const allInjectionTokens: Array<symbol> = getAllInjectionTokens(injectionTokens);
    const notUsed = allInjectionTokens.filter(i => !allLoadedInjectionTokens.has(i)).map(i => i.toString());
    const notUsedStr = notUsed.length > 0 && `-> ${notUsed.join(', ')}.`;

    console.log(
        bootstrapBadge,
        '<Dependency Injection (DI) Metrics>',
        `DI Uptime: ${new Date().getTime() - startDate.getTime()} ms.`,
        `All DI tokens allocated in memory: ${allLoadedInjectionTokens.size}.`,
        `Local available DI tokens: ${allInjectionTokens.length}.`,
        `Local tokens not in use: ${notUsed.length}. ${notUsedStr || ''}`
    );
}

/**
 * Count the specified token for telemetry purposes.
 * @param token - The injection token.
 */
export function countInjectionToken(token: symbol): void {
    allLoadedInjectionTokens.add(token);
}

/**
 * Flatten all symbols of some injection token object.
 *
 * @param injectionTokens - Injection token object.
 */
function getAllInjectionTokens(injectionTokens: object): Array<symbol> {
    return chain(injectionTokens)
        .values()
        .map((key: any) => (typeof key === 'object' ? getAllInjectionTokens(key) : key))
        .flattenDeep()
        .uniq()
        .value();
}
