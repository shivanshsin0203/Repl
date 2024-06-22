"use client";
import { Terminal as XTerminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import socket from "@/utils/socket";

import "@xterm/xterm/css/xterm.css";

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    const term = new XTerminal({
      rows: 20,
    });

    if (terminalRef.current) {
      term.open(terminalRef.current);
    }

    term.onData((data) => {
      socket.emit("terminal:write", data);
    });

    function onTerminalData(data: any) {
      term.write(data);
    }

    socket.on("terminal:data", (data)=>{
      term.write(data)});

    return () => {
      socket.off("terminal:data", onTerminalData);
    };
  }, []);

  return <div ref={terminalRef} id="terminal" />;
};

export default Terminal;
