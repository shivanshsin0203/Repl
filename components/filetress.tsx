"use client";
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFolder, FaJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiJsonwebtokens } from 'react-icons/si';
import { AiOutlineFile } from 'react-icons/ai';
import { BiSolidFileJson } from "react-icons/bi";
function DirectoryTree() {
    const [tree, setTree] = useState(null);
    const [error, setError] = useState<String|null>(null);

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

    return tree ? <TreeNode node={tree} /> : <div className=' text-white'>Loading...</div>;
}

function getIcon(name:string) {
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

function TreeNode({ node }:any) {
    if (node.type === 'folder') {
        return (
            <div className=' text-white mt-1 '>
                <span className=''>📁 {node.name}</span>
                <div style={{ paddingLeft: 20 }}>
                    {node.children.map((child:any, index:any) => (
                        <TreeNode key={index} node={child} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className='text-white flex items-center'>
                <span className="mr-2">{getIcon(node.name)}</span>
                <span>{node.name}</span>
            </div>
        );
    }
}

export default DirectoryTree;
