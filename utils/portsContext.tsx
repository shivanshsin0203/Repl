import React, { createContext, useContext, ReactNode } from "react";

interface PortsContextProps {
  port3002: number;
  port8000: number;
  }

const PortsContext = createContext<PortsContextProps | undefined>(undefined);

export const PortsProvider: React.FC<{ children: ReactNode; port3002: any; port8000: any }> = ({
  children,
  port3002,
  port8000,
}) => {
  return (
    <PortsContext.Provider value={{ port3002, port8000 }}>
      {children}
    </PortsContext.Provider>
  );
};

export const usePorts = () => {
  const context = useContext(PortsContext);
  if (context === undefined) {
    throw new Error("usePorts must be used within a PortsProvider");
  }
  return context;
};
5