"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DirectoryTree from "@/components/filetress";
import Terminal from "@/components/terminal";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { getFileMode } from "@/utils/getfilemode";

const Project = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | undefined>("");

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

  return (
    <div className="w-screen h-screen bg-zinc-800 flex flex-col overflow-hidden ">
      <div className=" h-[7%] w-[100%]"></div>
      <div className=" flex flex-row h-[93%] w-[100%]">
      <div className="w-[18%] bg-[#0D1525] p-4">
        <DirectoryTree selectedFile={selectedFile} onFileClick={handleFileClick} />
      </div>
      <div className="w-[45%] bg-blue-600 flex flex-col">
        <h2 className="text-white">Selected file: {selectedFile}</h2>
        <div className="flex-1">
          <AceEditor
            placeholder="Placeholder Text"
            mode={getFileMode({ selectedFile })}
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
      <div className="w-[37%] h-screen bg-slate-600 flex flex-col">
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
