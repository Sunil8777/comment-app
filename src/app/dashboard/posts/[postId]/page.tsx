'use client'
import usePost from "@/app/hooks/usePost";
import CommentFeed from "@/components/app-ui/CommentFeed";
import Form from "@/components/app-ui/Form";
import Header from "@/components/app-ui/Header";
import PostItem from "@/components/app-ui/PostItem";
import { Clipboard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const { postId } = useParams();
  const router = useRouter();
  const { data: fetchedPost,isLoading } = usePost(postId as string);

  if(isLoading || !fetchedPost){
    return(
        <div className="flex justify-center items-center h-full w-full">
            <Clipboard size={24}/>
        </div>
    )
  }
  return (
    <div className="flex flex-col w-full">
        <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder="Tweet your reply"/>
      <CommentFeed comments={fetchedPost?.comments}/>
    </div>
  );
}
