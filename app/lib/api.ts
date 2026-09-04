import axios from "axios";

// Shared client for all browser API calls. Base URL comes from the env so
// pages and components never hardcode the server address.
export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api`,
  headers: { "Content-Type": "application/json" },
});

export type ApiErrorBody = {
  error?: string;
};

export function apiErrorMessage(err: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(err)) {
    const message = err.response?.data?.error;
    if (typeof message === "string" && message.length > 0) return message;
    if (!err.response) {
      return "Could not reach the server. Check your connection.";
    }
  }
  return "Something went wrong. Please try again.";
}
