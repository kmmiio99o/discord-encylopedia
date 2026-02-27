import React from "react";

export interface UrlConfig {
  readme: string;
  plugins: string;
}

export const DEFAULT_URLS: UrlConfig = {
  readme:
    "https://raw.githubusercontent.com/Discord-Client-Encyclopedia-Management/Discord3rdparties/refs/heads/main/README.md",
  plugins:
    "https://raw.githubusercontent.com/Purple-EyeZ/Plugins-List/refs/heads/main/src/plugins-data.json",
};

interface UrlConfigContextType {
  urls: UrlConfig;
  setUrls: React.Dispatch<React.SetStateAction<UrlConfig>>;
  resetUrls: () => void;
  showConfigDialog: () => void;
}

export const UrlConfigContext = React.createContext<
  UrlConfigContextType | undefined
>(undefined);
