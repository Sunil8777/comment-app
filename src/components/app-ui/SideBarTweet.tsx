"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaFeather } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";


export default function SideBarTweet() {
  const router = useRouter();
  const handleClick = () =>{
    
  }
  return (
    <div onClick={()=>handleClick}>
      <div className="mt-6 p-4 lg:hidden bg-sky-500 flex items-end justify-center rounded-full h-14 w-14 hover:bg-opacity-80 cursor-pointer transition">
        <FaFeather size={28} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 cursor-pointer hover:bg-opacity-90 transition">
        <p className="hidden lg:block text-center font-semibold text-[20px] text-white">
          Tweet
        </p>
      </div>
    </div>
  );
}
