import { Inject, Provide } from '@configurations/ioc';
import { Student } from '@core/students/domain/entity/student.entity';
import { IStudentResponse } from '@core/students/domain/models/students-response.interface';
import { GetStudentsUseCase } from '@core/students/usecases/get-students-usecase';
import { ApplicationInjectionTokens } from 'application/constants/application-injection-tokens.constant';
import { CoreInjectionTokens } from '../../core/constants/core-injection-tokens.constant';

@Provide(ApplicationInjectionTokens.students.getStudentsService)
export class GetStudentsService
{
    constructor(
        @Inject(CoreInjectionTokens.students.usecases.getStudentsUseCase)
        private readonly getStudentsUseCase: GetStudentsUseCase
    )
    {}

    public async handle(): Promise<Array<IStudentResponse>> {
        const students = await this.getStudentsUseCase.execute();

        return students.map((student) => ({
            ...student,
            civil_status: Student.getCivilStatusOutput(student.civil_status),
            gender: Student.getGenderOutput(student.gender)
        })) as Array<IStudentResponse>;
    }
}
