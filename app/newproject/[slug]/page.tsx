"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DirectoryTree from "@/components/filetress";
import Terminal from "@/components/terminal";
import AceEditor from "react-ace";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { FaNodeJs } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { VscRunBelow } from "react-icons/vsc";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { getFileMode } from "@/utils/getfilemode";
import { GetHeader } from "@/components/header";
import socket from "@/utils/socket";

const Project = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | undefined>("");
  const [showTree, setShowTree] = useState<boolean>(true);
  const handleFileClick = async (filePath: string) => {
    setSelectedFile(filePath);
    try {
      const response = await axios.get(
        `http://localhost:3002/filecontent?path=${encodeURIComponent(filePath)}`
      );
      setFileContent(response.data.content);
    } catch (err) {
      console.error("Error fetching file content:", err);
      setFileContent("Failed to load file content");
    }
  };
  const handleCodeChange = (value: string) => {
    socket.emit("file:change", { path: selectedFile, content: value });
  }
  return (
    <div className="w-screen h-screen bg-zinc-800 flex flex-col overflow-hidden ">
      <div className=" h-[6%] w-[100%] flex flex-row p-2  items-center">
        {showTree ? (
          <GoSidebarCollapse className=" mr-2 ml-2 text-xl cursor-pointer text-white" onClick={() => setShowTree(false)}/>
        ) : (
          <GoSidebarExpand className=" mr-2 ml-2 text-xl text-white" onClick={() => setShowTree(true)} />
        )}
        <IoHomeOutline className="text-xl text-white" />
        <div className=" mr-2 ml-2 flex flex-row space-x-1 justify-center items-center">
          <FaNodeJs className="text-2x text-green-600 bg-green-900 rounded-sm" />
          <h2 className="text-white text-sm">Node.js Project</h2>
        </div>
        <div className=" ml-[40%] flex space-x-1 w-fit rounded-lg bg-green-700 p-1 justify-center items-center hover:scale-105 cursor-pointer">
             <VscRunBelow className="text-xl text-green-400" />
              <p className=" text-green-400 text-sm">Run Code</p>
          </div>
      </div>
      <div className=" flex flex-row h-[94%] w-[100%]">
      <div className={`w-[18%] bg-[#0D1525] p-4 ${showTree ?'':'hidden'}  `}>
        <DirectoryTree selectedFile={selectedFile} onFileClick={handleFileClick} />
      </div>
      <div className={` bg-[#272823] flex flex-col mb-2 ${showTree ?' w-[42%]':' w-[63%]'}`}>
        <GetHeader selectedFile={selectedFile} className=" mb-2" />
        <div className="flex-1">
          <AceEditor
            placeholder="Placeholder Text"
            mode={getFileMode({ selectedFile })}
            onChange={(value)=>handleCodeChange(value)}
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
        <div className="h-[40%] w-full bg-[#0D1525]"></div>
        <div className="h-[60%] w-full flex-1 overflow-x-hidden overflow-y-auto">
          <Terminal />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Project;