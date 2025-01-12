import { auth } from "@/app/api/auth/[...nextauth]/auth"

const ServerAuth = async ()=>{
    const session = await auth()

    if(!session?.user?.email){
        throw new Error("Not signIn")
    }

    const currentuser = await prisma?.user.findUnique({
        where:{
            email:session.user?.email
        }
    })

    if(!currentuser){
        throw new Error("Not signIn")
    }

    return {currentuser}
}

export default ServerAuth