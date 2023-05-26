export const CoreInjectionTokens = {
    students: {
        adapters: {
            studentsAdapter: Symbol('students-adapter'),
        },
        usecases: {
            getStudentsUseCase: Symbol('get-students-usecase-application'),
            getStudentsSpreadsheetStatusUseCase: Symbol('get-students-spreadsheet-status-usecase-application'),
            createSpreadsheetStudentsUseCase: Symbol('create-spreadsheet-students-usecase-application'),
            deleteStudentUseCase: Symbol('delete-student-usecase-application'),
            updateStudentUseCase: Symbol('update-student-usecase-application')
        }
    }
};
