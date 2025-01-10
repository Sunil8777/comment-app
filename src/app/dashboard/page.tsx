import Leftsidebar from '@/components/app-ui/Left-sidebar'
import Mainbar from '@/components/app-ui/Main-bar'

import Rightsidebar from '@/components/app-ui/Right-sidebar'
import React from 'react'

export default function page() {
  return (
    <div className='flex h-screen bg-black'>
        <Leftsidebar/>
        <Mainbar/>
        <Rightsidebar/>
    </div>
  )
}
