import Leftsidebar from '@/components/app-ui/Left-sidebar'
import Mainbar from '@/components/app-ui/Main-bar'

import Rightsidebar from '@/components/app-ui/Right-sidebar'
import { ProfileForm } from '@/components/app-ui/Sign-in'
import React from 'react'

export default function page() {
  return (
    <div className='flex h-screen bg-black'>
        <div className="absolute inset-0 z-50 bg-black bg-opacity-50 ">
          <ProfileForm />
        </div>
        <Leftsidebar/>
        <Mainbar/>
        <Rightsidebar/>
    </div>
  )
}
