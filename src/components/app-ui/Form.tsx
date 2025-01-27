"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useClickStore } from "@/app/store/store";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import Avatar from "./Avatar";
import toast from "react-hot-toast";
import axios from "axios";
import usePosts from "@/app/hooks/usePost";

interface formProps {
  placeholder: string;
  isComment?: boolean;
}
export default function Form({ placeholder, isComment}: formProps) {
  const { toggle } = useClickStore();
  const { currentUser } = useCurrentUser();
  const { mutate: allUserPost } = usePosts();

  const [userPost, setUserPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("api/posts", { userPost });
      setUserPost("");
      allUserPost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [allUserPost,userPost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex gap-4">
          <div>
            <Avatar userId={currentUser.id} />
          </div>
          <div className="w-full">
            <textarea
              onChange={(e) => setUserPost(e.target.value)}
              disabled={isLoading}
              className="disable:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white "
              placeholder={placeholder}
            />
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex justify-end">
              <Button
                disabled={isLoading || !userPost}
                onClick={onSubmit}
                className="bg-sky-500 rounded-full">
                Tweet
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 text-white">
          <h1 className="text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={toggle} className="rounded-full bg-sky-500">
              Login/Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
