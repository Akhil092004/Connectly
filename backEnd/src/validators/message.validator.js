import { body } from "express-validator";

const sendMessageValidator = () => {
  return [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .custom((value) => {
        console.log("Validated content:", value); // Log the content value
        return true;
      }),
  ];
};
export { sendMessageValidator };
