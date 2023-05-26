import { Request, Response } from 'express';
import { ApiController } from '../../configurations/decorators/controller.decorator';
import { ControllersInjectionTokens } from '../constants/controllers-injection-tokens.constant';
import { BaseController } from './base.controller';

@ApiController(ControllersInjectionTokens.controllers.v1.healthCheck)
export class HealthCheckController extends BaseController {
    public get controllerReadOrder(): number {
        return 0;
    }

    public get version(): string {
        return 'v1';
    }

    public get baseUrl(): string {
        return 'healt-check';
    }

    protected setGetsRoutes(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                status: 'This API is Shinning!'
            });
        });
    }
}
