
import { IStudentProps } from "../entity/student.entity";
import { CIVIL_STATUS_OUTPUT } from "./student-civil-status-output.enum";
import { GENDER_TYPES_OUTPUT } from "./student-gender-types-output.enum";

export interface IStudentResponse extends Omit<IStudentProps, 'civil_status' | 'gender'> {
    id: string;
    civil_status: CIVIL_STATUS_OUTPUT;
    gender: GENDER_TYPES_OUTPUT
}
