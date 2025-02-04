import bcrypt from "bcrypt";
import prisma from '@/lib/prismadb'
export async function POST(request: Request) {
  try {
    const { email, password, username, name } = await request.json();

    const isExist = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (isExist) {
      return Response.json(
        {
          success: false,
          message: "user already exist",
        },
        {
          status: 401,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma?.user.create({
      data: {
        name,
        email,
        hashedPassword,
        username,
      },
    });

    return Response.json(
        {
          success: true,
          message: "Successfully register",
        },
        {
          status: 200,
        }
      );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error
      },
      {
        status: 500,
      }
    );
  }
}
