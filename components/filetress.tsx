"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFolder, FaJs, FaHtml5, FaCss3Alt, FaReact } from 'react-icons/fa';
import { BiSolidFileJson } from "react-icons/bi";
import { AiOutlineFile } from 'react-icons/ai';
import { usePorts } from '@/utils/portsContext';
import { TbFileTypeSvg } from 'react-icons/tb';

interface DirectoryTreeProps {
  socket: any;
  selectedFile: string | null;
  onFileClick: (filePath: string) => void;
}

interface TreeNodeProps {
  node: TreeNode;
  onFileClick: (filePath: string) => void;
  selectedFile: string | null;
}

interface TreeNode {
  path: string;
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

function DirectoryTree({ socket, selectedFile, onFileClick }: DirectoryTreeProps) {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { port3002 } = usePorts();

  const fetchDataTree = async () => {
    try {
      const response = await axios.get(`http://localhost:${port3002}/filetree`);
      setTree(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching directory tree:', err);
      setError('Failed to load directory tree Please Create a new repl');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataTree();
  }, [port3002]);

  useEffect(() => {
    if (socket) {
      socket.on('file:refresh', fetchDataTree);
    }
    return () => {
      if (socket) {
        socket.off('file:refresh', fetchDataTree);
      }
    };
  }, [socket]);

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return tree ? (
    <TreeNode node={tree} onFileClick={onFileClick} selectedFile={selectedFile} />
  ) : null;
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
    case 'jsx':
      return <FaReact className="text-blue-700" />;
    case 'svg':
      return <TbFileTypeSvg className="text-pink-600" />;
    default:
      return <AiOutlineFile className="text-gray-400" />;
  }
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
          {node.children?.map((child, index) => (
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
