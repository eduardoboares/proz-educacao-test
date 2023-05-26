const { type, release, arch, cpus } = require('os');
const { existsSync } = require('fs');
import { bootstrapBadge } from './message';

const urandomAvailable = `urandom ${existsSync('/dev/urandom') ? '' : 'not '}available`;

console.log(bootstrapBadge, `Initializing ${process.env.npm_package_name || '???'}...`);
console.log(bootstrapBadge, `OS: ${type()} ${release()} (${arch()}) - ${urandomAvailable}`);
console.log(bootstrapBadge, `CPU: ${cpus()[0].model} (${cpus().length}x)`);
