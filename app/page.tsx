"use client";

import Loader from "@/components/loader";
import Login from "@/components/loginpage";
import BentoGridThirdDemo from "@/components/sideGrid";
import { Vortex } from "@/components/ui/vortex";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

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
    getUserOrganizations,isAuthenticated
  } = useKindeBrowserClient();
  if (isLoading) {
    return (
      <div className="relative w-screen h-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-black blur-sm">
        <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={360}
        baseHue={120}
        className="flex flex-col  px-2 md:px-10  py-4 w-screen h-screen"
      > </Vortex>
        </div>
        <div className="relative z-10">
          <Loader />
        </div>
      </div>
    );
  }
  if(!isAuthenticated){
    return(
      <Login/>
    )
  }
    return (
    <>
    <div className=" w-screen h-screen bg-black">
    <div className="w-screen h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={160}
        baseHue={120}
        className="flex flex-col  px-2 md:px-10  py-4 w-screen h-screen"
      >
        <h2 className="text-white text-2xl md:text-5xl font-bold text-center mt-4 ">
          Welcome {user?.given_name} to Repl
        </h2>
        <p className="text-white text-sm md:text-xl max-w-xl mt-6 ml-[34%]">
          Click on create repl do create a new project
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-8 mt-6">
          <button className=" px-4 py-2 bg-green-600 hover:bg-green-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] ml-[40%] ">
            Create Repl
          </button>
          <button className=" px-4 py-2 border-[1.2px] border-red-700  transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] ">
            <LogoutLink>Logout</LogoutLink>
          </button>
        </div>
        <div className=" mt-[100px] flex flex-row h-full  ">
        <div className=" w-2/3">
        <BentoGridThirdDemo/>
        </div>
        <div className=" w-1/3 bg-indigo-800">
        
        </div>
        </div>
      </Vortex>
    </div>
    </div>
    </>
  );
}
