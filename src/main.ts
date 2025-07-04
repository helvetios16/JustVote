import '@/shared/assets/styles.css';

import { createApp } from 'vue';
import { router } from '@/shared/router';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.mount('#app');
