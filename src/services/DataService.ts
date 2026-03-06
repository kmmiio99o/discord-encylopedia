import { ClientCategory,ClientMod } from "../types/ClientMod";
import { Plugin } from "../types/Plugin";
import { api } from "./api/client";

export interface FetchOptions {
  cacheTime?: number;
}

class DataService {
    async fetchMarkdown(url: string, options?: FetchOptions): Promise<string> {
        if (options?.cacheTime) {
            api.setCacheTime(options.cacheTime);
        }
        const result = await api.get(url);
        if (result.error) throw new Error(result.error);
        return result.data!;
    }

    async fetchJson<T>(url: string, options?: FetchOptions): Promise<T> {
        if (options?.cacheTime) {
            api.setCacheTime(options.cacheTime);
        }
        const result = await api.json<T>(url);
        if (result.error) throw new Error(result.error);
        return result.data!;
    }

    clearCache() {
        api.clearCache();
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

            const tableStart = lines.findIndex(l => l.includes("| :---: |"));
            if (tableStart !== -1) {
                const tableLines = lines.slice(tableStart + 1);
                for (const line of tableLines) {
                    if (!line.includes("|")) continue;

                    const cells = line
                        .split("|")
                        .map(c => c.trim())
                        .filter(c => c);
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
