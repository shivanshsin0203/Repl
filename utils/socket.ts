import io from "socket.io-client";

export const createSocket = (port3002: number) => {
  return io(`http://localhost:${port3002}`);
};
