export type PluginStatus = "working" | "broken" | "warning";

export interface Plugin {
  name: string;
  description: string;
  authors: string[];
  status: PluginStatus;
  sourceUrl: string;
  installUrl: string;
  warningMessage: string;
}
