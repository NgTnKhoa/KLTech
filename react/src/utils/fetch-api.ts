const BASE_URL = 'http://localhost:80/api/v1';
const TIMEOUT = 10000;

type RequestOptions = {
  method: string;
  headers: Record<string, string>;
  body?: string;
  timeout?: number;
};

class FetchError extends Error {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.data = data;
  }
}

const timeoutPromise = (ms: number) =>
  new Promise<never>((_, reject) =>
    setTimeout(() => reject(new FetchError("Request timeout")), ms),
  );

async function fetchWithTimeout(
  url: string,
  options: RequestOptions,
  ms: number = TIMEOUT,
) {
  return Promise.race([fetch(url, options), timeoutPromise(ms)]);
}

export const fetchApi = {
  async get<T>(endpoint: string, customHeaders = {}): Promise<T> {
    const token = localStorage.getItem("accessToken");

    const url = `${BASE_URL}${endpoint}`;
    const options: RequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
        ...customHeaders,
      },
    };

    const response = await fetchWithTimeout(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new FetchError(
        errorData?.message || "An error occurred",
        response.status,
        errorData,
      );
    }

    return await response.json();
  },

  async post<T>(endpoint: string, data: any, customHeaders = {}): Promise<T> {
    const token = localStorage.getItem("accessToken");
    const url = `${BASE_URL}${endpoint}`;
    const isFormData = data instanceof FormData;

    const headers: Record<string, string> = isFormData
        ? { ...customHeaders }
        : {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
          ...customHeaders,
        };

    const options: RequestOptions = {
      method: "POST",
      headers,
      body: isFormData ? data : JSON.stringify(data),
    };

    const response = await fetchWithTimeout(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new FetchError(
        errorData?.message || "An error occurred",
        response.status,
        errorData,
      );
    }

    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  },

  async put<T>(endpoint: string, data: any, customHeaders = {}): Promise<T> {
    const token = localStorage.getItem("accessToken");
    const url = `${BASE_URL}${endpoint}`;
    const options: RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
        ...customHeaders,
      },
      body: JSON.stringify(data),
    };

    const response = await fetchWithTimeout(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new FetchError(
        errorData?.message || "An error occurred",
        response.status,
        errorData,
      );
    }

    return await response.json();
  },

  async delete<T>(endpoint: string, customHeaders = {}): Promise<T> {
    const token = localStorage.getItem("accessToken");
    const url = `${BASE_URL}${endpoint}`;
    const options: RequestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
        ...customHeaders,
      },
    };

    const response = await fetchWithTimeout(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new FetchError(
        errorData?.message || "An error occurred",
        response.status,
        errorData,
      );
    }

    return await response.json();
  },
};
