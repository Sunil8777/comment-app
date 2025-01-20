import useSWR, { mutate } from 'swr'
import fetcher from '@/lib/fetcher'

const useUser = (userId:string) => {
    const { data, error, isLoading, mutate } = useSWR(userId?`/api/user/${userId}`:null, fetcher);
    return {data,error,isLoading,mutate}
}

export default useUser