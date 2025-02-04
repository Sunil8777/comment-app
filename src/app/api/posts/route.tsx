import prisma from "@/lib/prismadb";
import ServerAuth from "@/lib/serverAuth";

export async function GET(req: Response) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (userId) {
      const userPost = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return Response.json(
        {
          success: true,
          message: userPost,
        },
        { status: 200 }
      );
    }
    const allPost = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(allPost,{status:200})
  } catch (error) {
    return Response.json({
      success:false,
      message:"error"
    },{status:500})
  }
}

export async function POST(req: Response) {
  try {
    const { userPost } = await req.json();
    const { currentuser } = await ServerAuth();

    const updatedPost = await prisma.post.create({
      data: {
        content: userPost,
        userId: currentuser.id,
      },
    });

    return Response.json(
      {
        success: true,
        message: updatedPost,
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
