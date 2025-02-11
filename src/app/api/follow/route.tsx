import ServerAuth from "@/lib/serverAuth";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const { currentuser } = await ServerAuth();

  try {
    if (!currentuser || !userId) {
      return Response.json(
        {
          sucess: false,
          message: "Invalid request",
        },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: {
        id: currentuser.id,
      },
      data: {
        followingIds:{
          push: userId
        }
      },
    });

    await prisma.notification.create({
      data:{
        content:`${currentuser.username} Followed you`,
        userId
      }
    })

    await prisma.user.update({
      where:{
        id:userId
      },data:{
        hasNotification:true
      }
    })

    return Response.json(
      {
        success: true,
        message: "Follow success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { userId } = await req.json();
  const { currentuser } = await ServerAuth();
  try {
    if (!currentuser || !userId) {
      return Response.json(
        {
          sucess: false,
          message: "Invalid request",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentuser.id,
      },
    });

    if (!user) {
      return Response.json(
        {
          sucess: false,
          message: "Invalid request",
        },
        { status: 401 }
      );
    }
    let updatedFollowingIds = [...(user?.followingIds || [])]

    updatedFollowingIds = updatedFollowingIds.filter(id=>id !== userId)

    await prisma.user.update({
      where: {
        id: currentuser.id,
      },
      data: {
        followingIds:updatedFollowingIds
      },
    });
    return Response.json(
      {
        success: true,
        message: "Follow success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
