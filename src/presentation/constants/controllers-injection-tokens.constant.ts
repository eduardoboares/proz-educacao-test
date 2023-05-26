export const ControllersInjectionTokens = {
    controllers: {
        baseController: Symbol('baseController'),
        v1: {
            healthCheck: Symbol('v1-health-check'),
            //adminController: Symbol('v1-admin-controller'),
            studentsController: Symbol('v1-students-controller')
        }
    }
};
