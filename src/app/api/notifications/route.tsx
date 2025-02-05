import ServerAuth from "@/lib/serverAuth";
import prisma from '@/lib/prismadb'

export async function GET(request:Request) {

    try {
        const {currentuser} = await ServerAuth()
        
        if(!currentuser){
            return Response.json({
                success:false,
                message:"Anauthorized request"
            },{status:401})
        }

        const notifications = await prisma.notification.findMany({
            where:{
                userId:currentuser.id
            },
            orderBy:{
                createdAt:'desc'
            }
        })

        await  prisma.user.update({
            where:{
                id:currentuser.id
            },
            data:{
                hasNotification:false
            }
        })
        
        return Response.json(notifications,{status:200})
    } catch (error) {
        return Response.json({
            success:false,
            message:"Server error on notification show"
        },{status:500})
    }
}