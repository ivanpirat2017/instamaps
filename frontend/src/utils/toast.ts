import { VaToast } from "vuestic-ui";

export function showToast(message: string, type: "success" | "error" | "info" = "info") {
  VaToast.init({
    message,
    color: type === "success" ? "success" : type === "error" ? "danger" : "info",
    duration: 3000,
  });
}
