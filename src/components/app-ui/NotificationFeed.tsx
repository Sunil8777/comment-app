import useCurrentUser from '@/app/hooks/useCurrentUser'
import useNotifications from '@/app/hooks/useNotifications'
import React, { useEffect } from 'react'
import { BsTwitter } from 'react-icons/bs'

export default function NotificationFeed() {
    const {currentUser,mutate: mutateCurrentUser} = useCurrentUser()
    const {data: fetchedNotification=[],mutate} = useNotifications()

    useEffect(()=>{
        mutateCurrentUser()
        mutate()
    },[mutateCurrentUser,mutate])

    if(fetchedNotification.length===0){
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
