import React, { useEffect, useState } from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Sidebarlogo from "./Sidebarlogo";
import Sidebaritem from "./Sidebaritem";
import { BiLogOut } from "react-icons/bi";
import SideBarTweet from "./SideBarTweet";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/app/hooks/useCurrentUser";

export default function Leftsidebar() {
  const {currentUser} = useCurrentUser()

  const handleLogOut = () =>{
    signOut()
  }
  const items = [
    {
      label: "Home",
      href: "/dashboard",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/dashboard/notifications",
      icon: BsBellFill,
      auth:true,
      alert:currentUser?.hasNotification
    },
    {
      label: "Profile",
      href: `/dashboard/users/${currentUser?.id}`,
      icon: FaUser,
      auth:true
    },
  ];
  return (
    <div className="min-w-[30%] border-x-[1px] border-neutral-800 pr-6 lg:pr-0 ">
        <div className="flex flex-col items-end lg:items-center ">
            <div className="space-y-2 lg:w-[230px]">
                <Sidebarlogo/>
                {
                    items.map((item)=>(
                        <Sidebaritem  key={item.href} href={item.href} icon={item.icon} label={item.label} auth={item.auth} alert={item.alert}/>
                    )
                    )
                }
                
                {
                  (currentUser) && <Sidebaritem onClick={handleLogOut} icon={BiLogOut} label="Logout"/>
                }
                <SideBarTweet />
            </div>
        </div>
    </div>
  );
}
