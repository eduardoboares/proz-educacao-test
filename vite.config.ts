import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: [
          {find: "@application", replacement: path.resolve(__dirname, './src/application') },
          {find: "@core", replacement: path.resolve(__dirname, './src/core') },
          {find: "@configurations", replacement: path.resolve(__dirname, './src/configurations') },
          {find: "@infrastructure", replacement: path.resolve(__dirname, './src/infrastructure') },
          {find: "@shared", replacement: path.resolve(__dirname, './src/shared') },
        ]
      },
    test: {
        globals: true,
    },
});
