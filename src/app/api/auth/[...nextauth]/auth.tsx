import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import prisma from "@/lib/prismadb"
import bcrypt from 'bcrypt'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
          name:'Credentials',
          credentials: {
            email: {label:"Email",type:"text"},
            password: {label:"Password",type:"password"},
          },
          authorize: async (credentials) => {
            
            if(!credentials?.email || !credentials?.password){
                throw new Error("Invalid Credentials")
            }

            const user = await prisma.user.findUnique({
                where:{
                    email:credentials?.email as string
                }
            })

            if(!user){
                throw new Error("Invalid Credentials")
            }

            const isPasswordCorrect = await bcrypt.compare(credentials.password as string,user.hashedPassword as string)

            if(!isPasswordCorrect){
                throw new Error("Incorrect password")
            }
            return user
          },
        }),
      ],
      session:{
        strategy:"jwt"
      },
      secret: process.env.AUTH_SECRET,
})