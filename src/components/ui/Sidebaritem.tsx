import React, { Component } from 'react'
import { IconType } from 'react-icons'
interface propsValue{
    href?: string,
    label: string,
    icon: IconType
    onClick?: ()=> void
}
export default function Sidebaritem({href,label,icon:Icon,onClick}:propsValue) {
  return (
    <div className='flex items-center'>
      <div className=' h-14 w-14 rounded-full flex items-center justify-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
        <Icon size={28} color='white'/>
      </div>
      <div className='gap-4 p-4 rounded-full hidden lg:flex item-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer'>
        <Icon size={24} color='white'/>
        <p>{label}</p>
      </div>
    </div>
  )
}
