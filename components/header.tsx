import { FaFolder, FaJs, FaHtml5, FaCss3Alt, FaReact } from 'react-icons/fa';
import { BiSolidFileJson } from "react-icons/bi";
import { AiOutlineFile } from 'react-icons/ai';
import { TbFileTypeSvg } from 'react-icons/tb';
export const GetHeader = ({ selectedFile }:any) => {
    if (!selectedFile) return <div className=' font-bold text-white'>Select a file to view content</div>;
    const splitedFiletype = selectedFile.split(".");
    const splitedFilename= selectedFile.split("\\");
    console.log(splitedFilename);
    const extension = splitedFiletype[splitedFiletype.length - 1];
    const name=splitedFilename[splitedFilename.length - 1];
    switch (extension) {
        case 'js':
      return <div className=' flex flex-row space-x-1  items-center text-white mb-1 '><FaJs className="text-yellow-400" /><p>{name}</p></div>;
    case 'json':
      return <div className=' flex flex-row space-x-1 items-center text-white mb-1'><BiSolidFileJson className="text-yellow-600" /><p>{name}</p></div>;
    case 'html':
      return <div className=' flex flex-row space-x-1 items-center text-white mb-1'><FaHtml5 className="text-orange-500" /><p>{name}</p></div>;
    case 'css':
      return <div className=' flex flex-row space-x-1 items-center text-white mb-1'><FaCss3Alt className="text-blue-500" /><p>{name}</p></div>;
    case 'jsx':
      return <div className=' flex flex-row space-x-1 items-center text-white mb-1'><FaReact className="text-blue-700" /><p>{name}</p></div>;
      case 'svg':
      return <div className=' flex flex-row space-x-1 items-center text-white mb-1'><TbFileTypeSvg className="text-pink-600" /><p>{name}</p></div>;
    default:
      return <div className=' flex flex-row space-x-1 items-center text-white mb-1'><AiOutlineFile className="text-gray-400" /><p>{name}</p></div>;
    }
}