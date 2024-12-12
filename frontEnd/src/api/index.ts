import axios from "axios";
import { LocalStorage } from "../utils";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URI,
    withCredentials: true,
    timeout: 120000,
  });


apiClient.interceptors.request.use(
    function(config){
        const token = LocalStorage.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },

    function(error){
        return Promise.reject(error);
    }
);

const loginUser = (data: { username: string; password: string }) => {
    return apiClient.post("/users/login", data);
};

const registerUser = (data:{
    email:string;
    password:string;
    username:String;
})=> {
    return apiClient.post("/users/registers",data);
}


const logoutUser = () => {
    return apiClient.get("/users/logout")
}

const getAvailableUsers = () => {
    return apiClient.get("/chat-app/chats/users");
}

const getUserChat = ()=>{
    return apiClient.get("/chat-app/chats");
}

const createUserChat = (receiverId:string) => {
    return apiClient.post(`/chat-app/chats/c/${receiverId}`)
}

const createGroupChat = (data:{name:string;participants:string[]}) =>{
    return apiClient.post(`/chat-app/chats/group`,data);
}

const getGroupInfo = (chatId:string) =>{
    return apiClient.get(`/chat-app/chats/chats/group/${chatId}`);
}

const updateGroupName = (chatId: string, name: string) => {
    return apiClient.patch(`/chat-app/chats/group/${chatId}`, { name });
};
  
const deleteGroup = (chatId: string) => {
    return apiClient.delete(`/chat-app/chats/group/${chatId}`);
};
  
const deleteOneOnOneChat = (chatId: string) => {
    return apiClient.delete(`/chat-app/chats/remove/${chatId}`);
};
  
const addParticipantToGroup = (chatId: string, participantId: string) => {
    return apiClient.post(`/chat-app/chats/group/${chatId}/${participantId}`);
};

const removeParticipantFromGroup = (chatId: string, participantId: string) => {
    return apiClient.delete(`/chat-app/chats/group/${chatId}/${participantId}`);
};

const getChatMessages = (chatId: string) => {
    return apiClient.get(`/chat-app/messages/${chatId}`);
};

const sendMessage = (chatId: string, content: string) => {
    const formData = new FormData();
    if (content) {
        formData.append("content", content);
    }
    return apiClient.post(`/chat-app/messages/${chatId}`, formData);
};

const deleteMessage = (chatId: string, messageId: string) => {
    return apiClient.delete(`/chat-app/messages/${chatId}/${messageId}`);
};

const getUserChats = () => {
    return apiClient.get(`/chat-app/chats`);
  };
export {
    addParticipantToGroup,
    createGroupChat,
    createUserChat,
    deleteGroup,
    deleteOneOnOneChat,
    getAvailableUsers,
    getChatMessages,
    getGroupInfo,
    getUserChats,
    loginUser,
    logoutUser,
    registerUser,
    removeParticipantFromGroup,
    sendMessage,
    updateGroupName,
    deleteMessage,
  };
  