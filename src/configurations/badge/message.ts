/**
 * Bootstrap badge
 */
const bootstrapBadge = `${new Date().toISOString()} (\x1b[34mbootstrap\x1b[0m)`;
const reportBadge = `${new Date().toISOString()} (\x1b[32menvironment reporting\x1b[0m)`;
const shuttingDownBadge = `${new Date().toISOString()} (\x1b[31mshutting down\x1b[0m)`;
const performanceBadge = `${new Date().toISOString()} (\x1b[32mperformance\x1b[0m)`;

export { bootstrapBadge, reportBadge, shuttingDownBadge, performanceBadge };
