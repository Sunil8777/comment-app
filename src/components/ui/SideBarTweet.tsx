'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaFeather } from 'react-icons/fa'

export default function SideBarTweet() {
    const router = useRouter()
  return (
    <div onClick={()=>router.push('/')}>
      <div className='mt-6 p-4 lg:hidden bg-sky-500 flex items-end justify-center rounded-full h-14 w-14 hover:bg-opacity-80 cursor-pointer'>
        <FaFeather size={28} color='white'/>
      </div>
      <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 cursor-pointer hover:bg-opacity-90'>
        <p className='hidden lg:block text-center font-semibold text-[20px]'>Tweet</p>
      </div>
    </div>
  )
}
