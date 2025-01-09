import Leftsidebar from '@/components/ui/Left-sidebar'
import Mainbar from '@/components/ui/Main-bar'

import Rightsidebar from '@/components/ui/Right-sidebar'
import React from 'react'

export default function page() {
  return (
    <div className='flex h-screen'>
        <Leftsidebar/>
        <Mainbar/>
        <Rightsidebar/>
    </div>
  )
}
