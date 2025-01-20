import ServerAuth from "@/lib/serverAuth";

export async function GET(){
    try {
        const {currentuser} = await ServerAuth()
        return Response.json(
            {
                success:true,
                message:currentuser
            },
            {
                status:200
            }
        )
    } catch (error) {
        return Response.json(
            {
                success:false,
                message:"Unable to get the session"
            },
            {
                status:404
            }
        )
    }
}