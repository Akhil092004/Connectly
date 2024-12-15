import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { Server } from "socket.io";
import {createServer} from "http"
import requestIp from "request-ip";

const app = express();

const httpServer = createServer(app)

const io = new Server(httpServer,{
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
})


app.set("io",io)
app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
  
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