import io from "socket.io-client";

export const createSocket = (port3002: any) => {
  return io(`http://localhost:${port3002}`);
};
