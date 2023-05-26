import { Inject, Provide } from '@configurations/ioc';
import { CoreInjectionTokens } from '@core/constants/core-injection-tokens.constant';
import { StudentsAdapter } from '../adapter/students-repository';
import { IStudentProps, Student } from '../domain/entity/student.entity';
import { CIVIL_STATUS_OUTPUT } from '../domain/models/student-civil-status-output.enum';
import { GENDER_TYPES_OUTPUT } from '../domain/models/student-gender-types-output.enum';
import { CIVIL_STATUS } from '../domain/models/students-civil-status.enum';
import { GENDER_TYPES } from '../domain/models/students-gender-types.enum';
import { IStudentResponse } from '../domain/models/students-response.interface';

@Provide(CoreInjectionTokens.students.usecases.updateStudentUseCase)
export class UpdateStudentUseCase
{
    constructor(
        @Inject(CoreInjectionTokens.students.adapters.studentsAdapter)
        private readonly studentsAdapter: StudentsAdapter
    )
    {}

    public async execute(id: string, updateProps: Partial<IStudentProps>): Promise<IStudentResponse>
    {
        try {
            if (updateProps.civil_status) {
                updateProps.civil_status = Student.getCivilStatusInput(
                    updateProps.civil_status as unknown as CIVIL_STATUS_OUTPUT
                );
            }

            if (updateProps.gender) {
                updateProps.gender = Student.getGenderInput(
                    updateProps.gender as unknown as GENDER_TYPES_OUTPUT
                );
            }

            const studantUpdated = await this.studentsAdapter.updateStudent(id, updateProps);

            return {
                ...studantUpdated,
                civil_status: Student.getCivilStatusOutput(
                    studantUpdated.civil_status as unknown as CIVIL_STATUS
                ),
                gender: Student.getGenderOutput(
                    studantUpdated.gender as unknown as GENDER_TYPES
                )
            };
        } catch (error) {
            throw error
        }
    }
}
