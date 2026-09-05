// Shared browser API client built on native fetch (no axios).
// Relative "/api" base keeps previews, custom domains and localhost working
// with zero env config. All helpers resolve { data } on success and throw
// ApiError on failure so existing `api.get/post/put` call sites are unchanged.

export type ApiErrorBody = {
  error?: string;
  code?: string;
};

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody | null;

  constructor(message: string, status: number, body: ApiErrorBody | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type ApiResult<T> = { data: T };

async function request<T>(path: string, init: RequestInit): Promise<ApiResult<T>> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      ...init,
    });
  } catch {
    throw new ApiError(
      "Could not reach the server. Check your connection.",
      0,
      null,
    );
  }

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const typed = body as ApiErrorBody | null;
    const message =
      (typed && typeof typed.error === "string" && typed.error) ||
      `Request failed (${res.status}).`;
    throw new ApiError(message, res.status, typed);
  }

  return { data: body as T };
}

function withBody(payload: unknown): RequestInit {
  return payload === undefined ? {} : { body: JSON.stringify(payload) };
}

export const api = {
  get: <T = unknown>(path: string): Promise<ApiResult<T>> =>
    request<T>(path, { method: "GET" }),
  post: <T = unknown>(path: string, payload?: unknown): Promise<ApiResult<T>> =>
    request<T>(path, { method: "POST", ...withBody(payload) }),
  put: <T = unknown>(path: string, payload?: unknown): Promise<ApiResult<T>> =>
    request<T>(path, { method: "PUT", ...withBody(payload) }),
  del: <T = unknown>(path: string): Promise<ApiResult<T>> =>
    request<T>(path, { method: "DELETE" }),
};

export function apiErrorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof TypeError) {
    return "Could not reach the server. Check your connection.";
  }
  return "Something went wrong. Please try again.";
}
