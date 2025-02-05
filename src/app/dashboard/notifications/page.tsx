'use client'
import Header from '@/components/app-ui/Header'
import NotificationFeed from '@/components/app-ui/NotificationFeed'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

export default function page() {
  const {data:session,status} = useSession()
  const router = useRouter()

  useEffect(()=>{
    if(!session){
      router.push('/dashboard')
    }
  },[session,router])

  if(status==='loading'){
    return (
      <div className='w-full flex items-center justify-center h-screen'>
          <ClipLoader size={40} color='white'/>
      </div>
    )
  }

  return (
    <div className='h-screen w-full'>
      <Header showBackArrow label='Notifications' />
      <NotificationFeed/>
    </div>
  )
}
