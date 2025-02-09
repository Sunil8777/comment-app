import React, { useCallback, useMemo, useState } from "react";
import Avatar from "../app-ui/Avatar";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
interface commentItemProps {
  data: Record<string, any>;
}
export default function CommentItem({ data }: commentItemProps) {
  const router = useRouter();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`dashboard/users/${data.user.id}`);
    },
    [router, data]
  );

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);
  return (
    <div
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
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
        </div>
      </div>
    </div>
  );
}
