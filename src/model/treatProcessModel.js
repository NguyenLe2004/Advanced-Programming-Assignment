import Joi from 'joi'
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc, startAfter, query, orderBy, limit } from "firebase/firestore"
import { db } from '../config/firestore.js'
import { PHONE_NUMBER_RULE, AGE_RULE, _ID_RULE, _ID_RULE_MESSAGE, DATE_RULE, TIME_RULE } from '../utils/validators.js'

const TREAT_PROCESS_COLLECTION_SCHEMA = Joi.object({
  dateBegin: Joi.string().regex(DATE_RULE).required(),
  title: Joi.string().min(3).max(256).trim().strict(),
  dateEnd: Joi.string().regex(DATE_RULE).required(),
  timeBegin: Joi.string().regex(TIME_RULE).required().trim().strict(),
  timeEnd: Joi.string().regex(TIME_RULE).required().trim().strict(),
  room: Joi.string().min(3).max(256).trim().strict(),
  // medicalStaffID: Joi.string().required().pattern(_ID_RULE).message(_ID_RULE_MESSAGE),
  medicalStaffID: Joi.string().required(),
  description: Joi.string().min(3).max(2000).trim().strict()
})
// const INVALID_DATA_UPDATE = ['_id', 'createdAt']
const validObjectValue = async (data) => {
  return await TREAT_PROCESS_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (Data, patientId) => {
  try {
    const validData = await validObjectValue(Data)
    const insertData = JSON.parse(JSON.stringify(validData))
    const docRef = await addDoc(collection(db, "patients", patientId, "treatProcess"), insertData);
    return { ...insertData, id: docRef.id }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const findOneById = async (id, patientId) => {
  try {
    // const patientDocs = await getDocs(collection(db, 'patients'));
    const treatProcess = doc(db, "patients", patientId, 'treatProcess', id);
    return treatProcess
  } catch (error) {
    throw new Error(error)
  }
}
const getAllTreatProcess = async (patientId) => {
  try {
    const treatProcesssList = [];
    // const a = query(collection(db, 'patients'), limit(1000))
    // const b = await getDocs(a)
    // console.log(b.docs.length)
    // if (page > 1) {
    //   const queryDocs = query(collection(db, 'patients'), orderBy("fullname"), limit((page - 1) * PAGE_SIZE))
    //   const skipDataSnapshot = await getDocs(queryDocs)
    //   const skipData = skipDataSnapshot.docs[skipDataSnapshot.docs.length - 1]
    //   const data = query(collection(db, 'patients'), orderBy("fullname"), startAfter(skipData), limit(PAGE_SIZE))
    //   patientDocs = await getDocs(data);
    // }
    // else {
    //   const data = query(collection(db, 'patients'), orderBy("fullname"), startAfter(0), limit(1))
    //   patientDocs = await getDocs(data);
    // }
    const treatProcessDocs = await getDocs(collection(db, "patients", patientId, "treatProcess"))

    treatProcessDocs.forEach(data => {
      const validData = {
        ...data.data(),
        id: data.id
      }
      treatProcesssList.push(validData)
    });

    return treatProcesssList
  } catch (error) {
    console.error(error)
  }
}
const update = async (updateData, id, patientId) => {
  try {
    const patientDoc = doc(db, 'patients', patientId, "treatProcess", id);
    const docRef = await updateDoc(patientDoc, updateData);
    return docRef
  } catch (e) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}
const deleteAnItem = async (id, patientId) => {
  try {
    const patientCol = collection(db, 'patients', patientId, "treatProcess")
    const deletePatient = await deleteDoc(doc(patientCol, id))
    // const docRef = await updateDoc(scheduleDoc, updateData);
    return deletePatient
  } catch (e) {
    console.error(e)
  }
}
const deleteManyItems = async (arrayItems, patientId) => {
  try {
    arrayItems.forEach(async (_id) => {
      await deleteDoc(doc(db, 'patients', patientId, "treatProcess", _id))
    })
    // const docRef = await updateDoc(scheduleDoc, updateData);
    // return docRef
  } catch (e) {
    console.error(e)
  }
}
export const treatProcessModel = {
  createNew,
  TREAT_PROCESS_COLLECTION_SCHEMA,
  getAllTreatProcess,
  update,
  findOneById,
  deleteAnItem,
  deleteManyItems
}