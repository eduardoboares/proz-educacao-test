import { ApplicationInjectionTokens } from '@application/constants/application-injection-tokens.constant';
import { Inject, Provide } from '@configurations/ioc';
import { CoreInjectionTokens } from '@core/constants/core-injection-tokens.constant';
import { ISpreadsheetResponse } from '@core/students/domain/models/spreadsheet-response.interface';
import { CreateSpreadsheetStudentsUseCase } from '@core/students/usecases/create-spreadsheet-students-usecase';

@Provide(ApplicationInjectionTokens.students.createStudentsBySpreadsheetService)
export class CreateStudentsBySpreadsheetService {
    constructor(
        @Inject(CoreInjectionTokens.students.usecases.createSpreadsheetStudentsUseCase)
        private readonly createSpreadsheetStudentUseCase: CreateSpreadsheetStudentsUseCase
    )
    {}

    public async handle(file: any): Promise<ISpreadsheetResponse>
    {
        return await this.createSpreadsheetStudentUseCase.execute(file);
    }
}
