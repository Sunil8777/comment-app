import useUsers from "@/app/hooks/useUsers";
import React, { useState } from "react";
import Avatar from "./Avatar";

export default function Rightsidebar() {
  const { data } = useUsers();

  const user = data?.message ? Object.values(data.message) : [];

  if (user?.length === 0) {
    return null;
  }
  console.log(user);
  return (
    <div className="min-w-[30%] border-x-[1px] border-neutral-800 relative">
      <div className="absolute px-6 py-4 hidden lg:block ">
        <div className="bg-neutral-800 rounded-xl p-4 ">
          <h2 className="text-xl font-semibold text-white">Who to follow</h2>
          <div className="flex flex-col gap-1 mt-4 text-white">
            {user.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center">
                <Avatar userId={item.id} />
                <div className="flex flex-col relative top-1">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-neutral-400 text-sm relative -top-1">
                    @{item.username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
