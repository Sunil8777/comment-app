"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoCloseSharp } from "react-icons/io5";
import { useEditModel } from "@/app/store/store";
import axios from "axios";
import toast from "react-hot-toast";

import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useEffect } from "react";
import useUser from "@/app/hooks/useUser";

const formSchema = z.object({
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
  bio: z
    .string()
    .min(3, "must contain 8 character")
    .max(100, "maximum limit is 100 character"),
  name: z
    .string()
    .min(3, "Atleast contain 3 character")
    .max(15, "maximum limit is 15 character"),
  username: z
    .string()
    .min(5, "atleast 5 character")
    .max(15, "maximum 15 character"),
});

export function EditModel() {
  const { toggleEditModel, isOpen } = useEditModel();
  const { currentUser } = useCurrentUser();
  const { mutate: mutateFetchUser } = useUser(currentUser?.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: "",
      coverImage: "",
      bio: currentUser?.bio || "",
      name: currentUser?.name || "",
      username: currentUser?.username || "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.reset({
        profileImage: "",
        coverImage: "",
        bio: currentUser.bio || "",
        name: currentUser.name || "",
        username: currentUser.username || "",
      });
    }
  }, [currentUser, form]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        field.onChange(base64String);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch("/api/editUser", values);

      mutateFetchUser();

      toast.success("Updated");

      toggleEditModel();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  if (!isOpen) {
    return null;
  }
  return (
    <div className="absolute inset-0 z-50 bg-black bg-opacity-50 text-white">
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg min-w-[30%] min-h-[43%] p-5 bg-black">
          <div className="mb-7 flex items-center justify-between">
            <p className="font-semibold text-xl">Edit your profile</p>
            <IoCloseSharp size={20} onClick={toggleEditModel} />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        className="border-dashed min-h-20 cursor-pointer"
                        onChange={(e) => handleFile(e, field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        className="border-dashed min-h-20 cursor-pointer"
                        onChange={(e) => handleFile(e, field)}
                      />
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
                      <Input placeholder="name" {...field} />
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
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="bio" {...field} className="mb-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="rounded-lg"
                type="submit"
                variant={"secondary"}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
