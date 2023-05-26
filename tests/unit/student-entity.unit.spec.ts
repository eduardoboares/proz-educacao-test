import { Student } from '../../src/core/students/domain/entity/student.entity';
import { CIVIL_STATUS_OUTPUT } from '../../src/core/students/domain/models/student-civil-status-output.enum';
import { CIVIL_STATUS } from '../../src/core/students/domain/models/students-civil-status.enum';
import { GENDER_TYPES } from '../../src/core/students/domain/models/students-gender-types.enum';

describe('Student entity tests', () => {
    const mockGeneric = {
        name: 'John Doe',
        email: 'johndoe@email.com',
        civil_status: CIVIL_STATUS.SINGLE,
        cpf: '631.535.520-02',
        rg: '12.258.581-1',
        birth_date: new Date('1999-03-23T00:00:00'),
        gender: GENDER_TYPES.MALE,
    };

    test('Should be create an student', () => {
        const student = Student.create(mockGeneric);

        expect(student).toBeInstanceOf(Student);
        expect(student.student).toMatchObject({
            ...mockGeneric,
            cpf: '63153552002',
            rg: '122585811',
        });
    });

    test('Should be convert civil status field of student to input', () => {
        const singleCivilStatus = Student.getCivilStatusInput(CIVIL_STATUS_OUTPUT.SINGLE);
        const marriedCivilStatus = Student.getCivilStatusInput(CIVIL_STATUS_OUTPUT.MARRIED);

        expect(singleCivilStatus).toEqual(CIVIL_STATUS.SINGLE);
        expect(marriedCivilStatus).toEqual(CIVIL_STATUS.MARRIED);
    });

    test('Should be convert civil status field of student to output', () => {
        const singleCivilStatus = Student.getCivilStatusOutput(CIVIL_STATUS.SINGLE);
        const marriedCivilStatus = Student.getCivilStatusOutput(CIVIL_STATUS.MARRIED);

        expect(singleCivilStatus).toEqual(CIVIL_STATUS_OUTPUT.SINGLE);
        expect(marriedCivilStatus).toEqual(CIVIL_STATUS_OUTPUT.MARRIED);
    });

    test('Should be convert gender field of student to input', () => {
        const singleCivilStatus = Student.getCivilStatusInput(CIVIL_STATUS_OUTPUT.SINGLE);
        const marriedCivilStatus = Student.getCivilStatusInput(CIVIL_STATUS_OUTPUT.MARRIED);

        expect(singleCivilStatus).toEqual(CIVIL_STATUS.SINGLE);
        expect(marriedCivilStatus).toEqual(CIVIL_STATUS.MARRIED);
    });

    test('Should be convert gender field of student to output', () => {
        const singleCivilStatus = Student.getCivilStatusOutput(CIVIL_STATUS.SINGLE);
        const marriedCivilStatus = Student.getCivilStatusOutput(CIVIL_STATUS.MARRIED);

        expect(singleCivilStatus).toEqual(CIVIL_STATUS_OUTPUT.SINGLE);
        expect(marriedCivilStatus).toEqual(CIVIL_STATUS_OUTPUT.MARRIED);
    });

    test('Should not create a student with invalid email', () => {
        expect(() => {
            return Student.create({
                ...mockGeneric,
                email: 'johndoe'
            });
        }).toThrow();
    });

    test('Should not create a student with invalid CPF', () => {
        expect(() => {
            return Student.create({
                ...mockGeneric,
                cpf: '15'
            });
        }).toThrow();
    });

    test('Should not create a student with invalid RG', () => {
        expect(() => {
            return Student.create({
                ...mockGeneric,
                rg: '15'
            });
        }).toThrow();
    });
});
