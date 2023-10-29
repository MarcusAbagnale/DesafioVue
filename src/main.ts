import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueUploadComponent from 'vue-upload-component';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App);

// Registre o componente VueUploadComponent globalmente
app.component('VueUploadComponent', VueUploadComponent);

app.use(router);
app.mount('#app');
