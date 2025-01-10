'use client'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface HeaderProps{
    label:string,
    showBackArrow?:boolean
}

export default function Header({label,showBackArrow}:HeaderProps) {
    const router = useRouter()

    const handleBack = useCallback(()=>{
        router.back()
    },[router])
  return (
    <div className='border-b-[1px] border-neutral-800 p-5'>
        <div className='flex items-center gap-2'>
          {
            showBackArrow && (
                <BiArrowBack onClick={handleBack} color='white' size={20} className='cursor-pointer hover:opacity-70 transition'/>
            )
          }
          <h1 className='text-xl font-semibold text-white'>{label}</h1>
        </div>
      </div>
  )
}
