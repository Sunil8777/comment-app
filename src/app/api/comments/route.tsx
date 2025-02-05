import ServerAuth from "@/lib/serverAuth";

export async function POST(request:Request) {
    const {currentuser} = await ServerAuth()
    const {userPost:content} = await request.json()

    const url = new URL(request.url)
    const postId = url.searchParams.get("postId")

    try {
        if(!currentuser || !postId){
            return Response.json({
                success:"false",
                message:"Anauthorized request"
            },{status:401})
        }
        await prisma?.comment.create({
            data:{
                content,
                postId,
                userId:currentuser?.id
            }
        })

        const post = await prisma?.post.findUnique({
            where:{
                id:postId
            }
        })

        try {
            if(!post){
                return Response.json("Unable to notify",{status:500})
            }
    
            await prisma?.notification.create({
                data:{
                  content:`${currentuser.username} replied to your tweet`,
                  userId:post.userId
                }
              })
          
              await prisma?.user.update({
                where:{
                  id:post.userId
                },data:{
                  hasNotification:true
                }
              })
        } catch (error) {
            console.log(error)
        }

        return Response.json("Comment created ",{status:200})
    } catch (error) {
        return Response.json({
            success:false,
            message:error
        },{status:500})
    }
}