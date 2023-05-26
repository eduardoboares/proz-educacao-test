/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */

import 'reflect-metadata';

import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';
import { controller } from 'inversify-express-utils';
import { flattenDeep } from 'lodash';
import { join } from 'path';
import { Provide } from '.';
import { bootstrapBadge } from '../badge/message';
import { ConfigurationInjectionTokens } from '../constants/configuration-injection-tokens';

/**
 * Scan all the components in the code and initiate the application's bootstrap process.
 *
 * @param [extraScanPaths] - Additional paths to be scanned alongside the application.
 * @param target - The target application class.
 */
export function ComponentScan(target: Object): (extraScanPaths?: Array<string>) => void {
    return (extraScanPaths?: Array<string>) => {
        Provide(ConfigurationInjectionTokens.initialMainApp)(target);
        new Loader(extraScanPaths);
    };
}

/**
 * An implementation of a basic component scanning mechanism.
 */
class Loader {
    /**
     * Decorators used for recursive code scanning.
     */
    private readonly decorators: Array<Function> = [
        controller, Provide,
        function ApiController() {}
    ];

    /**
     * Directories to exclude from the component scanning process.
     */
    private readonly excludeDirs: Array<string> = ['node_modules', 'coverage', '.git'];

    /**
     * Provides information about the Dependency Injection (DI) implementation being used.
     */
    private readonly diSign: string = `${bootstrapBadge} [DI]`;

    constructor(private readonly extraScanPaths: Array<string> = []) {
        console.log(this.diSign, 'Initializing DI...');

        // Adding the project directory
        extraScanPaths.unshift('.');

        let classes: Array<string> = flattenDeep<string>(
            this.extraScanPaths.map(extraPath => this.scanProviders(join(process.cwd(), extraPath)))
        );

        console.log(this.diSign, `${classes.length} components found! Now loading...`);

        classes.forEach((provider: string) => {
            if (provider) {
                if (process.argv.some(param => param === '-d')) {
                    console.log(
                        this.diSign,
                        'Loading class provider: ' +
                            `${provider.substring(provider.lastIndexOf('/') + 1, provider.length)}`
                    );
                }
                require(provider);
            }
        });

        console.log(this.diSign, `${classes.length} components loaded.`);
    }

    /**
     * For non-encrypted components, perform a recursive scan and binding.
     *
     * @param baseDir - The base directory for scanning.
     */
    private scanProvidersNotEncrypted(baseDir: string): Array<string> {
        const walkSync = (dir: string, extension = '*.*', exclude: Array<string> = []): any => {
            if (
                exclude.some(dirExclude => dir.indexOf(dirExclude) > -1) &&
                !this.extraScanPaths.some(
                    dirInclude => dir.indexOf(dirInclude.replace(new RegExp('\\.\\./', 'g'), '')) > -1
                )
            ) {
                return;
            }

            if (!lstatSync(dir).isDirectory()) {
                return dir.indexOf(extension) > -1 ? [dir] : [];
            }

            return readdirSync(dir).map(file => walkSync(join(dir, file), extension, exclude));
        };

        return flattenDeep<string>(walkSync(baseDir, '.ts', this.excludeDirs)).filter((script?: string) => {
            if (!script) {
                return [];
            }

            const file: string = readFileSync(script, 'utf8');

            return this.decorators.some(annotation => file.indexOf(`@${annotation.name}`) > -1);
        });
    }

    /**
     * Recursively scan for providers in the code.
     *
     * @param baseDir - The base directory to start the search.
     */
    private scanProviders(baseDir: string): Array<string> {
        if (!existsSync(baseDir)) {
            return [];
        }

        console.log(this.diSign, `Checking PATH: ${baseDir}`);

        return this.scanProvidersNotEncrypted(baseDir);
    }
}
