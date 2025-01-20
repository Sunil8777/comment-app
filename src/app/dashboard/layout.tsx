"use client";
import Leftsidebar from "@/components/app-ui/Left-sidebar";
import Rightsidebar from "@/components/app-ui/Right-sidebar";
import React from "react";
import { useAuthStore, useClickStore } from "../store/store";
import { SignIn } from "@/components/app-ui/Sign-in";
import { SignUp } from "@/components/app-ui/Sign-up";

export default function dashBoardLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  const { isClick } = useClickStore();
  const { login } = useAuthStore();
  return (
    <div className="flex h-screen bg-black ">
      {isClick &&
        (login ? (
          <div className="absolute inset-0 z-50 bg-black bg-opacity-50 ">
            <SignIn />
          </div>
        ) : (
          <div className="absolute inset-0 z-50 bg-black bg-opacity-50 ">
            <SignUp />
          </div>
        ))}
      <Leftsidebar />
      {children}
      <Rightsidebar />
    </div>
  );
}
