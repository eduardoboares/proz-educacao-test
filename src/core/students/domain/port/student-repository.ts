import { IStudentProps } from '../entity/student.entity';
import { ISpreadsheetRequest } from '../models/spreadsheet-request.interface';
import { ISpreadsheetResponse } from '../models/spreadsheet-response.interface';
import { SPREADSHEET_STATUS } from '../models/spreadsheet-status.enum';
import { IStudentResponse } from '../models/students-response.interface';

export interface IStudentsPort {
    createSpreadsheet(spreadsheetProps: ISpreadsheetRequest): Promise<ISpreadsheetResponse>;
    updateSpreadsheetStatus(id: string, status: SPREADSHEET_STATUS): Promise<ISpreadsheetResponse>;
    createStudentsInLot(studentsProps: Array<IStudentProps>): Promise<void>;
    getStudents(): Promise<Array<IStudentProps>>;
    getStudentsSpreadsheetStatus(id: string): Promise<any>;
    updateStudent(id: string, updateProps: Partial<IStudentProps>): Promise<IStudentResponse>;
    deleteStudent(id: string): Promise<void>;
}
