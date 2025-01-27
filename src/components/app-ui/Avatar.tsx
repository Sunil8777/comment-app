import useUser from "@/app/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}
export default function Avatar({ userId, isLarge, hasBorder }: AvatarProps) {
  const {data} = useUser(userId)
  const profileImage = data?.message?.user.profileImage

  const router = useRouter()

  const onClick = useCallback((event:any)=>{
    event.stopPropagation();
    const url = `/dashboard/users/${userId}`;
    router.push(url)
  },[router,userId])

  return (
    <div className={`
      ${hasBorder? 'border-4 border-black':''}
      ${isLarge?'h-32':'h-12'}
      ${isLarge?'w-32':'w-12'} relative rounded-full transition cursor-pointer hover:opacity-90`}>
      <Image
         fill
         style={{
             objectFit: 'cover',
             borderRadius: '100%',
         }}
         alt="Avatar"
         onClick={onClick}
         src={profileImage? profileImage:"/image/placeholder.png" }
     />           
    </div>
  );
}
