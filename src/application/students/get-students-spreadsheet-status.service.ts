import { Inject, Provide } from '@configurations/ioc';
import { ISpreadsheetResponse } from '@core/students/domain/models/spreadsheet-response.interface';
import { GetStudentsSpreadsheetStatusUseCase } from '@core/students/usecases/get-students-spreadsheet-status-usecase';
import { ApplicationInjectionTokens } from 'application/constants/application-injection-tokens.constant';
import { CoreInjectionTokens } from '../../core/constants/core-injection-tokens.constant';

@Provide(ApplicationInjectionTokens.students.getStudentsSpreadsheetStatusService)
export class GetStudentsSpreadsheetStatusService
{
    constructor(
        @Inject(CoreInjectionTokens.students.usecases.getStudentsSpreadsheetStatusUseCase)
        private readonly getStudentsSpreadsheetStatusUseCase: GetStudentsSpreadsheetStatusUseCase
    )
    {}

    public async handle(id: string): Promise<ISpreadsheetResponse>
    {
        return await this.getStudentsSpreadsheetStatusUseCase.execute(id);
    }
}
