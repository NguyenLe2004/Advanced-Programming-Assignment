import Joi from 'joi'
import { addDoc, collection, doc, getDocs, updateDoc, arrayUnion, arrayRemove, orderBy, query, deleteDoc } from "firebase/firestore"
import { db } from '../config/firestore.js'
import { _ID_RULE, _ID_RULE_MESSAGE, DATE_RULE, TIME_RULE } from '../utils/validators.js'
import { customApiErrorModule } from '../error/customError.js'


const HISTORY_MAINTAIN_COLLECTION_SCHEMA = Joi.object({
  date: Joi.string().regex(DATE_RULE).required(),
  description: Joi.string().required().min(3).max(2000).trim().strict()
})
// const INVALID_DATA_UPDATE = ['_id', 'createdAt']
const validObjectValue = async (data) => {
  return await HISTORY_MAINTAIN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (Data, equipmentId) => {
  try {
    const validData = await validObjectValue(Data)
    const insertData = JSON.parse(JSON.stringify(validData))

    // const specialistSchedule = [];
    const docref = await addDoc(collection(db, 'equipments', equipmentId, 'history_maintain'), insertData)
    // const scheduleDocs = collection(db, 'specialists', specialistId, 'schedules')
    // const schedules = await getDocs(scheduleDocs);
    // schedules.forEach(data => { specialistSchedule.push(data.data()) });

    // const newDoc = doc(db, 'specialists', specialistId);
    // newDoc.schedule = []
    // await updateDoc(newDoc, { schedule: specialistSchedule })
    // await updateDoc(newDoc, { schedule: arrayUnion(insertData) })
    // await updateDoc(newDoc, { schedule: arrayRemove(insertData) })
    console.log("Document written with ID: ", docref.id);
  } catch (e) {
    console.error(e)
  }
}
const getAllSchedule = async (equipmentId) => {
  try {
    const euqipmentSchedule = [];
    const scheduleDocs = collection(db, 'equipments', equipmentId, 'history_maintain')
    const queryDocs = query(scheduleDocs, orderBy("Day", "asc"))

    const schedules = await getDocs(queryDocs);
    schedules.forEach(data => {
      const validData = {
        ...data.data(),
        id: data.id
      }
      euqipmentSchedule.push(validData)
    });
    return euqipmentSchedule
  } catch (error) {
    console.error(error)
  }
}
const findOneById = async (id, equipmentId) => {
  try {
    const scheduleDocs = collection(db, 'equipments', equipmentId, 'history_maintain')

    const schedule = doc(scheduleDocs, id);

    return schedule
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (updateData, id, equipmentId) => {
  try {
    const equipmentDocContain = collection(db, 'equipments', equipmentId, 'history_maintain')
    const scheduleDoc = doc(equipmentDocContain, id);
    const docRef = await updateDoc(scheduleDoc, updateData);
    return docRef
  } catch (e) {
    console.error(e)
  }
}
const deleteManyItems = async (arrayItems, equipmentId) => {
  try {
    const equipmentDocContain = collection(db, 'equipments', equipmentId, 'history_maintain')
    arrayItems.forEach(async (_id) => {
      await deleteDoc(doc(equipmentDocContain, _id))
    })
    // const docRef = await updateDoc(scheduleDoc, updateData);
    // return docRef
  } catch (e) {
    console.error(e)
  }
}
const deleteAnItem = async (id, equipmentId) => {
  try {
    const equipmentDocContain = collection(db, 'equipments', equipmentId, 'history_maintain')
    const schedule = await deleteDoc(doc(equipmentDocContain, id))

    // const docRef = await updateDoc(scheduleDoc, updateData);
    return schedule
  } catch (e) {
    console.error(e)
  }
}
export const historyMaintainModel = {
  HISTORY_MAINTAIN_COLLECTION_SCHEMA,
  createNew, getAllSchedule,
  update,
  deleteManyItems,
  findOneById,
  deleteAnItem
}