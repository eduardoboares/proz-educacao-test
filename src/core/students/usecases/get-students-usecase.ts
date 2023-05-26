import { Inject, Provide } from '@configurations/ioc';
import { CoreInjectionTokens } from '@core/constants/core-injection-tokens.constant';
import { StudentsAdapter } from '../adapter/students-repository';
import { IStudentProps } from '../domain/entity/student.entity';

@Provide(CoreInjectionTokens.students.usecases.getStudentsUseCase)
export class GetStudentsUseCase
{
    constructor(
        @Inject(CoreInjectionTokens.students.adapters.studentsAdapter)
        private readonly studentsAdapter: StudentsAdapter
    )
    {}

    public async execute(): Promise<Array<IStudentProps>> {
        try {
            return await this.studentsAdapter.getStudents();
        } catch (error) {
            throw error;
        }

    }
}
