import { Server as SocketIOServer, Socket } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

// Declare io globally so it doesn't get re-initialized
let io: SocketIOServer | undefined;

export default function handler(req: any, res: any) {
  if (res?.socket?.server.io) {
    console.log('Socket.io is already running');
  } else {
    console.log('Starting Socket.io server...');
    io = new SocketIOServer(res?.socket?.server as any, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on('connection', (socket: Socket) => {
      console.log('A user connected', socket.id);

      socket.on('message', (data: { sender: string; message: string }) => {
        console.log(`Message from ${data.sender}: ${data.message}`);
        io?.emit('message', data);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
      });
    });

    // Attach the io instance to the server object so it can be reused
    res.socket.server.io = io;
  }
  
  res.end();
}
