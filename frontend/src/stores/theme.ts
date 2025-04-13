import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDarkMode = ref(localStorage.getItem("theme") === "dark");

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  }

  return { isDarkMode, toggleTheme };
});
