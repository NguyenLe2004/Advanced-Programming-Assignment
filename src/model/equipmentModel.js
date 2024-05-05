import Joi from 'joi'
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from '../config/firestore.js'
import { PHONE_NUMBER_RULE, DATE_RULE } from '../utils/validators.js'
import { customApiErrorModule } from '../error/customError.js'
import { scheduleEquipmentModel } from '../model/scheduleEquipmentModel.js'



const EQUIPMENT_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(256).trim().strict(),
  regularMaintenance: Joi.object({
    dateBegin: Joi.string().regex(DATE_RULE),
    dateEnd: Joi.string().regex(DATE_RULE),
    description: Joi.string().min(3).max(2000).trim().strict()
    
  }).default({}),
  usageHistory: Joi.array().default([]),
  Status: Joi.string().valid('Đã phân công', 'Chưa phân công')

})
// const INVALID_DATA_UPDATE = ['_id', 'createdAt']
const validObjectValue = async (data) => {
  return await EQUIPMENT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (Data) => {
  try {
    const validData = await validObjectValue(Data)
    let insertData = JSON.parse(JSON.stringify(validData))
    const docRef = await addDoc(collection(db, "equipments"), insertData);
    console.log("Document written with ID: ", docRef.id);
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (updateData, id) => {
  try {
    const equipmentDoc = doc(db, 'equipments', id);
    const docRef = await updateDoc(equipmentDoc, updateData);
    return docRef
  } catch (e) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}
const getAllEquipments = async () => {
  try {
    const equipmentsList = [];
    // const queryDocs = query(scheduleDocs, orderBy("day", "asc"))

    const equipmentsDocs = await getDocs(collection(db, 'equipments'));
    equipmentsDocs.forEach(data => {
      const validData = {
        ...data.data(),
        id: data.id
      }
      equipmentsList.push(validData)
    });

    return equipmentsList
  } catch (error) {
    console.error(error)
  }
}
const findOneById = async (id) => {
  try {
    // const specialistDocs = await getDocs(collection(db, 'specialists'));
    const equipment = doc(db, 'equipments', id);
    return equipment
  } catch (error) {
    throw new Error(error)
  }
}
const deleteAnItem = async (id) => {
  try {
    const allSchedulesEquipment = await scheduleEquipmentModel.getAllSchedule(id)

    const arrayItems = allSchedulesEquipment.map(schedule => schedule.id)
    await scheduleEquipmentModel.deleteManyItems(arrayItems, id)

    await deleteDoc(doc(db, 'equipments', id))
  } catch (e) {
    console.error(e)
  }
}
const deleteManyItems = async (arrayItems) => {
  try {
    arrayItems.forEach(async (_id) => {

      const allSchedulesEquipment = await scheduleEquipmentModel.getAllSchedule(_id)

      const arrayItems = allSchedulesEquipment.map(schedule => schedule.id)
      await scheduleEquipmentModel.deleteManyItems(arrayItems, _id)

      await deleteDoc(doc(db, 'equipments', _id))
    })
    // const docRef = await updateDoc(scheduleDoc, updateData);
    // return docRef
  } catch (e) {
    console.error(e)
  }
}
export const equipmentModel = {
  createNew,
  update,
  getAllEquipments,
  findOneById,
  deleteAnItem,
  EQUIPMENT_COLLECTION_SCHEMA,
  deleteManyItems
}