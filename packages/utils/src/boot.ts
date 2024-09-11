import { createApp } from 'vue';
import { createPinia } from 'pinia';
import type { Component } from 'vue';
import type { Router } from 'vue-router';
import piniaPersist from 'pinia-plugin-persistedstate';

export async function boot(
  App: Component,
  router: Router,
  afterCallBack?: Function
) {
  const app = createApp(App);
  if (afterCallBack) {
    await afterCallBack(app);
  }
  const pinia = createPinia();
  pinia.use(piniaPersist);
  app.use(router).use(pinia).mount('#app');
}
