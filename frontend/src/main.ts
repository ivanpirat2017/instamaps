import { createApp } from "vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import App from "./App.vue";
 
import { createPinia } from "pinia";
import { i18n } from "./i18n";

import "./assets/styles.scss";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(
  createVuestic({
    config: {
      colors: {
        variables: {
          primary: "#4f46e5",
          secondary: "#6b7280",
          success: "#10b981",
          info: "#3b82f6",
          danger: "#ef4444",
          warning: "#f59e0b",
          white: "#ffffff",
          dark: "#1f2937",
        },
      },
    },
  })
);

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount("#app");
