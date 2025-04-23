import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";
 

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(
  createVuestic({
    config: {
      colors: {
        variables: {
          primary: "#4F46E5",
          secondary: "#6B7280",
          success: "#10B981",
          info: "#3B82F6",
          danger: "#EF4444",
          warning: "#F59E0B",
          backgroundPrimary: "#FFFFFF",
          backgroundSecondary: "#F3F4F6",
          textPrimary: "#111827",
          textInverted: "#FFFFFF",
        },
        presets: {
          dark: {
            backgroundPrimary: "#111827",
            backgroundSecondary: "#1F2937",
            textPrimary: "#F9FAFB",
          },
        },
      },
    },
  })
);

app.mount("#app");
