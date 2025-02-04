import prisma from "@/lib/prismadb"

export async function GET(req:Request) {
    try {
        const users = await prisma.user.findMany(
            {
                orderBy:{
                    createdAt: 'desc'
                }
            }
        )
        return Response.json(
            {
                success:true,
                message:{...users}
            },
            {status:200}
        )
    } catch (error) {
        return Response.json(
            {
                succuss:false,
                message:"Unable to find the following list"
            },
            {status:500}
        )
    }
}