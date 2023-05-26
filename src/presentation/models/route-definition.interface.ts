import { Router } from 'express';

export interface IRouteDefinition {
    /**
     * The version of this route.
     * Base URL will be /version/base-path.
     */
    version: string;

    /**
     * Get the base path for Route without its version.
     * Base URL will be /version/base-path.
     */
    baseUrl: string;

    /**
     * Expose Router instance and add all the routes paths into it then
     * afterwards returns the configured Router instance.
     */
    routes: Router;

    /**
     * Attribute used to order Express reading over controllers.
     */
    controllerReadOrder: number;
}
