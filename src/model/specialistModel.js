import Joi from 'joi'
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc, getDoc, where, query } from "firebase/firestore"
import { db } from '../config/firestore.js'
import { PHONE_NUMBER_RULE, DATE_RULE, CCCD_RULE } from '../utils/validators.js'
import { customApiErrorModule } from '../error/customError.js'
import { scheduleModel } from '../model/scheduleModel.js'

const SPECIALIST_COLLECTION_SCHEMA = Joi.object({
  lastMiddleName: Joi.string().required().min(3).max(256).trim().strict(),
  firstName: Joi.string().required().min(3).max(256).trim().strict(),
  email: Joi.string().email().required().min(3).max(50),
  phoneNum: Joi.string().regex(PHONE_NUMBER_RULE).required(),
  dateOfBirth: Joi.string().regex(DATE_RULE).required(),
  gender: Joi.string().valid('Nam', 'Nữ').required(),
  citizenID: Joi.string().required().pattern(CCCD_RULE),
  address: Joi.string().required().min(3).max(256).trim().strict(),
  hometown: Joi.string().required().min(3).max(256).trim().strict(),
  specialty: Joi.string().required().min(3).max(256).trim().strict(),
  // age: Joi.string().pattern(AGE_RULE).trim().strict().required(),
  position: Joi.string().required().min(3).max(50),
  cert: Joi.array().items(
    Joi.object({
      title: Joi.string().required().min(3).trim().strict(),
      date: Joi.string().regex(DATE_RULE).required(),
      organization: Joi.string().required().min(3).trim().strict()
    })
  ).default([]),
  education: Joi.array().items(
    Joi.object({
      dateBegin: Joi.string().required().min(3).trim().strict(),
      dateEnd: Joi.string().required().min(3).trim().strict(),
      university: Joi.string().required().min(3).trim().strict(),
      major: Joi.string().required().min(3).trim().strict(),
      degree: Joi.string().required().min(3).trim().strict()
    })
  ).default([]),
  schedule: Joi.array().default([])

})
// const INVALID_DATA_UPDATE = ['_id', 'createdAt']
const validObjectValue = async (data) => {
  return await SPECIALIST_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (Data) => {
  try {
    const validData = await validObjectValue(Data)
    let insertData = JSON.parse(JSON.stringify(validData))
    const docRef = await addDoc(collection(db, "specialists"), insertData);
    console.log("Document written with ID: ", docRef.id);
    return { ...insertData, id: docRef.id }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (updateData, id) => {
  try {
    const specialistDoc = doc(db, 'specialists', id);
    const docRef = await updateDoc(specialistDoc, updateData);
    return docRef
  } catch (e) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}
const getAllSpecialists = async (position, specialty) => {
  try {
    const specialistsList = [];
    // const queryDocs = query(scheduleDocs, orderBy("day", "asc"))s
    let specialistsDocs;
    if (position && specialty) {
      const specialistPositionCollection = query(collection(db, 'specialists'), where("position", "==", position), where("specialty", "==", specialty))
      specialistsDocs = await getDocs(specialistPositionCollection)
    }
    else if (position) {
      const specialistPositionCollection = query(collection(db, 'specialists'), where("position", "==", position))
      specialistsDocs = await getDocs(specialistPositionCollection)
    }
    else if (specialty) {
      const specialistPositionCollection = query(collection(db, 'specialists'), where("specialty", "==", specialty))
      specialistsDocs = await getDocs(specialistPositionCollection)
    }
    else {
      specialistsDocs = await getDocs(collection(db, 'specialists'))
    }

    //const specialistsDocs = await getDocs(specialistPositionCollection)
    specialistsDocs.forEach(data => {
      const validData = {
        ...data.data(),
        id: data.id
      }
      specialistsList.push(validData)
    });

    return specialistsList
  } catch (error) {
    console.error(error)
  }
}
const findOneById = async (id) => {
  try {
    // const specialistDocs = await getDocs(collection(db, 'specialists'));
    const specialistDoc = doc(db, 'specialists', id)
    const specialist = await getDoc(specialistDoc)
    return specialist.data()
  } catch (error) {
    throw new Error(error)
  }
}
const deleteAnItem = async (id) => {
  try {
    const allSchedules = await scheduleModel.getAllSchedule(id)

    const arrayItems = allSchedules.map(schedule => schedule.id)
    await scheduleModel.deleteManyItems(arrayItems, id)

    await deleteDoc(doc(db, 'specialists', id))
  } catch (e) {
    console.error(e)
  }
}
const deleteManyItems = async (arrayItems) => {
  try {
    arrayItems.forEach(async (_id) => {

      const allSchedules = await scheduleModel.getAllSchedule(_id)

      const arrayItems = allSchedules.map(schedule => schedule.id)
      await scheduleModel.deleteManyItems(arrayItems, _id)

      await deleteDoc(doc(db, 'specialists', _id))
    })
    // const docRef = await updateDoc(scheduleDoc, updateData);
    // return docRef
  } catch (e) {
    console.error(e)
  }
}
export const specialistModel = {
  createNew,
  update,
  getAllSpecialists,
  findOneById,
  deleteAnItem,
  SPECIALIST_COLLECTION_SCHEMA,
  deleteManyItems
}