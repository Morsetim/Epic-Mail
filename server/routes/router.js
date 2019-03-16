import express from 'express';
import userController from '../controllers/userController';
import userValidation from '../middlewares/userValidator';
import authToken from '../middlewares/tokenAuthentication';
import createMessage from '../controllers/messageController';
// import sentMessage from '../controllers/sentController';

const router = express.Router();

router.route('/auth/signUp')
.post(userValidation.signUp, userController.addUser);

router.route('/auth/signIn')
.post(userValidation.loginUser, authToken,  userController.loginUser);

router.route('/messages')
.post(createMessage.createMsg);

router.route('/messages/sent')
.post(createMessage.sentMessage);

router.route('/messages/sent')
.get(createMessage.sentMessage);


export default router;