"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Login from "@/components/loginpage";
import BentoGridThirdDemo from "@/components/sideGrid";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";

import { useRouter } from "next/navigation";

interface Project {
  projectId: string;
  framework: string;
  isActive: boolean;
  lastModified: string;
}

export default function Home() {
  const router = useRouter();
  const { isLoading, user, isAuthenticated } = useKindeBrowserClient();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFramework, setSelectedFramework] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [projLoading, setprojLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);

  const generateRandomString = (): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const handleCreateRepl = (): void => {
    setShowModal(true);
  };

  const handleFrameworkSelect = (framework: string): void => {
    setSelectedFramework(framework);
  };

  const handleCreateProject = async (): Promise<void> => {
    setLoading(true);
    const projectId = generateRandomString();
    const email = user?.email;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/startproject`,
      {
        projectId: projectId,
        email: email,
        framework: selectedFramework,
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      router.replace(
        `/newproject/${response.data.ports.port3002},${response.data.ports.port8000},${selectedFramework},${projectId}`
      );
      setLoading(false);
    }
  };

  const fetchProjects = async (): Promise<void> => {
    try {
      const response = await axios.post<Project[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getprojects`,
        {
          email: user?.email,
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleOpenProject = async(projectId: string, framework: string): Promise<void> => {
    setprojLoading(true);
    const email = user?.email;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/startproject`,
      {
        projectId: projectId,
        email: email,
        framework: framework,
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      router.replace(
        `/newproject/${response.data.ports.port3002},${response.data.ports.port8000},${selectedFramework},${projectId}`
      );
      
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchProjects();
    }
  }, [user]);

  if (isLoading||projLoading) {
    return (
      <div className="relative w-screen h-screen flex justify-center items-center bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
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
      <div className="w-screen h-screen bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <h2 className="text-white text-2xl md:text-5xl font-bold text-center mt-4 relative z-10">
          Welcome {user?.given_name} to Repl
        </h2>
        <p className="text-white text-sm md:text-xl max-w-xl mt-6 ml-[34%] relative z-10">
          Click on create repl to create a new project
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-8 mt-6 relative z-10">
          <button
            onClick={handleCreateRepl}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] ml-[40%]"
          >
            Create Repl
          </button>
          <button className="px-4 py-2 border-[1.2px] border-red-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            <LogoutLink>Logout</LogoutLink>
          </button>
        </div>
        <div className="mt-[100px] flex flex-row h-full relative z-10">
          <div className="w-2/3">
            <BentoGridThirdDemo />
          </div>
          <div className="w-1/3 h-full overflow-y-scroll border-[1.2px] border-zinc-700 rounded-xl p-4">
            <h1 className="text-2xl text-white font-extrabold mb-4">
              Recent Projects
            </h1>
            {loadingProjects ? (
              <p className="text-white">Loading projects...</p>
            ) : (
              [...projects].reverse().map((project) => (
                <div
                  key={project.projectId}
                  className="bg-gray-800 rounded-lg p-3 mb-3 flex items-center justify-between"
                >
                  <div className="flex-grow">
                    <h3 className="text-lg text-white font-semibold">
                      {project.projectId}
                    </h3>
                    <p className="text-sm text-gray-300">{project.framework}</p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`text-xs ${
                          project.isActive ? "text-green-400" : "text-red-400"
                        } mr-2`}
                      >
                        {project.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(project.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {project.isActive ? (
                    <button
                      className="px-3 py-1 bg-gray-600 text-sm rounded text-white cursor-not-allowed"
                      disabled
                    >
                      Open
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-sm rounded text-white transition duration-200"
                      onClick={() =>
                        handleOpenProject(project.projectId, project.framework)
                      }
                    >
                      Open
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded-lg p-6">
            <p
              onClick={() => {
                setShowModal(false);
              }}
              className="text-red-900 font-extrabold hover:text-slate-800 text-right cursor-pointer"
            >
              X
            </p>
            <h2 className="text-2xl font-bold mb-4">Select Framework</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleFrameworkSelect("Node.js")}
                className={`px-4 py-2 rounded-lg ${
                  selectedFramework === "Node.js"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Node.js
              </button>
              <button
                onClick={() => handleFrameworkSelect("React.js")}
                className={`px-4 py-2 rounded-lg ${
                  selectedFramework === "React.js"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                React.js
              </button>
              <button
                onClick={handleCreateProject}
                className={
                  loading
                    ? "bg-zinc-500 px-2 py-1 text-white rounded-lg"
                    : "px-4 py-2 bg-green-600 hover:bg-green-700 transition duration-200 rounded-lg text-white"
                }
              >
                {loading ? (
                  <span
                    className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></span>
                ) : (
                  "Create Project"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
