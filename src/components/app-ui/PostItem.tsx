import React, { useCallback, useMemo } from 'react'
import Avatar from './Avatar'
import { AiOutlineLike, AiOutlineMessage } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { formatDistanceToNowStrict } from 'date-fns';
import { useClickStore } from '@/app/store/store';
interface postItemProps{
    data:Record<string,any>,
}
export default function PostItem({data}:postItemProps) {
  const router = useRouter()
  const {toggle} = useClickStore()

  const goToUser = useCallback((e:any)=>{
    e.stopPropagation()
    router.push(`dashboard/users/${data.user.id}`)
  },[router,data.user.id])

  const goToPost = useCallback(()=>{
    router.push(`posts/${data.id}`)
  },[router,data.id])

  const onLike = useCallback((e:any)=>{
    e.stopPropagation()
    toggle()
  },[toggle])

  const createdAt = useMemo(()=>{
    if(!data.createdAt){
      return null
    }
    return formatDistanceToNowStrict(new Date(data.createdAt))
  },[data?.createdAt])
  return (
    <div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'>
      <div className='flex items-start gap-3'>
        <Avatar userId={data.userId}/>
        <div>
          <div className='flex items-start gap-2'>
            <p onClick={goToUser} className='text-white font-semibold cursor-pointer hover:underline'>{data.user.username}</p>
            <p onClick={goToUser} className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data.user.name}</p>
            <p className='text-neutral-500 text-sm'>{createdAt} ago</p>
          </div>
          <div className='text-white mt-1'>
            {data.content}
          </div>
          <div className='flex items-start mt-3 gap-10'>
            <div onClick={goToPost} className='flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
              <AiOutlineMessage size={20}/>
              <p>
                {data.comments.length || 0}
              </p>
            </div>
            <div onClick={onLike} className='flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-white'>
              <AiOutlineLike size={20}/>
              <p>
                {data.likedId.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
