export type DevelopmentStatus =
  | "🟢 Active"
  | "🟠 On hiatus"
  | "🔴 Discontinued"
  | "🔵 Active *(Variable[^2])*"
  | "🔵 *(still in development state)*"
  | "⛔ Malware"
  | "🔴 Broken";

export interface ClientMod {
  name: string;
  features: string;
  language: string;
  developmentStatus: DevelopmentStatus;
  platform?: string;
  subcategory?: string;
  link?: string;
}

export interface ClientCategory {
  title: string;
  subcategory?: string;
  clients: ClientMod[];
}
