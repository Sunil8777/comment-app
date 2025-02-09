import useCurrentUser from '@/app/hooks/useCurrentUser'
import useNotifications from '@/app/hooks/useNotifications'
import React, { useEffect } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { ClipLoader } from 'react-spinners'

export default function NotificationFeed() {
    const {mutate: mutateCurrentUser} = useCurrentUser()
    const {data: fetchedNotification=[],mutate,isLoading} = useNotifications()

    useEffect(()=>{
        mutateCurrentUser()
        mutate()
    },[mutateCurrentUser,mutate])

    if(isLoading){
        return(
          <div className='w-full h-screen flex justify-center items-center text-white'>
            <ClipLoader size={50} color='white'/>
        </div>
        )
    }

    if(!isLoading && fetchedNotification.length===0){
        return(
            <div className='text-neutral-600 text-center p-6 text-xl'>No notifications</div>
        )
    }
  return (
    <div className='flex flex-col'>
      {
        fetchedNotification.map((notification:Record<string,any>)=>(
            <div className='flex items-center p-6 gap-4 border-b-[1px] border-neutral-800' key={notification.id}>
                <BsTwitter size={32} color='white'/>
                <p className='text-white'>{notification.content}</p>
            </div>
        ))
      }
    </div>
  )
}
