// socket.ts
import { io, Socket } from "socket.io-client";

// Create a single socket instance
export const socket: Socket = io("https://leopardybackend.uc.r.appspot.com", {
  transports: ["websocket", "polling"], // Use WebSocket and fallback to polling
});
