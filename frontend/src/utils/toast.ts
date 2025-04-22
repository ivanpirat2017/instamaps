import { useToast } from "vuestic-ui";

type ToastType = "success" | "error" | "info" | "warning";

export function showToast(message: string, type: ToastType = "info") {
  const { init } = useToast();
  init({
    message,
    color: type,
    duration: 3000,
    position: "top-right",
  });
}
