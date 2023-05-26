import { Inject, Provide } from '@configurations/ioc';
import { CoreInjectionTokens } from '@core/constants/core-injection-tokens.constant';
import { StudentsAdapter } from '../adapter/students-repository';

@Provide(CoreInjectionTokens.students.usecases.deleteStudentUseCase)
export class deleteStudentUseCase
{
    constructor(
        @Inject(CoreInjectionTokens.students.adapters.studentsAdapter)
        private readonly studentsAdapter: StudentsAdapter
    )
    {}

    public async execute(id: string): Promise<void>
    {
        try {
            await this.studentsAdapter.deleteStudent(id);
        } catch(error) {
            throw error;
        }
    }
}
