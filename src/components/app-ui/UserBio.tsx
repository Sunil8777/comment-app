import useUser from "@/app/hooks/useUser"
import { useCurrentUser } from "@/app/store/store"
import {format} from 'date-fns'
import { useMemo } from "react"

interface UserBioProps{
    userId:string
}
export default function UserBio({userId}:UserBioProps) {
    const {data:fetchUser} = useUser(userId)
    const {user} = useCurrentUser()

    const createdAt = useMemo(()=>{
        if(!fetchUser?.message.user.createdAt){
            return null
        }
        return format(new Date(fetchUser?.message.user.createdAt),'MMMM yyyy')
    },[fetchUser?.message.user.createdAt])
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {
            
        }
      </div>
    </div>
  )
}
