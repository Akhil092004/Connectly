import { Router } from "express";
import { deleteMessage,getAllMessages,sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { sendMessageValidator } from "../validators/message.validator.js";
import { mongoIdPathVariableValidator } from "../validators/mondoDB.validator.js";
import { validate } from "../validators/validate.js";



const router = Router();

router.use(verifyJWT)

router.route("/:chatId")
    .get(mongoIdPathVariableValidator("chatId"),validate,getAllMessages)
    .post(mongoIdPathVariableValidator("chatId"),
    sendMessageValidator(),validate,sendMessage);


router
    .route("/:chatId/:messageId")
    .delete(
        mongoIdPathVariableValidator("chatId"),
        mongoIdPathVariableValidator("messageId"),
        validate,
        deleteMessage
    );

export default router;