import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@app': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    // server: {
    //   host: '0.0.0.0',
    // },
  };
});
