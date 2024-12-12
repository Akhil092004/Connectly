import { UserInterface } from "./user";

export interface ChatListItemInterface {
    admin:string;
    createdAt:string;
    isGroupChat:true;
    lastMessage?:ChatMessageInterface;
    name:string;
    participants:UserInterface[];
    updatedAt:string;
    _id:string

}

export interface ChatMessageInterface{
    _id: string;
    sender: Pick<UserInterface, "_id" | "email" | "username">;
    content: string;
    chat: string;
    createdAt: string;
    updatedAt: string;
}