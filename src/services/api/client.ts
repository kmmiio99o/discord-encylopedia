import { rateLimiter } from "./rateLimiter";

export interface ApiResult<T> {
  data: T | null;
  error: string | null;
}

class ApiClient {
  private cache = new Map<string, { data: string; time: number }>();
  private cacheMs = 5 * 60 * 1000;

  setCacheTime(ms: number) {
    this.cacheMs = ms;
  }

  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (entry && Date.now() - entry.time < this.cacheMs) {
      return entry.data as T;
    }
    this.cache.delete(key);
    return null;
  }

  private setCached(key: string, data: string) {
    this.cache.set(key, { data, time: Date.now() });
  }

  async get(url: string): Promise<ApiResult<string>> {
    const cacheKey = `md:${url}`;
    const cached = this.getCached<string>(cacheKey);
    if (cached) return { data: cached, error: null };

    await rateLimiter.acquire("github");

    try {
      const res = await fetch(url, {
        headers: { Accept: "text/markdown, text/plain, */*" },
      });
      if (!res.ok) return { data: null, error: `HTTP ${res.status}` };
      
      const text = await res.text();
      this.setCached(cacheKey, text);
      return { data: text, error: null };
    } catch (e) {
      return { data: null, error: e instanceof Error ? e.message : "Failed" };
    }
  }

  async json<T>(url: string): Promise<ApiResult<T>> {
    const cacheKey = `json:${url}`;
    const cached = this.getCached<T>(cacheKey);
    if (cached) return { data: cached, error: null };

    await rateLimiter.acquire("github");

    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json, */*" },
      });
      if (!res.ok) return { data: null, error: `HTTP ${res.status}` };
      
      const data = await res.json();
      this.setCached(cacheKey, JSON.stringify(data));
      return { data, error: null };
    } catch (e) {
      return { data: null, error: e instanceof Error ? e.message : "Failed" };
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const api = new ApiClient();
