import React from "react";

export interface UrlConfig {
  readme: string;
  plugins: string;
}

interface UrlConfigContextType {
  urls: UrlConfig;
  setUrls: React.Dispatch<React.SetStateAction<UrlConfig>>;
  resetUrls: () => void;
  showConfigDialog: () => void;
}

export const UrlConfigContext = React.createContext<
  UrlConfigContextType | undefined
>(undefined);
