import useCurrentUser from "@/app/hooks/useCurrentUser"
import useUser from "@/app/hooks/useUser"
import {format} from 'date-fns'
import { useMemo } from "react"
import { Button } from "../ui/button"
import { BiCalendar } from "react-icons/bi"
import { useEditModel } from "@/app/store/store"

interface UserBioProps{
    userId:string
}
export default function UserBio({userId}:UserBioProps) {
    const {data:fetchUser} = useUser(userId)
    const {currentUser} = useCurrentUser()
    const {toggleEditModel} = useEditModel()

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
            currentUser?.id === userId?(
              <Button  className="px-4 py-2 rounded-full " variant="secondary" onClick={toggleEditModel}>Edit</Button>
            ):(
              <Button  className="px-4 py-2 rounded-full" variant='secondary'>Follow</Button>
            )
        }
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchUser.message.user.name}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchUser.message.user.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">
            {fetchUser.message.user.bio}
          </p>
          <div className="flex items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-1">
            <p className="text-white">
              {fetchUser?.message.user.followingIds.length}
            </p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-white">
              {fetchUser?.message.countFollower || 0}
            </p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
