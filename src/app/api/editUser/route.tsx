import prisma from "@/lib/prismadb";
import ServerAuth from "@/lib/serverAuth";

export async function PATCH(req: Request) {
  try {
    const {currentuser} = await ServerAuth();
    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!currentuser) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    if (!name || !username) {
      return Response.json(
        {
          success: false,
          message: "Missing error",
        },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentuser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage: profileImage || undefined,
        coverImage: coverImage || undefined,
      },
    });

    return Response.json(
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
      },
      { status: 400 }
    );
  }
}
