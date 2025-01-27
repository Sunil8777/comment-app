import React from "react";
import Header from "./Header";
import Form from "./Form";
import PostFeed from "./PostFeed";

export default function Mainbar() {
  return (
    <div className="min-w-[40%] border-x-[1px] border-neutral-800 ">
      <Header label="Home" />
      <Form placeholder="What's happening "/>
      <PostFeed />
    </div>
  );
}
