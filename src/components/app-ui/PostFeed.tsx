'use client'
import {usePosts} from "@/app/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";
interface postFeedProps {
  userId?: string;
}
export default function PostFeed({ userId }: postFeedProps) {
  const { post: posts = [] } = usePosts(userId);
  console.log(posts)
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} />
      ))}
    </>
  );
}
