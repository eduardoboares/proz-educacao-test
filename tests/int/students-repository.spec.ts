import { CIVIL_STATUS, GENDER_TYPES, SPREADSHEET_STATUS } from '@prisma/client';
import { beforeEach, describe, expect, test } from 'vitest';
import prismaClient from '../../src/infrastructure/repositories/database/prisma-client';
import { StudentsRepository } from '../../src/infrastructure/repositories/database/students-repository';

describe('Students repository methods integration tests', () => {
    const repository = new StudentsRepository();

    beforeEach(async () => {
        await Promise.all([
            deleteSpreeadsheetsTableTests(),
            deleteStudentsTableTests()
        ]);
    });

    describe('Spreadsheets tests', async () => {
        test('Should be create a spreadsheet', async () => {
            const spreadsheetResult = await repository.createSpreadsheet({
                name: 'Student Spreadsheet'
            });

            expect(spreadsheetResult).toContain({
                name: 'Student Spreadsheet',
                processing_status: SPREADSHEET_STATUS.PROCESSING
            });
        });

        test('Should be update a spreadsheet status to CONCLUDED', async () => {
            const spreadsheet = await prismaClient.spreadsheets.create({
                data: { name: 'Student Spreadsheet' }
            });

            const spreadsheetResult = await repository.updateSpreadsheetStatus(
                spreadsheet.id,
                SPREADSHEET_STATUS.CONCLUDED
            );

            expect(spreadsheetResult).toContain({
                processing_status: SPREADSHEET_STATUS.CONCLUDED
            });
        });

        test('Should be update a spreadsheet status to FAILED', async () => {
            const spreadsheet = await prismaClient.spreadsheets.create({
                data: { name: 'Student Spreadsheet' }
            });

            const spreadsheetResult = await repository.updateSpreadsheetStatus(
                spreadsheet.id,
                SPREADSHEET_STATUS.FAILED
            );

            expect(spreadsheetResult).toContain({
                processing_status: SPREADSHEET_STATUS.FAILED
            });
        });

        test('Should be get a spreadsheet', async () => {
            const spreadsheet = await prismaClient.spreadsheets.create({
                data: { name: 'Student Spreadsheet' }
            });

            const spreadsheetResult = await repository.getStudentsSpreadsheetStatus(
                spreadsheet.id
            );

            expect(spreadsheetResult).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    processing_status: expect.any(String),
                    created_at: expect.any(Date),
                    updated_at: expect.any(Date),
                  }),
              );
        });
    });

    describe('Students tests', async () => {
        const studentMockGeneric = {
            name: 'John Doe',
            email: 'johndoe@email.com',
            civil_status: CIVIL_STATUS.SINGLE,
            cpf: '63153552002',
            rg: '122585811',
            birth_date: new Date('1999-03-23T00:00:00'),
            gender: GENDER_TYPES.MALE,
        };

        const studentSecondMockGeneric = {
            ...studentMockGeneric,
            name: 'Jhon Doe Second',
            email: 'jhondoesecond@email.com',
            cpf: '84856872052',
            rg: '446621808'
        };


        test('Should be create students in lot', async () => {
            const studentsMock = [
                studentMockGeneric,
                studentSecondMockGeneric
            ];

            await repository.createStudentsInLot(studentsMock);

            const studentsResult = await prismaClient.students.findMany();

            expect(studentsResult).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    civil_status: expect.any(String),
                    gender: expect.any(String),
                    cpf: expect.any(String),
                    rg: expect.any(String),
                    birth_date: expect.any(Date),
                    created_at: expect.any(Date),
                    updated_at: expect.any(Date),
                  }),
                ]),
            );
        });

        test('Should be update student name', async () => {
            await prismaClient.students.create({
                data: studentMockGeneric
            });

            const student = await prismaClient.students.findUnique({
                where: { email: studentMockGeneric.email }
            });

            const studentResult = await repository.updateStudent(
                student!.id,
                {
                    name: 'Eduardo Boares'
                }
            );

            expect(studentResult).toContain({
                name: 'Eduardo Boares'
            });
        });

        test('Should be get students', async () => {
            const studentsMock = [
                studentMockGeneric,
                studentSecondMockGeneric
            ];

            await prismaClient.students.createMany({
                data: studentsMock
            });

            const studentsResult = await repository.getStudents();

            expect(studentsResult).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    civil_status: expect.any(String),
                    gender: expect.any(String),
                    cpf: expect.any(String),
                    rg: expect.any(String),
                    birth_date: expect.any(Date),
                    created_at: expect.any(Date),
                    updated_at: expect.any(Date),
                  }),
                ]),
            );
        });

        test('Should be delete student', async () => {
            await prismaClient.students.create({
                data: studentMockGeneric
            });

            const student = await prismaClient.students.findUnique({
                where: { email: studentMockGeneric.email }
            });

            await repository.deleteStudent(student!.id);

            const studentResult = await prismaClient.students.findUnique({
                where: { email: studentMockGeneric.email }
            });


            expect(studentResult).toBeNull();
        });
    });

    async function deleteSpreeadsheetsTableTests() {
        const spreadsheets = await prismaClient.spreadsheets.findMany();

        if (spreadsheets.length) {
            await prismaClient.spreadsheets.deleteMany({
                where: {
                    id: {
                        in: spreadsheets.map(spreadsheet => (spreadsheet.id)) as unknown as Array<string>
                    }
                }
            });
        }
    }

    async function deleteStudentsTableTests() {
        const students = await prismaClient.students.findMany();

        if (students.length) {
            await prismaClient.students.deleteMany({
                where: {
                    id: {
                        in: students.map(student => (student.id)) as unknown as Array<string>
                    }
                }
            });
        }
    }
});
