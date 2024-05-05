import { userModel } from "../model/userModel.js"
import { env } from "../config/environment.js"

// kiểm tra user đã đăng nhập chưa
const authMiddlewareLogin = async (req, res, next) => {
  try {
    const cookie = req.cookies['token']
    // console.log(cookie);
    if (!cookie) {
      res.status(201).json({ message: "token is not released" })
    }
    else {
      req.cookie = cookie ;
      // res.status(200).json({ message: "something else" })
      next();
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
//kiểm tra user có quyên truy cập không 
const authMiddlewareRole = async (req, res, next) => {
  const userLogged = await userModel.getUser(req.cookie)
  if (!userLogged) {
    res.status(422).json({ message: "You must login !" })
  }
  else if (userLogged.role !== env.ROLE_ADMIN) {
    res.status(422).json({ message: "You are not permisson !" })
  }
  else {
    req.user = userLogged
    next()
  }
}
export const userMiddleWare = {authMiddlewareRole, authMiddlewareLogin};