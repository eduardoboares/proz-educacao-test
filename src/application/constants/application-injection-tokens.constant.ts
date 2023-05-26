export const ApplicationInjectionTokens = {
    students: {
        getStudentsService: Symbol('get-students-service-application'),
        getStudentsSpreadsheetStatusService: Symbol('get-students-spreadsheet-status-service-application'),
        createStudentsBySpreadsheetService: Symbol('create-students-by-spreadsheet-service-application'),
        deleteStudentService: Symbol('delete-student-service-application'),
        updateStudentService: Symbol('update-student-service-application')
    }
};
