"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoCloseSharp } from "react-icons/io5";
import {useAuthStore, useClickStore} from "@/app/store/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(2,"must contain 8 character").max(15,"maximum limit is 15 character")
});

export function SignIn() {
  const {toggle} = useClickStore()
  const {toggleAuth} = useAuthStore()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
      } else {
        toast.success('Successfully logged in');
        toggle()
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="rounded-lg min-w-[30%] min-h-[37%] p-5 bg-red-300">
        <div className="mb-7 flex items-center justify-between">
          <p className="font-semibold text-xl">Login</p>
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
              Sign in
            </Button>
          </form>
        </Form>
        <div className="flex mt-3 text-[14px]">
            <p className="">Don't have an account?</p>
            <p onClick={toggleAuth} className="font-semibold text-white cursor-pointer">Sign up</p>
        </div>
      </div>
    </div>
  );
}
