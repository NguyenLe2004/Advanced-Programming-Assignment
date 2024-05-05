import Joi from 'joi'
import { addDoc, collection, doc, getDocs, updateDoc, arrayUnion, arrayRemove, orderBy, query, deleteDoc } from "firebase/firestore"
import { db } from '../config/firestore.js'
import { _ID_RULE, _ID_RULE_MESSAGE, DATE_RULE, TIME_RULE } from '../utils/validators.js'
import { customApiErrorModule } from '../error/customError.js'


const SCHEDULE_COLLECTION_SCHEMA = Joi.object({
  description: Joi.string().required().min(3).max(2000).trim().strict(),
  title: Joi.string().required().min(3).max(256).trim().strict(),
  room: Joi.string().required().min(3).max(256).trim().strict(),
  dateBegin: Joi.string().regex(DATE_RULE).required(),
  dateEnd: Joi.string().regex(DATE_RULE).required(),
  timeBegin: Joi.string().regex(TIME_RULE).required().trim().strict(),
  timeEnd: Joi.string().regex(TIME_RULE).required().trim().strict()
})
// const INVALID_DATA_UPDATE = ['_id', 'createdAt']
const validObjectValue = async (data) => {
  return await SCHEDULE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (Data, specialistId) => {
  try {
    const validData = await validObjectValue(Data)
    const insertData = JSON.parse(JSON.stringify(validData))
    console.log(specialistId)

    // const specialistSchedule = [];
    const docref = await addDoc(collection(db, 'specialists', specialistId, 'schedules').orderBy("dateBegin", "desc"), insertData)
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
    const errorMessage = new Error(e).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    //next(customError)
    console.log(customError)
  }
}
const getAllSchedule = async (specialistId) => {
  try {
    const specialistSchedule = [];
    const scheduleDocs = collection(db, 'specialists', specialistId, 'schedules')
    const queryDocs = query(scheduleDocs, orderBy("dateBegin", "desc"))

    const schedules = await getDocs(queryDocs);
    schedules.forEach(data => {
      const validData = {
        ...data.data(),
        id: data.id
      }
      specialistSchedule.push(validData)
    });

    return specialistSchedule
  } catch (error) {
    console.error(error)
  }
}
const findOneById = async (id, specialistId) => {
  try {
    const scheduleDocs = collection(db, 'specialists', specialistId, 'schedules')

    const schedule = doc(scheduleDocs, id);

    return schedule
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (updateData, id, specialistId) => {
  try {
    const specialistDocContain = collection(db, 'specialists', specialistId, 'schedules')
    const scheduleDoc = doc(specialistDocContain, id);
    const docRef = await updateDoc(scheduleDoc, updateData);
    return docRef
  } catch (e) {
    console.error(e)
  }
}
const deleteManyItems = async (arrayItems, specialistId) => {
  try {
    const specialistDocContain = collection(db, 'specialists', specialistId, 'schedules')
    arrayItems.forEach(async (_id) => {
      await deleteDoc(doc(specialistDocContain, _id))
    })
    // const docRef = await updateDoc(scheduleDoc, updateData);
    // return docRef
  } catch (e) {
    console.error(e)
  }
}
const deleteAnItem = async (id, specialistId) => {
  try {
    const specialistDocContain = collection(db, 'specialists', specialistId, 'schedules')
    console.log("delete here",specialistId, id)
    const schedule = await deleteDoc(doc(specialistDocContain, id))

    // const docRef = await updateDoc(scheduleDoc, updateData);
    return schedule
  } catch (e) {
    console.error(e)
  }
}
export const scheduleModel = {
  SCHEDULE_COLLECTION_SCHEMA,
  createNew, getAllSchedule,
  update,
  deleteManyItems,
  findOneById,
  deleteAnItem
}