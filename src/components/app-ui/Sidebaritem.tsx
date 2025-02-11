
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { useClickStore } from '@/app/store/store'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import { BsDot } from 'react-icons/bs'

interface propsValue{
    href?: string,
    label: string,
    icon: IconType
    onClick?: ()=> void
    auth?:boolean
    alert?:boolean
}
export default function Sidebaritem({href,label,icon:Icon,onClick,auth,alert}:propsValue) {

  const router = useRouter()
  const {currentUser} = useCurrentUser()
  const {toggle} = useClickStore()

  const handleClick = useCallback(()=>{
    if(onClick){
      return onClick()
    }
    if(auth && !currentUser){
      return toggle()
    }
    else if(href){
      router.push(href)
    }
  },[href,onClick,router,currentUser,auth,toggle])
  return (
    <div onClick={()=>handleClick()} className='flex items-center'>
      <div className=' h-14 w-14 rounded-full flex items-center justify-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
        <Icon size={28} color='white'/>
        
      </div>
      <div className='gap-4 p-4 rounded-full hidden lg:flex item-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer relative'>
        <Icon size={24} color='white'/>                                                                                                                                                                                                 
        <p className='text-white'>{label}</p>
        {
        alert?<BsDot className='text-sky-500 absolute -top-4 left-0' size={70} />:null                                                                                                                                                                                                                                                          
        }
      </div>
    </div>
  )
}
