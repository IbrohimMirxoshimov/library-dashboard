/** @format */

import path from 'path';

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: '@assets', replacement: path.resolve(__dirname, 'src/assets')},
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@config',
        replacement: path.resolve(__dirname, 'src/config'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, 'src/layouts'),
      },
      {
        find: '@localization',
        replacement: path.resolve(__dirname, 'src/localization/index.ts'),
      },
      {
        find: '@modules',
        replacement: path.resolve(__dirname, 'src/modules'),
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
    ],
  },
});
