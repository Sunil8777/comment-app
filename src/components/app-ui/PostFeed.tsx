import usePosts from '@/app/hooks/usePost'
import React from 'react'
import PostItem from './PostItem'
interface postFeedProps{
    userId?:string
}
export default function PostFeed({userId}:postFeedProps) {
    const {data:posts = []} = usePosts(userId)

  return (
    <>
        {
            posts.map((post:Record<string,any>)=>(
                <PostItem key={post.id} userId={userId} data={post}/>
            ))
        }
    </>
  )
}
