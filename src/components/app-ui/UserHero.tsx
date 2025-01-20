import useUser from "@/app/hooks/useUser"
import Image from "next/image"
import Avatar from "./Avatar"

interface UserHeroProps{
    userId:string
}
export default function UserHero({userId}:UserHeroProps) {
    const {data:user} = useUser(userId)
    const coverImage = user?.message.user.coverImage
  return (
    <div>
      <div className="h-44 bg-neutral-700 relative">
        {
            coverImage?(
                <Image fill src={coverImage} alt="Cover Image" style={{objectFit:'cover'}}/>
            ):(
                null
            )
        }
        <div className="absolute -bottom-16 left-4">
            <Avatar isLarge hasBorder userId={userId}/>
        </div>
      </div>
    </div>
  )
}
