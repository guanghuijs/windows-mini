import { boot } from '@packages/utils';
import '@app/assets/css/theme.less';
import '@app/assets/css/framework.less';

import App from './App.vue';
import router from './router';
boot(App, router).then(() => {});
