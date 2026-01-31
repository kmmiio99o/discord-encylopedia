import { ClientMod, ClientCategory } from "../types/ClientMod";
import { Plugin } from "../types/Plugin";

export const EXTERNAL_URLS = {
  README:
    "https://raw.githubusercontent.com/Discord-Client-Encyclopedia-Management/Discord3rdparties/refs/heads/main/README.md",
  PLUGINS:
    "https://raw.githubusercontent.com/Purple-EyeZ/Plugins-List/refs/heads/main/src/plugins-data.json",
};

export interface FetchOptions {
  cacheTime?: number;
  retryCount?: number;
  timeout?: number;
}

class DataService {
  private cache = new Map<string, { data: any; timestamp: number }>();

  async fetchMarkdown(url: string, options?: FetchOptions): Promise<string> {
    return this.fetchWithCache(url, options);
  }

  async fetchJson<T>(url: string, options?: FetchOptions): Promise<T> {
    return this.fetchWithCache(url, options);
  }

  private async fetchWithCache<T>(
    url: string,
    options?: FetchOptions,
  ): Promise<T> {
    const cacheKey = url;
    const now = Date.now();
    const cacheEntry = this.cache.get(cacheKey);

    const {
      cacheTime = 5 * 60 * 1000,
      retryCount = 3,
      timeout = 10000,
    } = options || {};

    if (cacheEntry && now - cacheEntry.timestamp < cacheTime) {
      return cacheEntry.data;
    }

    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: "application/json, text/markdown, text/plain",
            "Cache-Control": "no-cache",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        let data: T;
        if (url.endsWith(".json")) {
          data = await response.json();
        } else {
          data = (await response.text()) as T;
        }

        this.cache.set(cacheKey, { data, timestamp: now });

        return data;
      } catch (error) {
        if (attempt === retryCount) {
          console.error(
            `Failed to fetch ${url} after ${retryCount} attempts:`,
            error,
          );

          if (cacheEntry) {
            console.warn("Returning stale cache data");
            return cacheEntry.data;
          }

          throw error;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, attempt)),
        );
      }
    }

    throw new Error("Failed to fetch data");
  }

  clearCache(url?: string) {
    if (url) {
      this.cache.delete(url);
    } else {
      this.cache.clear();
    }
  }

  async parseMarkdownFromUrl(url: string): Promise<ClientCategory[]> {
    const content = await this.fetchMarkdown(url);
    return this.parseMarkdownContent(content);
  }

  async loadPluginsFromUrl(url: string): Promise<Plugin[]> {
    return this.fetchJson<Plugin[]>(url);
  }

  private parseMarkdownContent(content: string): ClientCategory[] {
    const categories: ClientCategory[] = [];

    const sections = content.split(/\n##\s+/);

    for (const section of sections.slice(1)) {
      const lines = section.split("\n");
      const title = lines[0].trim();
      const clients: ClientMod[] = [];

      const tableStart = lines.findIndex((l) => l.includes("| :---: |"));
      if (tableStart !== -1) {
        const tableLines = lines.slice(tableStart + 1);
        for (const line of tableLines) {
          if (!line.includes("|")) continue;

          const cells = line
            .split("|")
            .map((c) => c.trim())
            .filter((c) => c);
          if (cells.length >= 4) {
            const [name, features, language, developmentStatus] = cells;

            let link: string | undefined;
            let displayName = name;
            const linkMatch = name.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (linkMatch) {
              displayName = linkMatch[1];
              link = linkMatch[2];
            }

            clients.push({
              name: displayName,
              features,
              language,
              developmentStatus: developmentStatus as any,
              link,
            });
          }
        }
      }

      if (clients.length > 0) {
        categories.push({ title, clients });
      }
    }

    return categories;
  }
}

export const dataService = new DataService();
