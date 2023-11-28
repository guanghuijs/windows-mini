import { boot } from '../utils/boot';
import { useGlobalComponents } from '../utils/GlobalComponents';

import '@/assets/css/theme.less';
import '@/assets/css/framework.less';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';

import App from './App.vue';
import router from './router';

boot(App, router, useGlobalComponents).then((r) => {});
