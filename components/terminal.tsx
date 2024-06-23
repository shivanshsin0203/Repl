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
      rows: 80,
      cols: 60,
      cursorBlink: true,
      fontWeightBold: "bold",
      theme: {
        background: "#1E1E1E", 
        foreground: "#CFCFCF", 
        cursor: "#61AFEF", 
        black: "#1C1C1C", 
        red: "#E06C75", 
        green: "#98C379", 
        yellow: "#E5C07B", 
        blue: "#61AFEF", 
        magenta: "#C678DD", 
        cyan: "#56B6C2", 
        white: "#ABB2BF", 
        brightBlack: "#5C6370", 
        brightRed: "#E06C75", 
        brightGreen: "#98C379", 
        brightYellow: "#E5C07B", 
        brightBlue: "#61AFEF", 
        brightMagenta: "#C678DD", 
        brightCyan: "#56B6C2", 
        brightWhite: "#FFFFFF", 
      },
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

  return <div ref={terminalRef} id="terminal"  style={{ width: "100%", height: "100%" }} />;
};

export default Terminal;
