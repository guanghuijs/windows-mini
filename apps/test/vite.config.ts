import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      // Pages({
      //   dirs: './src/views', //指定生成路由的目录
      //   extensions: ['vue'], //文件后缀
      //   exclude: ['**/src/*.vue'], //可以排除指定目录
      // }),
    ],
    resolve: {
      alias: {
        '@app': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
    },
  };
});
