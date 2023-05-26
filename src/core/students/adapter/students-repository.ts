import { Inject, Provide } from "@configurations/ioc";
import { CoreInjectionTokens } from "@core/constants/core-injection-tokens.constant";
import { InfrastrucutureInjectionTokens } from "@infrastructure/constants/infrastrucuture-injection-tokens.constant";
import { StudentsRepository } from "@infrastructure/repositories/database/students-repository";
import { IStudentProps } from "../domain/entity/student.entity";
import { ISpreadsheetRequest } from "../domain/models/spreadsheet-request.interface";
import { ISpreadsheetResponse } from "../domain/models/spreadsheet-response.interface";
import { SPREADSHEET_STATUS } from "../domain/models/spreadsheet-status.enum";
import { IStudentResponse } from "../domain/models/students-response.interface";
import { IStudentsPort } from "../domain/port/student-repository";

@Provide(CoreInjectionTokens.students.adapters.studentsAdapter)
export class StudentsAdapter implements IStudentsPort
{
    constructor(
        @Inject(InfrastrucutureInjectionTokens.repositories.studentsRepository)
        private readonly studentsRespository: StudentsRepository
    )
    {}

    async createSpreadsheet(spreadsheetProps: ISpreadsheetRequest): Promise<ISpreadsheetResponse> {
        const spreadsheet = await this.studentsRespository.createSpreadsheet(
            spreadsheetProps as unknown as ISpreadsheetRequest
        );

        return spreadsheet;
    }

    async updateSpreadsheetStatus(id: string, status: SPREADSHEET_STATUS): Promise<ISpreadsheetResponse> {
        const spreadsheet = await this.studentsRespository.updateSpreadsheetStatus(
            id,
            status
        );

        return spreadsheet;
    }

    async createStudentsInLot(studentsProps: IStudentProps[]): Promise<void> {
1
    }

    async getStudentsSpreadsheetStatus(id: string): Promise<ISpreadsheetResponse> {
        return await this.studentsRespository.getStudentsSpreadsheetStatus(id);
    }

    async getStudents(): Promise<Array<IStudentProps>> {
        return await this.studentsRespository.getStudents();
    }

    async updateStudent(id: string, updateProps: Partial<IStudentProps>): Promise<IStudentResponse> {
        return await this.studentsRespository.updateStudent(id, updateProps);
    }

    async deleteStudent(id: string): Promise<void> {
        await this.studentsRespository.deleteStudent(id);
    }
}
