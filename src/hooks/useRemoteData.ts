import React from "react";
import useSWR from "swr";
import { ClientCategory } from "../types/ClientMod";

const DEFAULT_URLS = {
  README:
    "https://raw.githubusercontent.com/Discord-Client-Encyclopedia-Management/Discord3rdparties/refs/heads/main/README.md",
  PLUGINS:
    "https://raw.githubusercontent.com/Purple-EyeZ/Plugins-List/refs/heads/main/src/plugins-data.json",
};

const parseMarkdownContent = (content: string): ClientCategory[] => {
  console.log("Parsing markdown content:", content.length, "chars");
  return [];
};

export function useRemoteMarkdown(url: string) {
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch markdown");
    return response.text();
  };

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 300000,
  });

  return { data, error, isLoading, refetch: mutate };
}

export function useRemoteJson<T>(url: string) {
  const fetcher = async (url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch JSON");
    return response.json();
  };

  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 300000,
  });

  return { data, error, isLoading, refetch: mutate };
}

export function useClientMods() {
  const {
    data: markdown,
    error,
    isLoading,
  } = useRemoteMarkdown(DEFAULT_URLS.README);

  const categories = React.useMemo(() => {
    if (!markdown) return [];
    return parseMarkdownContent(markdown);
  }, [markdown]);

  return { categories, isLoading, error };
}
