import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

// v-calendar
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';

const app = createApp(App);
app.use(router);
app.use(VCalendar, {})
app.mount('#app');
