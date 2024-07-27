import io from "socket.io-client";

export const createSocket = (port3002: any) => {
  return io(`http://35.154.131.67:${port3002}`);
};
