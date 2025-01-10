'use client'
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Sidebarlogo() {
    const router = useRouter()
    
  return (
    <div onClick={()=> router.push('/')} className="h-14 w-14 rounded-full flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
      <BsTwitter size={28} color="white" />
    </div>
  );
}
