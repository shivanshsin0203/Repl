"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFolder, FaJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { BiSolidFileJson } from "react-icons/bi";
import { AiOutlineFile } from 'react-icons/ai';

interface DirectoryTreeProps {
  selectedFile: string | null;
  onFileClick: (filePath: string) => void;
}

function DirectoryTree({ selectedFile, onFileClick }: DirectoryTreeProps) {
  const [tree, setTree] = useState(null);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/filetree');
        setTree(response.data);
      } catch (err) {
        console.error('Error fetching directory tree:', err);
        setError('Failed to load directory tree');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return tree ? (
    <TreeNode 
      node={tree} 
      onFileClick={onFileClick} 
      selectedFile={selectedFile} 
    />
  ) : <div className='text-white'>Loading...</div>;
}

function getIcon(name: string) {
  const ext = name.split('.').pop();
  switch (ext) {
    case 'js':
      return <FaJs className="text-yellow-400" />;
    case 'json':
      return <BiSolidFileJson className="text-yellow-600" />;
    case 'html':
      return <FaHtml5 className="text-orange-500" />;
    case 'css':
      return <FaCss3Alt className="text-blue-500" />;
    default:
      return <AiOutlineFile className="text-gray-400" />;
  }
}

interface TreeNodeProps {
  node: any;
  onFileClick: (filePath: string) => void;
  selectedFile: string | null;
}

function TreeNode({ node, onFileClick, selectedFile }: TreeNodeProps) {
  if (node.type === 'folder') {
    return (
      <div className='text-white mt-1'>
        <div className="flex items-center">
          <FaFolder className="text-yellow-300 mr-2" />
          <span>{node.name}</span>
        </div>
        <div style={{ paddingLeft: 20 }}>
          {node.children.map((child: any, index: number) => (
            <TreeNode
              key={index}
              node={child}
              onFileClick={onFileClick}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      </div>
    );
  } else {
    const filePath = node.path; 
    return (
      <div
        className={`p-1 flex items-center cursor-pointer hover:bg-gray-700 mb-1 rounded-lg ${
          selectedFile === filePath ? 'bg-gray-700 text-slate-300' : ''
        }`}
        onClick={() => onFileClick(filePath)}
      >
        <span className="mr-2">{getIcon(node.name)}</span>
        <span>{node.name}</span>
      </div>
    );
  }
}

export default DirectoryTree;