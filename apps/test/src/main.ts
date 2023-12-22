import { boot } from '@packages/utils';
import '@packages/static/css/framework.less';
import '@packages/static/css/transition.less';
import '@app/assets/css/theme.less';

import App from './App.vue';
import router from './router';
boot(App, router).then(() => {});
