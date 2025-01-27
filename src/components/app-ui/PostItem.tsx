import React from 'react'
interface postItemProps{
    data:Record<string,any>,
    userId?:string
}
export default function PostItem({data,userId}:postItemProps) {
  return (
    <div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'>
      
    </div>
  )
}
