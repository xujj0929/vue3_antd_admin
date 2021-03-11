import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import FaIcon from '@/components/FaIcon';

import '@api/mock';

const app = createApp(App);

app.component('fa-icon', FaIcon);

app.use(Antd);
app.use(store);
app.use(router);
app.mount('#app');
