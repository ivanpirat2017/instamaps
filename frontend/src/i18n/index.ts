import { createI18n } from "vue-i18n";

const messages = {
  en: {
    app: {
      title: "PhotoStream",
      login: "Login",
      register: "Register",
      logout: "Logout",
      search: "Search",
      map: "Map",
      profile: "Profile",
      feed: "Feed",
      comments: "Comments",
      addComment: "Add a comment...",
      submit: "Submit",
      noAccount: "No account? Register",
      hasAccount: "Already have an account? Login",
      email: "Email",
      password: "Password",
      username: "Username",
      confirmPassword: "Confirm Password",
      emailPlaceholder: "example@domain.com",
      passwordPlaceholder: "Enter password",
      usernamePlaceholder: "Your nickname",
      confirmPasswordPlaceholder: "Repeat password",
      searchPlaceholder: "Search: beach sunset...",
      loginSuccess: "Logged in successfully",
      loginError: "Login failed",
      registerSuccess: "Registered successfully",
      registerError: "Registration failed",
    },
    validation: {
      emailRequired: "Email is required",
      passwordRequired: "Password is required",
      usernameRequired: "Username is required",
      passwordMismatch: "Passwords do not match",
    },
  },
  ru: {
    app: {
      title: "PhotoStream",
      login: "Вход",
      register: "Регистрация",
      logout: "Выход",
      search: "Поиск",
      map: "Карта",
      profile: "Профиль",
      feed: "Лента",
      comments: "Комментарии",
      addComment: "Ваш комментарий...",
      submit: "Отправить",
      noAccount: "Нет аккаунта? Зарегистрируйтесь",
      hasAccount: "Уже есть аккаунт? Войдите",
      email: "Эл. почта",
      password: "Пароль",
      username: "Имя пользователя",
      confirmPassword: "Подтверждение пароля",
      emailPlaceholder: "example@domain.com",
      passwordPlaceholder: "Введите пароль",
      usernamePlaceholder: "Ваш ник",
      confirmPasswordPlaceholder: "Повторите пароль",
      searchPlaceholder: "Поиск: закат на пляже...",
      loginSuccess: "Успешный вход",
      loginError: "Ошибка входа",
      registerSuccess: "Успешная регистрация",
      registerError: "Ошибка регистрации",
    },
    validation: {
      emailRequired: "Эл. почта обязательна",
      passwordRequired: "Пароль обязателен",
      usernameRequired: "Имя пользователя обязательно",
      passwordMismatch: "Пароли не совпадают",
    },
  },
};

export const i18n = createI18n({
  locale: localStorage.getItem("locale") || "ru",
  fallbackLocale: "ru",
  messages,
});
