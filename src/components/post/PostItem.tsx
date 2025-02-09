import React, { useCallback, useMemo, useState } from "react";
import Avatar from "../app-ui/Avatar";
import { AiFillLike, AiOutlineLike, AiOutlineMessage } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import useLike from "@/app/hooks/useLike";
interface postItemProps {
  data: Record<string, any>;
  userId?:string
}
export default function PostItem({ data,userId }: postItemProps) {
  const router = useRouter();
  const { isLiked, toggleLiked } = useLike(data.id,userId || "");

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`dashboard/users/${data.user.id}`);
    },
    [router, data]
  );

  const goToPost = useCallback(() => {
    router.push(`dashboard/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation();
      toggleLiked();
    },
    [toggleLiked]
  );

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);
  return (
    <div
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
      onClick={goToPost}>
      <div className="flex items-start gap-3">
        <Avatar userId={data.userId} />
        <div>
          <div className="flex items-start gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline">
              {data.user.username}
            </p>
            <p
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user?.name}
            </p>
            <p className="text-neutral-500 text-sm">{createdAt} ago</p>
          </div>
          <div className="text-white mt-1">{data.content}</div>
          <div className="flex items-start mt-3 gap-10">
            <div
              onClick={goToPost}
              className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-white">
              {isLiked ? (
                <AiFillLike size={20} color="blue" />
              ) : (
                <AiOutlineLike size={20} color="white" />
              )}
              <p>{data.likedId.length }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
