import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
    addNewParticipantInGroupChat,
    createAGroupChat,
    createOrGetAOneOnOneChat,
    deleteGroupChat,
    deleteOneOnOneChat,
    getAllChats,
    getGroupChatDetails,
    leaveGroupChat,
    removeParticipantFromGroupChat,
    renameGroupChat,
    searchAvailableUsers,
} from "../controllers/chat.controller.js"
import { mongoIdPathVariableValidator } from "../validators/mondoDB.validator.js";


const router = Router()

router.use(verifyJWT)

router.route("/").get(getAllChats)

router.route("/user").get(searchAvailableUsers)


router.route("/c/:recieverId").post(
    mongoIdPathVariableValidator("recieverId"),
    validate,
    
)

