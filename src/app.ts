import { AppLauncher } from '@configurations/decorators/app-launcher.decorator';
import { Inject } from '@configurations/ioc';
import { InfrastrucutureInjectionTokens } from '@infrastructure/constants/infrastrucuture-injection-tokens.constant';
import { ApiInitializerService } from '@infrastructure/http/services/api.initializer.service';
require('dotenv').config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env' });

@AppLauncher()
export class App {
    constructor(
        @Inject(InfrastrucutureInjectionTokens.services.apiInitializer) private readonly apiInitializer: ApiInitializerService
    ) { }

    /**
     * Start the application.
     */
    public async bootstrap(): Promise<void> {
        await this.apiInitializer.start((process.env.PORT || 3333) as number);
    }
}
