import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

// v-calendar
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';

// vant-ui
import { ConfigProvider } from 'vant';
import { Locale } from 'vant';
import esEs from 'vant/es/locale/lang/es-ES';
Locale.use('es-Es', esEs);

const app = createApp(App);
app.use(router);
app.use(VCalendar, {});
app.use(ConfigProvider);
app.mount('#app');
