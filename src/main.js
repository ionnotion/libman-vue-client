import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Swal from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./assets/style.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(Swal);

app.use(router);
app.use(pinia);

app.mount("#app");