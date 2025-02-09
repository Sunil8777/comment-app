import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : `/api/posts`;
    let { data, error, isLoading, mutate } = useSWR(url, fetcher);
    data = data?.message || []

    return { data, error, isLoading, mutate };
};
