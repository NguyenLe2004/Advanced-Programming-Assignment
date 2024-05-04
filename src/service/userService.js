import { userModel } from '../model/userModel.js'

const signUp = async (reqBody) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newUser = await userModel.signUp(reqBody);
    return newUser
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const signIn = async (reqBody) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const loginUser = await userModel.signIn(reqBody);
    const { password, ...dataUser } = loginUser
    return dataUser
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// const update = async (reqBody, id) => {
//   try {
//     // const docRef = await addDoc(collection(db, "users"), req.body);
//     const newMedicine = await medicineModel.update(reqBody, id);
//     return newMedicine
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
const getUser = async (cookie) => {
  try {
    const targetUser = await userModel.getUser(cookie)
    return targetUser
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const userService = {
  signUp,
  signIn,
  getUser
}