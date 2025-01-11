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
import Link from "next/link";

const formSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(2, "must contain 8 character")
    .max(15, "maximum limit is 15 character"),
  realname: z
    .string()
    .min(3, "Atleast contain 3 character")
    .max(15, "maximum limit is 15 character"),
  username: z
    .string()
    .min(5, "atleast 5 character")
    .max(15, "maximum 15 character"),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      realname: "",
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex justify-center items-center h-screen z-50 relative">
      <div className="rounded-lg min-w-[30%] min-h-[43%] p-5 bg-red-300">
        <div className="mb-7">
          <p className="font-semibold text-xl">Create an account</p>
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
              name="realname"
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
            <Link href="/sign-up" className="font-semibold text-white">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
