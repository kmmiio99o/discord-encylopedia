import React from "react";
import useSWR from "swr";

import { api } from "../services/api/client";
import { EXTERNAL_URLS } from "../services/api/urls";
import { ClientCategory } from "../types/ClientMod";

const parseMarkdownContent = (content: string): ClientCategory[] => {
    console.log("Parsing markdown content:", content.length, "chars");
    return [];
};

export function useRemoteMarkdown(url: string) {
    const fetcher = async (url: string) => {
        const result = await api.get(url);
        if (result.error) throw new Error(result.error);
        return result.data!;
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
        const result = await api.json<T>(url);
        if (result.error) throw new Error(result.error);
        return result.data!;
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
    } = useRemoteMarkdown(EXTERNAL_URLS.README);

    const categories = React.useMemo(() => {
        if (!markdown) return [];
        return parseMarkdownContent(markdown);
    }, [markdown]);

    return { categories, isLoading, error };
}
