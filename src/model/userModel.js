import Joi from 'joi'
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from '../config/firestore.js'
import { PHONE_NUMBER_RULE, DATE_RULE } from '../utils/validators.js'
import { customApiErrorModule } from '../error/customError.js'
import { env } from '../config/environment.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const USER_SIGNUP_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(256).trim().strict(),
  email: Joi.string().email().required().min(3).max(50),
  password: Joi.string().min(7).required().trim().strict(),
  role: Joi.string().required()
})
const USER_SIGNIN_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().email().required().min(3).max(50),
  password: Joi.string().min(7).required().trim().strict()

})
// const INVALID_DATA_UPDATE = ['_id', 'createdAt']
const validObjectValueSignUp = async (data) => {
  return await USER_SIGNUP_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const validObjectValueSignIn = async (data) => {
  return await USER_SIGNIN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const getAllUsers = async () => {
  try {
    const usersList = [];
    // const queryDocs = query(scheduleDocs, orderBy("day", "asc"))

    const usersDocs = await getDocs(collection(db, 'users'));
    usersDocs.forEach(data => {
      const validData = {
        ...data.data(),
        id: data.id
      }
      usersList.push(validData)
    });

    return usersList
  } catch (error) {
    console.error(error)
  }
}
const signUp = async (Data) => {
  try {
    const validData = await validObjectValueSignUp(Data)
    let insertData = JSON.parse(JSON.stringify(validData))
    const userList = await getAllUsers()
    if (userList.some(user => user.email === insertData.email)) {
      return { message: 'email đã tồn tại' }
    }
    const salt = await bcrypt.genSalt(parseInt(env.SALT))
    const hasPassword = await bcrypt.hash(insertData.password, salt)
    const newInsertData = {
      ...insertData,
      password: hasPassword
    }
    const docRef = await addDoc(collection(db, "users"), newInsertData);
    console.log("Document written with ID: ", docRef.id);
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
// const update = async (updateData, id) => {
//   try {
//     const specialistDoc = doc(db, 'specialists', id);
//     const docRef = await updateDoc(specialistDoc, updateData);
//     return docRef
//   } catch (e) {
//     const errorMessage = new Error(error).message
//     const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
//     next(customError)
//   }
// }

const findOneById = async (id) => {
  try {
    // const specialistDocs = await getDocs(collection(db, 'specialists'));
    const user = doc(db, 'users', id);
    return user
  } catch (error) {
    throw new Error(error)
  }
}
const signIn = async (Data) => {
  try {
    const validData = await validObjectValueSignIn(Data)
    let insertData = JSON.parse(JSON.stringify(validData))
    const userList = await getAllUsers()
    const targetUser = userList.filter(user => user.email === insertData.email)
    if (!targetUser[0]) {
      return { message: "Email không tồn tại !" }
    }
    const compareResule = await bcrypt.compare(insertData.password, targetUser[0].password)
    if (!compareResule) {
      return { message: "Mật khẩu không hợp lệ !" }
    }
    const token = jwt.sign({ id: targetUser[0].id }, env.JWT_PRIVATE_KEY, { expiresIn: "1h" })
    return { ...targetUser[0], token: token }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getUser = async (cookie) => {
  try {
    const cookieVarified = jwt.verify(cookie, env.JWT_PRIVATE_KEY)
    if (!cookieVarified) {
      return { message: "token is undefined" }
    }
    const userList = await getAllUsers()
    const targetUser = userList.filter(user => user.id === cookieVarified.id)
    if (!targetUser[0]) {
      return { message: "NOT FOUND" }
    }

    const { password, ...dataUser } = targetUser[0]
    return dataUser
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export const userModel = {
  signUp,
  getAllUsers,
  findOneById,
  signIn,
  getUser
}