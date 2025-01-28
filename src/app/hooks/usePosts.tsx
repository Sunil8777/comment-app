import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : `/api/posts`;
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    const post = data?.message || []; 

    return { post, error, isLoading, mutate };
};
