import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const usePost = (userPostId:string) =>{
    const {data,error,mutate,isLoading} = useSWR(`api/posts/${userPostId}`,fetcher)
    const post = data?.message || []

    return {post,error,mutate,isLoading}
}

export default usePost