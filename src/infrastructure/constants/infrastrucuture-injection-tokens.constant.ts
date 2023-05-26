export const InfrastrucutureInjectionTokens = {
    server: {
        httpServer: Symbol('http-server')
    },
    services: {
        apiInitializer: Symbol('api-initializer-service')
    },
    repositories: {
        studentsRepository: Symbol('students-repository')
    }
};
