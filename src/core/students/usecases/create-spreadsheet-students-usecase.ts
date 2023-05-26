import { Inject, Provide } from '@configurations/ioc';
import { CoreInjectionTokens } from '@core/constants/core-injection-tokens.constant';
import queue from '@infrastructure/queue/queue';
import { StudentsAdapter } from '../adapter/students-repository';
import { ISpreadsheetResponse } from '../domain/models/spreadsheet-response.interface';

@Provide(CoreInjectionTokens.students.usecases.createSpreadsheetStudentsUseCase)
export class CreateSpreadsheetStudentsUseCase {
    constructor(
        @Inject(CoreInjectionTokens.students.adapters.studentsAdapter)
        private readonly studentsAdapter: StudentsAdapter
    )
    {}

    public async execute(file: any): Promise<ISpreadsheetResponse> {
        try {
            const spreadsheet = await this.studentsAdapter.createSpreadsheet({
                name: file.originalname.replace('.xlsx', '')
            });

            await queue.add('create-students-by-speradsheet-queue', {
                fileBuffer: file.buffer,
                spreadsheetId: spreadsheet.id
            });

            return spreadsheet;
        } catch(error) {
            throw error;
        }
    }
}
