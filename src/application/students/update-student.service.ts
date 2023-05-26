import { Inject, Provide } from '@configurations/ioc';
import { IStudentProps } from '@core/students/domain/entity/student.entity';
import { UpdateStudentUseCase } from '@core/students/usecases/update-student-usecase';
import { ApplicationInjectionTokens } from 'application/constants/application-injection-tokens.constant';
import { CoreInjectionTokens } from '../../core/constants/core-injection-tokens.constant';

@Provide(ApplicationInjectionTokens.students.updateStudentService)
export class UpdateStudentService
{
    constructor(
        @Inject(CoreInjectionTokens.students.usecases.updateStudentUseCase)
        private readonly updateStudentUseCase: UpdateStudentUseCase
    )
    {}

    public async handle(id: string, updateProps: Partial<IStudentProps>): Promise<any>
    {
        return await this.updateStudentUseCase.execute(id, updateProps);
    }
}
