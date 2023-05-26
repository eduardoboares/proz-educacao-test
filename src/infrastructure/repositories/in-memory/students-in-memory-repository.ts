import { Student } from '@core/students/domain/entity/student.entity';
import { IStudentsPort } from '@core/students/domain/port/student-repository';

export class StudentsInMemoryRepository implements IStudentsPort {
    public students: Array<Student> = [];

    async getStudents(): Promise<Student[]> {
        return [];
    }

    // async create({}): Promise<Student[]> {
    //     return [];
    // }
}
