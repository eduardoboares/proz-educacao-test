export const ConfigurationInjectionTokens = {
    initialMainApp: Symbol('initial-main-app'),
    bootstrapper: {
        BootstrapperEventManager: Symbol('bootstrapper-event-manager'),
        pidManager: Symbol('pid-manager'),
        applicationTerminator: Symbol('application-terminator'),
        applicationStarter: Symbol('application-starter')
    }
};
