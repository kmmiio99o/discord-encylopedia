export const EXTERNAL_URLS = {
  README:
    "https://raw.githubusercontent.com/Discord-Client-Encyclopedia-Management/Discord3rdparties/refs/heads/main/README.md",
  PLUGINS:
    "https://raw.githubusercontent.com/Purple-EyeZ/Plugins-List/refs/heads/main/src/plugins-data.json",
} as const;

export type ExternalUrlKey = keyof typeof EXTERNAL_URLS;
