import { arrayUnion } from 'firebase/firestore';
import { scheduleEquipmentModel } from '../model/scheduleEquipmentModel.js'
import { equipmentModel } from '../model/equipmentModel.js'

const createNew = async (reqBody, equipmentId) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    // add new schedule
    const newschedule = await scheduleEquipmentModel.createNew(reqBody, equipmentId);
    //update specialist schedule array
    await equipmentModel.update({ usageHistory: arrayUnion(reqBody) }, equipmentId)

    return newschedule
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getAllSchedule = async (equipmentId) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    // add new schedule
    const allSchedule = await scheduleEquipmentModel.getAllSchedule(equipmentId);
    //update specialist schedule array
    return allSchedule
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (reqBody, id, equipmentId) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newSpecialistSchedule = await scheduleEquipmentModel.update(reqBody, id, equipmentId);
    return newSpecialistSchedule
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteManyItems = async (reqBody, equipmentId) => {
  try {
    const arrayItems = await scheduleEquipmentModel.deleteManyItems(reqBody, equipmentId)
    return arrayItems
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteAnItem = async (id, equipmentId) => {
  try {
    const targetItem = await scheduleEquipmentModel.findOneById(id, equipmentId)
    if (!targetItem) {
      console.error("NOT FOUND")
      return
    }
    const arrayItems = await scheduleEquipmentModel.deleteAnItem(id, equipmentId)
    return arrayItems
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const scheduleEquipmentService = {
  createNew,
  getAllSchedule,
  update,
  deleteManyItems,
  deleteAnItem

}