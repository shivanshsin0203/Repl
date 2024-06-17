"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function Home() {
  const {
    permissions,
    isLoading,
    user,
    accessToken,
    organization,
    userOrganizations,
    getPermission,
    getBooleanFlag,
    getIntegerFlag,
    getFlag,
    getStringFlag,
    getClaim,
    getAccessToken,
    getToken,
    getIdToken,
    getOrganization,
    getPermissions,
    getUserOrganizations,
  } = useKindeBrowserClient();

  return (
    <>
      <div className=" flex flex-row">
        <div className=" w-1/2 h-screen">
          <img src="/login.png" alt="Your Name" />
        </div>
        <div className=" w-1/2 h-screen bg-[#FCFCFC] flex flex-col items-center ">
          <h1 className=" text-2xl font-bold mt-1">Welcome to Repl</h1>
          <div className=" flex flex-col justify-center items-center w-full h-screen">
            <h1 className=" font-medium mb-4">Create a repl account</h1>
            <div className=" mb-3 w-[58%] h-[5.5%] bg-[#D3D1CF] rounded-md flex justify-center items-center cursor-pointer hover:scale-105 hover:translate-all">
              <RegisterLink>Register</RegisterLink>
            </div>
            <div className=" w-[58%] h-[5.5%] bg-[#D3D1CF] rounded-md flex justify-center items-center cursor-pointer hover:scale-105 hover:translate-all">
              <LogoutLink>Login</LogoutLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
