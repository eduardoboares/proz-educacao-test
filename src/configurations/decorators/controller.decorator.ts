import { container, Provide } from '@configurations/ioc';
import { IRouteDefinition } from '../../presentation/models/route-definition.interface';
import { OnExit, OnInit } from './app-launcher.decorator';

/**
 * All controllers have been injected through Dependency Injection (DI).
 */
const controllersInjected: Array<symbol> = [];

export const controllers: Array<IRouteDefinition> = [];

/**
 * The controller decorator will add all the provided controllers to an array of controllers.
 * This enables the API bootstrap to start all the injected routes.
 * @param injectionToken - The injection token to be added to the container.
 */
export function ApiController(injectionToken: symbol): ClassDecorator
{
    return <T>(target: T): void =>
    {
        Provide(injectionToken)(target);

        const controller: IRouteDefinition = container().get<IRouteDefinition>(injectionToken);

        if (!controller.version || !controller.baseUrl)
        {
            throw new Error(`${controller.constructor.name} doesn't implements Route Definition!`);
        }

        controllers.push(controller);
    };
}

/**
 *
 * Start all controllers
 *
 */
export async function initializeControllers(): Promise<Array<OnInit & OnExit>>
{
    const instances: Array<OnInit & OnExit> = controllersInjected.map(
        (token: symbol) =>
        {
            return container().get<OnInit & OnExit>(token);
        });

    // Start listen for configuration modifications
    for (const instance of instances)
    {
        if (instance.onInit)
        {
            await instance.onInit();
        }
    }

    return instances;
}
