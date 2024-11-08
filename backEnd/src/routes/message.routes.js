import { Router } from "express";
import { deleteMessage,getAllMessages,sendMessage } from "../controllers/message.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { sendMessageValidator } from "../validators/message.validator";
import { mongoIdPathVariableValidator } from "../validators/mondoDB.validator";
import { validate } from "../validators/validate";



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