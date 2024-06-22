import Terminal from "@/components/terminal";

const Project = () => {
  return (
    <div className="w-screen h-screen bg-zinc-800 flex flex-row overflow-hidden">
      <div className="w-[25%] bg-red-600"></div>
      <div className="w-[33%] bg-blue-600"></div>
      <div className="w-[42%] h-screen bg-slate-600 flex flex-col">
        <div className="h-1/2 w-full bg-pink-600"></div>
        <div className="h-1/2 w-full flex-1 overflow-x-hidden overflow-y-auto">
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default Project;
