import { useCallback } from "react"
import useCurrentUser from "./useCurrentUser"
import { useClickStore } from "../store/store"
import axios from "axios"
import toast from "react-hot-toast"
import usePost from "./usePost"

const useLike = (userPostId:string) =>{
    const {currentUser,mutate:currentUserMutate} = useCurrentUser()
    const {post,mutate:userPostMutate} = usePost(userPostId)
    const {toggle} = useClickStore()

    const isLiked = useCallback(()=>{
        const list = post?.likedId || []

        return list.includes(currentUser.id)
    },[currentUser,post])

    const toggleLiked = useCallback(async ()=>{
        if(!currentUser){
            return toggle()
        }

        let updatePost
        try {
            if(isLiked()){
                updatePost = await axios.delete('api/like',{data:{userPostId}})
            }else{
                updatePost = await axios.post('api/like',{userPostId})
            }
            currentUserMutate()
            userPostMutate()

            toast.success("Success")
        } catch (error) {
            toast.error("Something went wrong")
        }
    },[currentUser,toggle,isLiked,userPostId,currentUserMutate,userPostMutate])

    return {isLiked,toggleLiked}
}

export default useLike;