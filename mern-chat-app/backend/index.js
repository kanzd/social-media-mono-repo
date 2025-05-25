const express = require("express");
const connectDB = require("./db.js");
const fs = require("fs");
const cors = require("cors");
const http = require("http");
const https = require("https");
const PORT = 443;
const { initSocket } = require("./socket/index.js");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", require("./Routes/auth_routes.js"));
app.use("/user", require("./Routes/userRoutes.js"));
app.use("/message", require("./Routes/message_routes.js"));
app.use("/conversation", require("./Routes/conversation_routes.js"));

// Server setup
//const server = http.createServer(app);

const privateKey = fs.readFileSync('./hik8-key.pem', 'utf8');
const certificate = fs.readFileSync('./hik8-cert.pem', 'utf8');

const server = https.createServer({
  key: privateKey,
  cert: certificate
},app);
// Socket.io setup
initSocket(server); // Initialize socket.io logic

// Start server and connect to database
server.listen(PORT,'0.0.0.0', () => {
  console.log(`🚀 Server started at https://localhost:${PORT}`);
  connectDB();
});
