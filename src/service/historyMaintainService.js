import { arrayUnion } from 'firebase/firestore';
import { historyMaintainModel } from '../model/historyMaintainModel.js'
import { equipmentModel } from '../model/equipmentModel.js'

const createNew = async (reqBody, equipmentId) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    // add new schedule
    const newschedule = await historyMaintainModel.createNew(reqBody, equipmentId);
    //update specialist schedule array
    // await equipmentModel.update({ usageHistory: arrayUnion(reqBody) }, equipmentId)

    return newschedule
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getAllSchedule = async (equipmentId) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    // add new schedule
    const allSchedule = await historyMaintainModel.getAllSchedule(equipmentId);
    //update specialist schedule array
    return allSchedule
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (reqBody, id, equipmentId) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newSpecialistSchedule = await historyMaintainModel.update(reqBody, id, equipmentId);
    return newSpecialistSchedule
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteManyItems = async (reqBody, equipmentId) => {
  try {
    const arrayItems = await historyMaintainModel.deleteManyItems(reqBody, equipmentId)
    return arrayItems
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteAnItem = async (id, equipmentId) => {
  try {
    const targetItem = await historyMaintainModel.findOneById(id, equipmentId)
    if (!targetItem) {
      console.error("NOT FOUND")
      return
    }
    const arrayItems = await historyMaintainModel.deleteAnItem(id, equipmentId)
    return arrayItems
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const historyMaintainService = {
  createNew,
  getAllSchedule,
  update,
  deleteManyItems,
  deleteAnItem

}