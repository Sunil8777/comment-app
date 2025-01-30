
import prisma from "@/lib/prismadb";

export async function GET(req:Request, {params} : { params: { userId: string } }) {
  
const {userId} =  params

  try {
    if (!userId) {
      throw new Error("Invalid id");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid request",
        },
        { status: 404 }
      );
    }

    const countFollower = await prisma.user.count({
      where: {
        followingIds: {
          has: userId as string,
        },
      },
    });

    return Response.json(
      {
        success: true,
        message: {user,countFollower},
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Unable to find the user",
      },
      { status: 500 }
    );
  }
}
