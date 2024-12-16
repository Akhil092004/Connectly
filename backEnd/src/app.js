import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { Server } from "socket.io";
import {createServer} from "http"
import requestIp from "request-ip";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const allowedOrigins = ['http://localhost:5173', 'https://connectly-frontend.onrender.com']; // Add as many as needed

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// app.use(express.static(path.join(__dirname, '../../frontEnd/dist')));

// // Catch-all route to serve the React app for any unmatched routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontEnd/dist', 'index.html'));
// });

app.get('*', (req, res) => {
  // Redirect all frontend routes to the frontend's base URL
  res.redirect('https://connectly-frontend.onrender.com');
});

// CORS middleware with dynamic origin checking
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'), false); // Block the request
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


const httpServer = createServer(app)

const io = new Server(httpServer,{
    pingTimeout: 60000,
    cors: {
        origin: (origin, callback) => {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
              callback(null, true); // Allow the request
            } else {
              callback(new Error('Not allowed by CORS'), false); // Block the request
            }
          },
        credentials: true,
    },
})


app.set("io",io)
// app.use(cors({
//     origin: "http://localhost:5173", // Your frontend URL
//     credentials: true // Allow credentials (cookies, authorization headers, etc.)
// }));
  
app.options('*', cors()); // Handle preflight requests

app.use(requestIp.mw())

//some middle ware config
app.use(express.json({limit : "16kb"}))

app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())


import userRouter from "../src/routes/user.routes.js"
app.use("/api/v1/users",userRouter)


import chatRouter from "../src/routes/chat.routes.js"
import messageRouter from "../src/routes/message.routes.js"

app.use("/api/v1/chat-app/chats", chatRouter);
app.use("/api/v1/chat-app/messages", messageRouter);


export {httpServer}