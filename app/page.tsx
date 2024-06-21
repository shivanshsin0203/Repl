"use client";

import { useState } from "react";
import Loader from "@/components/loader";
import Login from "@/components/loginpage";
import BentoGridThirdDemo from "@/components/sideGrid";
import { Vortex } from "@/components/ui/vortex";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
    isAuthenticated,
  } = useKindeBrowserClient();

  const [showModal, setShowModal] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [loading, setLoading] = useState(false);
  const generateRandomString = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const handleCreateRepl = () => {
    setShowModal(true);
  };

  const handleFrameworkSelect = (framework:any) => {
    setSelectedFramework(framework);
  };

  const handleCreateProject = async () => {
    setLoading(true);
    const projectId = generateRandomString();
    const email = user?.email;
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/startproject`, {
      projectId: projectId,
      email: email,
      framework: selectedFramework,
    });

    if (response.status === 200) {
      router.push(`/newproject/${projectId}`);
    }
    setLoading(false);
  };

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
          >
            {" "}
          </Vortex>
        </div>
        <div className="relative z-10">
          <Loader />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <div className="w-screen h-screen bg-black">
        <div className="w-screen h-screen overflow-hidden">
          <Vortex
            backgroundColor="black"
            rangeY={800}
            particleCount={160}
            baseHue={120}
            className="flex flex-col  px-2 md:px-10  py-4 w-screen h-screen"
          >
            <h2 className="text-white text-2xl md:text-5xl font-bold text-center mt-4">
              Welcome {user?.given_name} to Repl
            </h2>
            <p className="text-white text-sm md:text-xl max-w-xl mt-6 ml-[34%]">
              Click on create repl to create a new project
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-8 mt-6">
              <button onClick={handleCreateRepl} className="px-4 py-2 bg-green-600 hover:bg-green-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] ml-[40%]">
                Create Repl
              </button>
              <button className="px-4 py-2 border-[1.2px] border-red-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                <LogoutLink>Logout</LogoutLink>
              </button>
            </div>
            <div className="mt-[100px] flex flex-row h-full">
              <div className="w-2/3">
                <BentoGridThirdDemo />
              </div>
              <div className="w-1/3 h-full overflow-y-auto border-[1.2px] border-zinc-700 rounded-xl p-1">
                <h1 className="ml-0 text-xl text-white font-extrabold">Recent Projects</h1>
              </div>
            </div>
          </Vortex>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          
          <div className="bg-white rounded-lg p-6">
          <p onClick={()=>{setShowModal(false)}} className=" text-red-900 font-extrabold hover:text-slate-800 text-right cursor-pointer">X</p>
            <h2 className="text-2xl font-bold mb-4">Select Framework</h2>
            <div className="flex flex-col gap-4">
              <button onClick={() => handleFrameworkSelect("Node.js")} className={`px-4 py-2 rounded-lg ${selectedFramework === "Node.js" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                Node.js
              </button>
              <button onClick={() => handleFrameworkSelect("React.js")} className={`px-4 py-2 rounded-lg ${selectedFramework === "React.js" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                React.js
              </button>
              <button onClick={handleCreateProject} className={(loading? ' bg-zinc-500 px-2 py-1 text-white  rounded-lg ':'px-4 py-2 bg-green-600 hover:bg-green-700 transition duration-200 rounded-lg text-white')}>
                {loading ? <span   className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status"></span> : "Create Project"}
              </button>
             
            </div>
          </div>
        </div>
      )}
    </>
  );
}
