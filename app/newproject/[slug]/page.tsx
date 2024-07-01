"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DirectoryTree from "@/components/filetress";
import Terminal from "@/components/terminal";
import AceEditor from "react-ace";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { FaNodeJs } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { VscDebugStop, VscRunBelow } from "react-icons/vsc";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { getFileMode } from "@/utils/getfilemode";
import { GetHeader } from "@/components/header";
import { RiComputerLine } from "react-icons/ri";
import { PortsProvider } from "@/utils/portsContext";
import { createSocket } from "@/utils/socket";

const Project = ({ params }: { params: { slug: string } }) => {
  const [port3002, port8000, dockerId] = params.slug.split('%2C').map(String);
  console.log(params.slug);
  console.log(port3002, port8000,dockerId);
  const dockerUrl = `http://localhost:${port3002}`;
  console.log(dockerUrl);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | undefined>("");
  const [socket, setSocket] = useState<any>(null);
  const [showTree, setShowTree] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [livePreviewUrl, setLivePreviewUrl] = useState<string | null>(null);


  useEffect(() => {
    const newSocket = createSocket(port3002);
    setSocket(newSocket);
    
    newSocket.on("connect", () => {
      newSocket.emit("set:id", { id: dockerId });
    });
    
    return () => {
      if (newSocket) {
        newSocket.off("disconnect");
        newSocket.close();
      }
    };
  }, [port3002]);

  const handleFileClick = async (filePath: string) => {
    setSelectedFile(filePath);
    try {
      const response = await axios.get(
        `${dockerUrl}/filecontent?path=${encodeURIComponent(filePath)}`
      );
      setFileContent(response.data.content);
    } catch (err) {
      console.error("Error fetching file content:", err);
      setFileContent("Failed to load file content");
    }
  };

  const handleCodeChange = (value: string) => {
    socket.emit("file:change", { path: selectedFile, content: value });
    setFileContent(value);
  };

  const handleRunCode = async () => {
    try {
      const response = await axios.post(`${dockerUrl}/run`);
      setLivePreviewUrl(`http://localhost:${port8000}`);
      setIsRunning(true);
    } catch (err) {
      console.error("Error running code:", err);
    }
  };

  const handleStopCode = async () => {
    try {
      await axios.post(`${dockerUrl}/stop`);
      setLivePreviewUrl(null);
      setIsRunning(false);
    } catch (err) {
      console.error("Error stopping code:", err);
    }
  };

  return (
    <PortsProvider port3002={port3002} port8000={port8000}>
      <div className="w-screen h-screen bg-zinc-800 flex flex-col overflow-hidden ">
        <div className=" h-[6%] w-[100%] flex flex-row p-2  items-center">
          {showTree ? (
            <GoSidebarCollapse className=" mr-2 ml-2 text-xl cursor-pointer text-white" onClick={() => setShowTree(false)} />
          ) : (
            <GoSidebarExpand className=" mr-2 ml-2 text-xl text-white" onClick={() => setShowTree(true)} />
          )}
          <IoHomeOutline className="text-xl text-white" />
          <div className=" mr-2 ml-2 flex flex-row space-x-1 justify-center items-center">
            <FaNodeJs className="text-2x text-green-600 bg-green-900 rounded-sm" />
            <h2 className="text-white text-sm">Node.js Project</h2>
          </div>
          <div
            className={`ml-[40%] flex space-x-1 w-fit rounded-lg ${isRunning ? 'bg-red-700' : 'bg-green-700'} p-1 justify-center items-center hover:scale-105 cursor-pointer`}
            onClick={isRunning ? handleStopCode : handleRunCode}
          >
            {isRunning ? <VscDebugStop className="text-xl text-red-400" /> : <VscRunBelow className="text-xl text-green-400" />}
            <p className={`text-${isRunning ? 'red' : 'green'}-400 text-sm`}>{isRunning ? 'Stop Code' : 'Run Code'}</p>
          </div>
        </div>
        <div className=" flex flex-row h-[94%] w-[100%]">
          <div className={`w-[18%] bg-[#0D1525] p-4 ${showTree ? '' : 'hidden'}  `}>
            <DirectoryTree socket={socket} selectedFile={selectedFile} onFileClick={handleFileClick} />
          </div>
          <div className={` bg-[#272823] flex flex-col mb-2 ${showTree ? ' w-[42%]' : ' w-[63%]'}`}>
            <GetHeader selectedFile={selectedFile} className=" mb-2" />
            <div className="flex-1">
              <AceEditor
                placeholder="Placeholder Text"
                mode={getFileMode({ selectedFile })}
                onChange={(value) => handleCodeChange(value)}
                theme="monokai"
                name="ace-editor"
                fontSize={15}
                lineHeight={24}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={fileContent}
                width="100%"
                height="100%"
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
          <div className="w-[40%] h-screen bg-slate-600 flex flex-col">
            <div className="h-[40%] w-full bg-white">
              {livePreviewUrl ? <iframe src={livePreviewUrl} className="w-full h-full" /> : <div className=" w-[100%] h-[100%] flex flex-col bg-[#0D1525] text-white items-center justify-center space-y-4 p-4">
                <p className=" text-[5rem]"><RiComputerLine /></p>
                <p className=" text-xl font-semibold">Click on the run code to open live preview</p>
                <p className=" text-md">Dont change app.listen function in index.js  </p>
              </div>}
            </div>
            <div className="h-[60%] w-full flex-1 overflow-x-hidden overflow-y-auto">
              <Terminal socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </PortsProvider>
  );
};

export default Project;
