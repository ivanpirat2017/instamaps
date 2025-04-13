import { createVuestic } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/typography.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import VueLazyload from "vue-lazyload";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";
import "./assets/styles.scss";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createVuestic());
app.use(i18n);
app.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
});

app.mount("#app");
