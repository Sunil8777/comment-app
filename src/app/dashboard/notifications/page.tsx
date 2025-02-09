'use client'
import Header from '@/components/app-ui/Header'
import NotificationFeed from '@/components/notification/NotificationFeed'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

export default function page() {
  const {data:session,status} = useSession()
  const router = useRouter()

  useEffect(()=>{
    if(status === 'unauthenticated'){
      router.replace('/dashboard')
    }
  },[status,router])

  if(status==='loading'){
    return (
      <>
        <div className='w-full h-screen '>
          <Header showBackArrow label='Notifications' />
          <div className='flex items-center justify-center h-screen'>
            <ClipLoader size={50} color='white'/>
          </div>
        </div>
      </>
    )
  }
  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className='w-full h-screen '>
      <Header showBackArrow label='Notifications' />
      <NotificationFeed/>
    </div>
  )
}
