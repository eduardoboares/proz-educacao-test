import { Inject, Provide } from '@configurations/ioc';
import { CoreInjectionTokens } from '@core/constants/core-injection-tokens.constant';
import { StudentsAdapter } from '../adapter/students-repository';
import { ISpreadsheetResponse } from '../domain/models/spreadsheet-response.interface';

@Provide(CoreInjectionTokens.students.usecases.getStudentsSpreadsheetStatusUseCase)
export class GetStudentsSpreadsheetStatusUseCase
{
    constructor(
        @Inject(CoreInjectionTokens.students.adapters.studentsAdapter)
        private readonly studentsAdapter: StudentsAdapter
    )
    {}

    public async execute(id: string): Promise<ISpreadsheetResponse>
    {
        try {
            return this.studentsAdapter.getStudentsSpreadsheetStatus(id);
        } catch (error) {
            throw error;
        }
    }
}
