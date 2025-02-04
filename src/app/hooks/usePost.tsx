import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const usePost = (userPostId:string) =>{
    const {data,error,mutate,isLoading} = useSWR(`api/posts/${userPostId}`,fetcher)

    return {data,error,mutate,isLoading}
}

export default usePost