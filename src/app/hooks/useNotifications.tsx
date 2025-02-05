import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const useNotifications = () =>{
    const {data,error,isLoading,mutate} = useSWR('/api/notifications',fetcher)

    return {data,error,isLoading,mutate}
}

export default useNotifications