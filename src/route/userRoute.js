import express from 'express'
import { userValidation } from '../validations/userValidation.js'
import { userController } from '../controller/userController.js'
const userRouter = express.Router();


userRouter.route('/login').post(userValidation.signIn, userController.signIn)
userRouter.route('/register').post(userValidation.signUp, userController.signUp)
userRouter.route('/').get(userController.getUser)
userRouter.route('/logout').post(userController.logOut)


export default userRouter