import prisma from '@/lib/prismadb'

export async function GET(req:Request,{ params }: { params: { userPostId: string } }) {
    const {userPostId} = await params 
    try {
        if(!userPostId){
            return Response.json({
                success:false,
                message:"Invalid Request"
            },{status:401})
        }

        const findUserPostId  = await prisma.post.findUnique({
            where:{
                id:userPostId 
            },
            include:{
                user:true,
                comments:{
                    include:{
                        user:true
                    }
                }
            }
        })

        if(!findUserPostId){
            return Response.json({
                success:false,
                message: "Post not found"
            },{status:404})
        }
        return Response.json(findUserPostId,{status:200})
    } catch (error) {
        console.error(error)
        return Response.json({
            success:false,
            message:error
        },{status:500})
    }
}