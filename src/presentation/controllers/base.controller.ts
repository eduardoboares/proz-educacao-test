import 'reflect-metadata';

import { Provide } from '@configurations/ioc';
import { Request, Response, Router } from 'express';
import { IRouteDefinition } from 'presentation/models/route-definition.interface';
import { ControllersInjectionTokens } from '../constants/controllers-injection-tokens.constant';

@Provide(ControllersInjectionTokens.controllers.baseController)
export abstract class BaseController implements IRouteDefinition
{
    /**
     * Express Router instance.
     */
    protected router: Router = Router();

    /**
     * The Express Router exposed.
     */
    public get routes(): Router
    {
        this.router.get('/route-check', (req: Request, res: Response) =>
        {
            res.status(200).send({
                version: this.version,
                path: this.baseUrl,
                status: 'This Route is set!'
            });
        });

        this.defineRoutes();

        return this.router;
    }

    public get controllerReadOrder(): number
    {
        return 100;
    }

    public abstract get version(): string;

    public abstract get baseUrl(): string;

    /**
     * Add all paths to the Router instance.
     */
    protected defineRoutes(): void
    {
        this.setPostsRoutes();
        this.setGetsRoutes();
        this.setPutsRoutes();
        this.setDeletesRoutes();
    }

    /**
     * All posts declarations for this Route.
     */
    protected setPostsRoutes(): void { }

    /**
     * All gets declarations for this Route.
     */
    protected setGetsRoutes(): void { }

    /**
     * All gets declarations for this Route.
     */
    protected setPutsRoutes(): void { }

    /**
     * All gets declarations for this Route.
     */
    protected setDeletesRoutes(): void { }
}
