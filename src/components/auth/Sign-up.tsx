"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoCloseSharp } from "react-icons/io5";
import {useAuthStore, useClickStore} from "@/app/store/store";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string()
    .email("must be a valid email"),
  password: z
    .string()
    .min(2, "must contain 8 character")
    .max(15, "maximum limit is 15 character"),
  name: z
    .string()
    .min(3, "Atleast contain 3 character")
    .max(15, "maximum limit is 15 character"),
  username: z
    .string()
    .min(5, "atleast 5 character")
    .max(15, "maximum 15 character"),
});

export function SignUp() {
  const {toggle} = useClickStore()
  const {toggleAuth} = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post('api/register',values)
      const {email,password} = values

      toast.success('Account created')

      signIn('credentials',{
        email,
        password
      },
    )

    toggle()

    } catch (error: any) {
      if(error.response){
        toast.error(error.response.data.message)
      }
      else toast.error('Something went wrong')
    }
  }
  return (
    <div className="flex justify-center items-center h-screen z-50 relative">
      <div className="rounded-lg min-w-[30%] min-h-[43%] p-5 bg-red-300">
        <div className="mb-7 flex items-center justify-between">
          <p className="font-semibold text-xl">Create an account</p>
          <IoCloseSharp size={20} onClick={toggle}/>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field}
                      type="password"
                      className="mb-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="rounded-lg" type="submit">
              Register
            </Button>
          </form>
        </Form>
        <div className="flex mt-3 text-[14px]">
            <p className="">Already have an account?</p>
            <p onClick={toggleAuth} className="font-semibold text-white cursor-pointer">Log in</p>
        </div>
      </div>
    </div>
  );
}
