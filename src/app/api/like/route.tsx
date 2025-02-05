import ServerAuth from "@/lib/serverAuth";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  const { currentuser } = await ServerAuth();
  const { userPostId } = await req.json();

  try {
    if (!currentuser || !userPostId) {
      return Response.json(
        {
          success: false,
          message: "Invalid Request",
        },
        { status: 401 }
      );
    }

    const userPost = await prisma.post.update({
      where: {
        id: userPostId,
      },
      data: {
        likedId: {
          push: currentuser.id,
        },
      },
    });

    if (!userPost) {
      return Response.json(
        {
          success: false,
          message: "Invalid Request",
        },
        { status: 401 }
      );
    }

    await prisma.notification.create({
      data:{
        content:`${currentuser.username} Liked your tweet`,
        userId:userPost.userId
      }
    })

    await prisma.user.update({
      where:{
        id:userPost.userId
      },data:{
        hasNotification:true
      }
    })

    return Response.json({ userPost }, { status: 200 });
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
  const { currentuser } = await ServerAuth();
  const { userPostId } = await req.json();

  try {
    if (!currentuser || !userPostId) {
      return Response.json(
        {
          success: false,
          message: "Invalid Request",
        },
        { status: 401 }
      );
    }

    const userPost = await prisma.post.findUnique({
      where: {
        id: userPostId,
      },
    });

    if (!userPost) {
      return Response.json(
        {
          success: false,
          message: "Invalid Request",
        },
        { status: 401 }
      );
    }

    const likedId = userPost.likedId.filter((ids) => ids !== currentuser.id);

    const updatedUserPost = await prisma.post.update({
      where: {
        id: userPostId,
      },
      data: {
        likedId: likedId,
      },
    });

    return Response.json(
      {
        updatedUserPost,
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
