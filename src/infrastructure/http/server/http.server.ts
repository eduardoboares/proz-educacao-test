import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Provide } from '@configurations/ioc';
import Queue from '@infrastructure/queue/queue';
import AppErrorException from '@shared/exceptions/app-error.exception';
import { Express } from 'express';
import { IHttpParams } from '../../../presentation/models/http-parameters.interface';
import { InfrastrucutureInjectionTokens } from '../../constants/infrastrucuture-injection-tokens.constant';
const bodyParser = require('body-parser')

import express, { NextFunction, Request, Response } from 'express';

const app: Express = express();

@Provide(InfrastrucutureInjectionTokens.server.httpServer)
export class HttpServer
{
    /**
     * Expose the Express App singleton.
     */
    public getExpress(): Express
    {
        return app;
    }

    /**
     * Apply all necessary configurations to Http Server instance.
     *
     * @param configs - The Http server parameters.
     */
    public async initConfigurations(configs: IHttpParams): Promise<void>
    {
        await this.configureListenerPort(app, configs.port);
        app.use(bodyParser.json());
    }

    /**
     * Default messages when page is not found, or in last resource an unwatch
     * 500 is happening.
     */
    public async configureDefaultErrorsMessages(): Promise<void>
    {
        // 404
        app.use((req: Request, res: Response) =>
        {
            res.status(404).send(new AppErrorException(404, 'Desculpa, endereço não encontrado!'));
        });

        app.use(
            (error: Error, request: Request, response: Response, _: NextFunction) => {
                if (error instanceof AppErrorException) {
                    return response.status(error.statusCode).json({
                        status: 'error',
                        message: error.message
                    });
                }

                return response.status(500).json({
                    status: 'error',
                    message: 'Internar server error.'
                });
            }
        );
    }

    /**
     * Configure the server port to listen to.
     *
     * @param instance - The instance to configure.
     * @param port - The port to start to listen to.
     */
    private async configureListenerPort(instance: Express, port: number): Promise<void>
    {
        instance.set('port', port);
    }

    public async startQueueBoard(): Promise<void> {
        const serverAdapter = new ExpressAdapter();
            serverAdapter.setBasePath('/admin/queues');

            createBullBoard(
            {
                queues: Queue.queues.map(queue => new BullAdapter(queue.bull)),
                serverAdapter,
                options: {
                    uiConfig: {
                        boardTitle: 'Proz Educação',
                        boardLogo: {
                            path: 'https://is3-ssl.mzstatic.com/image/thumb/Purple112/v4/32/a5/56/32a5562d-3c71-469a-58dd-1859aa71f6eb/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1024x1024.jpg',
                            width: 73,
                            height: 73
                        },
                        miscLinks: [{
                            text: 'Logout',
                            url: 'https://inscricao.prozeducacao.com.br/'
                        }],
                        },
                }
            });

            app.use('/admin/queues', serverAdapter.getRouter());
    }

    /**
     * Start server to list to configured port.
     */
    public async startListening(): Promise<void>
    {
        // This must be executed after all routes are declared.
        await this.configureDefaultErrorsMessages();

        app.listen(app.get('port'), '0.0.0.0', () =>
        {
            console.log(`\n\x1b[32m___ 🚀 Server Started on port ${app.get('port')} 🚀 ___\n`);
        });
    }
}
