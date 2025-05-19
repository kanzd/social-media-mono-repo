const { Server } = require("socket.io");
const registerHandlers = require("./handlers");
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: "*",
      allowedHeaders: ["my-custom-header"],
    credentials: true,
      methods: ["GET", "POST"],
    },
  });
  console.log("Socket.io initialized");
  (async ()=>{
    const pubClient = createClient({ url: 'redis://redis:6379' });
const subClient = pubClient.duplicate();

await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));
  })
  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);
    registerHandlers(io, socket);
  });

  return io;
};

module.exports = { initSocket };
