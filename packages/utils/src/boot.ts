import { createApp } from 'vue';
import { createPinia } from 'pinia';
import type { Component } from 'vue';
import type { Router } from 'vue-router';

export async function boot(
  App: Component,
  router: Router,
  afterCallBack?: Function
) {
  const app = createApp(App);
  if (afterCallBack) {
    await afterCallBack(app);
  }
  app.use(router).use(createPinia()).mount('#app');
}
