import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Sidebarlogo from "./Sidebarlogo";
import Sidebaritem from "./Sidebaritem";
import { BiLogOut } from "react-icons/bi";
import SideBarTweet from "./SideBarTweet";

export default function Leftsidebar() {
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/notification",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/user/123",
      icon: FaUser,
    },
  ];
  return (
    <div className="min-w-[30%] border-x-[1px] border-neutral-800 pr-6 lg:pr-0 ">
        <div className="flex flex-col items-end lg:items-center ">
            <div className="space-y-2 lg:w-[230px]">
                <Sidebarlogo/>
                {
                    items.map((item)=>(
                        <Sidebaritem  key={item.href} href={item.href} icon={item.icon} label={item.label} />
                    )
                    )
                }
                <Sidebaritem onClick={()=>{}} icon={BiLogOut} label="Logout"/>
                <SideBarTweet/>
            </div>
        </div>
    </div>
  );
}
