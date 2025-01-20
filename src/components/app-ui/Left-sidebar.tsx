import React, { useEffect, useState } from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Sidebarlogo from "./Sidebarlogo";
import Sidebaritem from "./Sidebaritem";
import { BiLogOut } from "react-icons/bi";
import SideBarTweet from "./SideBarTweet";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useCurrentUser } from "@/app/store/store";

export default function Leftsidebar() {
  const [currentuser,setUser] = useState(undefined)
  const {user} = useCurrentUser()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/currentUser");
        if (response.status === 200) {
          setUser(response.data.message);
        } else if (response.status === 404) {
          console.error('User not found');
          setUser(undefined);
        } else {
          console.error('An error occurred');
          setUser(undefined);
        }
      } catch (error) {
        setUser(undefined)
      }
    };
    fetchUser();
  }, []);

  const handleLogOut = () =>{
    signOut(
      {redirect:false}
    )
    setUser(undefined)
  }
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
      auth:true
    },
    {
      label: "Profile",
      href: "/user/123",
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
                        <Sidebaritem  key={item.href} href={item.href} icon={item.icon} label={item.label} auth={item.auth}/>
                    )
                    )
                }
                
                {
                  (currentuser || user) && <Sidebaritem onClick={handleLogOut} icon={BiLogOut} label="Logout"/>
                }
                <SideBarTweet />
            </div>
        </div>
    </div>
  );
}
