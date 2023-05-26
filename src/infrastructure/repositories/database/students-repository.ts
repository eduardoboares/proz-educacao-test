import { Provide } from "@configurations/ioc";
import { IStudentProps } from "@core/students/domain/entity/student.entity";
import { ISpreadsheetRequest } from "@core/students/domain/models/spreadsheet-request.interface";
import { ISpreadsheetResponse } from "@core/students/domain/models/spreadsheet-response.interface";
import { SPREADSHEET_STATUS } from "@core/students/domain/models/spreadsheet-status.enum";
import { IStudentResponse } from "@core/students/domain/models/students-response.interface";
import { IStudentsPort } from "@core/students/domain/port/student-repository";
import { InfrastrucutureInjectionTokens } from "@infrastructure/constants/infrastrucuture-injection-tokens.constant";
import { Students } from "@prisma/client";
import prismaClient from './prisma-client';

@Provide(InfrastrucutureInjectionTokens.repositories.studentsRepository)
export class StudentsRepository implements IStudentsPort {
    private readonly repository = prismaClient;

    async createSpreadsheet(spreadsheetProps: ISpreadsheetRequest): Promise<ISpreadsheetResponse> {
        try  {
            const spreadsheet = await this.repository.spreadsheets.create({
                data: spreadsheetProps
            }) as unknown as ISpreadsheetResponse;

            return spreadsheet;
        } catch(error) {
            throw error;
        }
    }

    async updateSpreadsheetStatus(id: string, status: SPREADSHEET_STATUS): Promise<ISpreadsheetResponse> {
        try {
            const spreadsheetUpdated = await this.repository.spreadsheets.update({
                where: { id },
                data: {
                    processing_status: status
                }
            }) as unknown as ISpreadsheetResponse;

            return spreadsheetUpdated;
        } catch(error) {
            throw error;
        }
    }

    async createStudentsInLot(studentsProps: Array<IStudentProps>): Promise<void> {
        try {
            await this.repository.students.createMany({
                data: studentsProps
            });
        } catch(error) {
            throw error;
        }
    }

    async getStudents(): Promise<Array<IStudentProps>> {
        try {
            const students = await this.repository.students.findMany();

            return students as unknown as Array<IStudentProps>;
        } catch(error) {
            throw error
        }
    }

    async getStudentsSpreadsheetStatus(id: string): Promise<ISpreadsheetResponse> {
        const spreadsheet = await this.repository.spreadsheets.findUnique({
            where: { id }
        });

        return spreadsheet as unknown as ISpreadsheetResponse;
    }

    async updateStudent(id: string, updateProps: Partial<IStudentProps>): Promise<IStudentResponse> {
        return await this.repository.students.update({
            where: { id },
            data: updateProps as unknown as Students
        }) as unknown as IStudentResponse;
    }

    async deleteStudent(id: string): Promise<void> {
        await this.repository.students.delete({
            where: { id }
        });
    }
}
