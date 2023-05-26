import { IStudentProps, Student } from '@core/students/domain/entity/student.entity';
import { SPREADSHEET_STATUS } from '@core/students/domain/models/spreadsheet-status.enum';
import { StudentsRepository } from '@infrastructure/repositories/database/students-repository';
import * as XLSX from 'xlsx';

const formatStudentFields = [
    'name',
    'civil_status',
    'email',
    'cpf',
    'rg',
    'birth_date',
    'gender'
];

function formatXlsxJson(data: Array<any>): any {
    return data.flatMap((d, index) => {
        const studentFieldsFormatted = {};

        if (index === 0) { return []; };

        Object.values(d).forEach((value: any, index: number) => {
            if (index === 1) {
                value = Student.getCivilStatusInput(value);
            }

            if (index === 6) {
                value = Student.getGenderInput(value);
            }

            Object.assign(studentFieldsFormatted, {
                [formatStudentFields[index]]: value
            });
        });

        return Student.create(studentFieldsFormatted as IStudentProps).student;
    });
}

const repository = new StudentsRepository();

export default {
    key: 'create-students-by-speradsheet-queue',
    async handle({ data }: any) {
        try {
            const workbook = XLSX.read(data.fileBuffer.data, {
                type: 'buffer',
                cellDates: true,
                cellNF: false,
                cellText: false
            });

            const xlsxDataJson = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[0]]
            );

            const studentsDataFormatted = formatXlsxJson(xlsxDataJson);

            await Promise.all([
                repository.createStudentsInLot(studentsDataFormatted),
                repository.updateSpreadsheetStatus(
                    data.spreadsheetId, SPREADSHEET_STATUS.CONCLUDED
                )
            ]);
        } catch (error) {
            await repository.updateSpreadsheetStatus(
                data.spreadsheetId, SPREADSHEET_STATUS.FAILED
            )
            throw error;
        }
    },
    options: {}
};
