import { io } from "socket.io-client";

// Establish connection with backend
const socket = io("http://localhost:5000");

export default socket;
