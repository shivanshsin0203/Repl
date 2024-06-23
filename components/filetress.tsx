"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFolder, FaJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { BiSolidFileJson } from "react-icons/bi";
import { AiOutlineFile } from 'react-icons/ai';

function DirectoryTree() {
    const [tree, setTree] = useState(null);
    const [error, setError] = useState<String|null>(null);
    const [selectedFile, setSelectedFile] = useState<String|null>(null);
    const [fileContent, setFileContent] = useState<String|null>(null);

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

    const handleFileClick = async (filePath: string) => {
        setSelectedFile(filePath);
        try {
            console.log(filePath);
            const response = await axios.get(`http://localhost:3002/filecontent?path=${filePath}`);
            console.log(response.data);
            
        } catch (err) {
            console.error('Error fetching file content:', err);
            setFileContent('Failed to load file content');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return tree ? (
        <div>
            <TreeNode node={tree} onFileClick={handleFileClick} selectedFile={selectedFile} />
            <div className='mt-4 p-2 bg-gray-700 text-white rounded'>
                {fileContent ? <pre>{fileContent}</pre> : 'Select a file to view its content'}
            </div>
        </div>
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

function TreeNode({ node, onFileClick, selectedFile }: any) {
    if (node.type === 'folder') {
        return (
            <div className='text-white mt-1'>
                <span>📁 {node.name}</span>
                <div style={{ paddingLeft: 20 }}>
                    {node.children.map((child: any, index: any) => (
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
        const filePath = node.path; // Assuming the node object has a `path` property
        return (
            <div 
                className={` p-1 text-white flex items-center cursor-pointer hover:animate-bounce mb-1 ${selectedFile === filePath ? 'bg-gray-700 rounded-lg ' : ''}`}
                onClick={() => onFileClick(filePath)}
            >
                <span className="mr-2">{getIcon(node.name)}</span>
                <span>{node.name}</span>
            </div>
        );
    }
}

export default DirectoryTree;
