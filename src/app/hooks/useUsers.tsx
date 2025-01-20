import useSWR, { mutate } from 'swr'
import fetcher from '@/lib/fetcher'

const useUsers = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher);

    return {data,error,isLoading,mutate}
}

export default useUsers