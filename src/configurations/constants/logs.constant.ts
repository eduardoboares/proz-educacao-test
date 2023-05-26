export const logs = {
    error: () => `${new Date().toISOString()} (\x1b[31mERROR\x1b[0m)`,
    info: () => `${new Date().toISOString()} (\x1b[34mINFO\x1b[0m)`,
    warn: () => `${new Date().toISOString()} (\x1b[32mWARN\x1b[0m)`,
    success: () => `${new Date().toISOString()} (\x1b[33mSUCESSS\x1b[0m)`
};
