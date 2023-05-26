import { controllers } from '@configurations/decorators/controller.decorator';
import { Inject, Provide } from '@configurations/ioc';
import { Express } from 'express';
import 'reflect-metadata';
import { IRouteDefinition } from '../../../presentation/models/route-definition.interface';
import { InfrastrucutureInjectionTokens } from '../../constants/infrastrucuture-injection-tokens.constant';
import { HttpServer } from '../server/http.server';

const controllerOrder = (a: IRouteDefinition, b: IRouteDefinition): number =>
{
    if (a.controllerReadOrder < b.controllerReadOrder)
    {
        return -1;
    }

    if (a.controllerReadOrder > b.controllerReadOrder)
    {
        return 1;
    }

    return 0;
};

@Provide(InfrastrucutureInjectionTokens.services.apiInitializer)
export class ApiInitializerService
{
    constructor(@Inject(InfrastrucutureInjectionTokens.server.httpServer) private readonly httpServer: HttpServer) { }

    /**
     * Read all the informed Routes, attach it to Express and start the Http Server.
     *
     * @param provider - The logical package that contains the resources.
     * @param port - The server port to start.
     */
    public async start(port: number, test?: boolean): Promise<void>
    {
        await this.httpServer.initConfigurations({ port });

        await Promise.all([
            this.attachRouters(this.httpServer.getExpress(), controllers),
            this.httpServer.startQueueBoard()
        ]);

        if (test) {
            return;
        }

        await this.httpServer.startListening();
    }

    /**
     * Attach all the informed routers to the Express Instance.
     *
     * @param express - The express instance.
     * @param routers - List of routes that will be attached to the express.
     * @param provider - The logical package that contains the resources.
     */
    public async attachRouters(express: Express, routers: Array<IRouteDefinition>): Promise<void>
    {
        routers.sort(controllerOrder).forEach(r => express.use(this.formatBaseUrl(r), r.routes));
    }

    /**
     * Return a formatted Base URL from a given IRouteDefinition.
     *
     * @param router - The router.
     */
    private formatBaseUrl(router: IRouteDefinition): string
    {
        let formattedUrl = this.checkSlashes(router.version);

        formattedUrl = `${this.checkSlashes(formattedUrl)}`.toLowerCase();

        const url = `/${formattedUrl}${this.checkSlashes(router.baseUrl)}`.toLowerCase();

        console.log(`Loading Controller => ${url}, order ${router.controllerReadOrder}.`);

        return url;
    }

    /**
     * Remove first slash from a given word if exists and add the last if it does not exists.
     *
     * @param formattedUrl - An Url to format.
     */
    private checkSlashes(formattedUrl: string): string
    {
        let resp = formattedUrl?.trim() || formattedUrl;

        if (!resp || resp === '/')
        {
            return '';
        }

        if (resp.charAt(0) === '/')
        {
            resp = resp.substr(1);
        }

        if (resp.charAt(resp.length - 1) !== '/')
        {
            resp = `${resp}/`;
        }

        return resp;
    }
}
