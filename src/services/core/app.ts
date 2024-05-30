import {createPinia} from "pinia";

import type {App} from "vue";

export const loadApp = (APP: App) => {
  // init store
  APP.use(createPinia());
};
