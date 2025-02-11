'use client'
import useUser from '@/app/hooks/useUser'
import Header from '@/components/app-ui/Header'
import PostFeed from '@/components/post/PostFeed'
import UserBio from '@/components/user/UserBio'
import UserHero from '@/components/user/UserHero'
import { useParams } from 'next/navigation'
import {ClipLoader} from 'react-spinners'

export default function userProfile() {
  const params = useParams();
  const userId = params.userId as string;
  const {data:user,isLoading} = useUser(userId)
  const profileName  = user?.message?.user?.name
  
  if(!user || isLoading){
    return(
      <div className='min-w-[40%] h-full flex justify-center items-center'>
        <ClipLoader color='lightblue' size={50}/>
      </div>
    )
  }

  return (
    <div className='min-w-[40%] '>
      <Header label={profileName} showBackArrow/>
      <UserHero userId={userId}/>
      <UserBio userId={userId}/>
      <PostFeed userId={userId}/>
    </div>
  )
}
