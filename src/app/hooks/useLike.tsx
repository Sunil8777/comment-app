import { useCallback, useMemo } from "react"
import useCurrentUser from "./useCurrentUser"
import { useClickStore } from "../store/store"
import axios from "axios"
import toast from "react-hot-toast"
import usePost from "./usePost"
import { usePosts } from "./usePosts"

const useLike = (userPostId:string,userId:string) =>{
    const {currentUser} = useCurrentUser()
    const {data:post,mutate:userPostMutate} = usePost(userPostId)
    const {mutate:mutateAllPosts} = usePosts(userId)
    const {toggle} = useClickStore()

    const isLiked = useMemo(()=>{
        const list = post?.likedId || []

        return list.includes(currentUser?.id)
    },[currentUser?.id,post?.likedId])

    const toggleLiked = useCallback(async ()=>{
        if(!currentUser){
            return toggle()
        }

        try {
            if(isLiked){
                await axios.delete('/api/like',{data:{userPostId}})
            }else{
                await axios.post('/api/like',{userPostId})
            }
            mutateAllPosts()
            userPostMutate()

            toast.success("Success")
        } catch (error) {
            toast.error("Something went wrong")
        }
    },[currentUser,toggle,isLiked,userPostId,mutateAllPosts,userPostMutate])

    return {isLiked,toggleLiked}
}

export default useLike;