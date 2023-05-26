import { ApplicationInjectionTokens } from '@application/constants/application-injection-tokens.constant';
import { Inject, Provide } from '@configurations/ioc';
import { CoreInjectionTokens } from '@core/constants/core-injection-tokens.constant';
import { deleteStudentUseCase } from '@core/students/usecases/delete-student-usecase';

@Provide(ApplicationInjectionTokens.students.deleteStudentService)
export class DeleteStudentService {
    constructor(
        @Inject(CoreInjectionTokens.students.usecases.deleteStudentUseCase)
        private readonly deleteStudentUseCase: deleteStudentUseCase
    )
    {}

    public async handle(id: string): Promise<void>
    {
        return await this.deleteStudentUseCase.execute(id);
    }
}
