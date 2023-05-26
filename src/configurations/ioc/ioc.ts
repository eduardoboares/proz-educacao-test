import { Container, inject, unmanaged } from 'inversify';
import { buildProviderModule, fluentProvide } from 'inversify-binding-decorators';
import { countInjectionToken } from './telemetry';

/**
 * Create a new container snapshot.
 */
const container = (): Container => {
    const snapshot: Container = new Container({
        defaultScope: 'Request'
    });

    snapshot.load(buildProviderModule());

    return snapshot;
};

/**
 * An alias used to maintain the pattern.
 *
 * @param target - The target object.
 */
function Inject(target: symbol): (target: any, targetKey: string | undefined, index?: number) => void {
    return inject(target);
}

/**
 * Forcibly import specific objects in the TypeScript compiler.
 *
 * @param args - The object to import.
 * @param _ - Unused parameter.
 */
function enforce(..._: Array<Object>): void {}

/**
 * Register a new named provider.
 *
 * @param identifier - The symbol identifier.
 * @param name - The provider name.
 */
const ProvideNamed = (identifier: symbol, name: string): ((target: any) => any) =>
    fluentProvide(identifier).whenTargetNamed(name).done(true);

/**
 * Add a new provider.
 *
 * @param identifier - The symbol identifier.
 */
const Provide = (identifier: symbol): ((target: any) => any) => {
    countInjectionToken(identifier);

    return fluentProvide(identifier).inSingletonScope().done(true);
};

/**
 * Register a transient provider. This will create a new object for each invocation.
 *
 @param identifier - The symbol identifier.
 */
const ProvideTransient = (identifier: symbol): ((target: any) => any) => fluentProvide(identifier).done(true);

/**
 * Disables runtime code checking in InversifyJS.
 */
const Unmanaged = unmanaged;

export { Inject, Provide, ProvideNamed, ProvideTransient, Unmanaged, container, enforce };
