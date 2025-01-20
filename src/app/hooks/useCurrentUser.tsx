import fetcher from '@/lib/fetcher'
import useSWR from 'swr'

const useCurrentUser = () =>{
    const {data,error,isLoading,mutate} = useSWR('/api/currentUser',fetcher)
    const currentUser = data?.message
    return {currentUser,error,isLoading,mutate}
}

export default useCurrentUser;