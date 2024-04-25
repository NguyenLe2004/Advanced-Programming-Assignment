import Joi from 'joi'
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc, startAfter, query, orderBy, limit, getDoc } from "firebase/firestore"
import { db } from '../config/firestore.js'
import { PHONE_NUMBER_RULE, AGE_RULE, _ID_RULE, _ID_RULE_MESSAGE, DATE_RULE, CCCD_RULE } from '../utils/validators.js'
import { treatProcessModel } from './treatProcessModel.js'

const PATIENT_COLLECTION_SCHEMA = Joi.object({
  lastMiddleName: Joi.string().required().min(3).max(256).trim().strict(),
  firstName: Joi.string().required().max(256).trim().strict(),
  email: Joi.string().email().required().min(3),
  phoneNum: Joi.string().regex(PHONE_NUMBER_RULE).required(),
  dateOfBirth: Joi.string().regex(DATE_RULE).required(),
  // age: Joi.string().pattern(/^[0-9]+$/, 'numbers').trim().strict().required(),
  // age: Joi.string().required().pattern(AGE_RULE).trim().strict(),
  gender: Joi.string().valid('Nam', 'Nữ').required(),
  job: Joi.string().required().min(3).max(256).trim().strict(),
  citizenID: Joi.string().required().pattern(CCCD_RULE),
  height: Joi.string().required().max(256).trim().strict(),
  weight: Joi.string().required().max(256).trim().strict(),
  bloodType: Joi.string().required().max(256).trim().strict(),
  address: Joi.string().required().min(3).max(256).trim().strict(),
  hometown: Joi.string().required().min(3).max(256).trim().strict(),
  diagnosis: Joi.string().required().min(3).max(256).trim().strict(),


  // Doctor_ID: Joi.string().required().pattern(_ID_RULE).message(_ID_RULE_MESSAGE),

  symptoms: Joi.string().min(3).max(256).required(),
  medHistory: Joi.string().min(3).max(256).optional()
  // treatProcess: Joi.array().default([]),
  // test: Joi.array().default([]),

})
// const INVALID_DATA_UPDATE = ['_id', 'createdAt']
const validObjectValue = async (data) => {
  return await PATIENT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (Data) => {
  try {
    const validData = await validObjectValue(Data)
    const insertData = JSON.parse(JSON.stringify(validData))
    const docRef = await addDoc(collection(db, "patients"), insertData);
    console.log("Document written with ID: ", docRef.id);
    return { ...insertData, id: docRef.id }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const findOneById = async (id) => {
  try {
    // const patientDocs = await getDocs(collection(db, 'patients'));
    const patientDoc = doc(db, "patients", id);
    const patient = await getDoc(patientDoc);

    return patient.data()
  } catch (error) {
    throw new Error(error)
  }
}
const getAllPatients = async () => {
  try {
    const patientsList = [];
    // const PAGE_SIZE = 1
    // // const a = query(collection(db, 'patients'), limit(1000))
    // // const b = await getDocs(a)
    // // console.log(b.docs.length)
    // let patientDocs
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
    const patientDocs = await getDocs(collection(db, "patients"))
    patientDocs.forEach(data => {
      const validData = {
        ...data.data(),
        id: data.id
      }
      patientsList.push(validData)
    });

    return patientsList
  } catch (error) {
    console.error(error)
  }
}
const update = async (updateData, id) => {
  try {
    const patientDoc = doc(db, 'patients', id);
    const docRef = await updateDoc(patientDoc, updateData);
    return docRef
  } catch (e) {
    console.error(error)
  }
}
const deleteAnItem = async (id) => {
  try {
    const allTreatProcess = await treatProcessModel.getAllTreatProcess(id)

    const arrayItems = allTreatProcess.map(schedule => schedule.id)
    await treatProcessModel.deleteManyItems(arrayItems, id)

    const patientCol = collection(db, 'patients')
    const deletePatient = await deleteDoc(doc(patientCol, id))
    // const docRef = await updateDoc(scheduleDoc, updateData);
    return deletePatient
  } catch (e) {
    console.error(e)
  }
}
const deleteManyItems = async (arrayItems) => {
  try {
    arrayItems.forEach(async (_id) => {
      const allTreatProcess = await treatProcessModel.getAllTreatProcess(_id)

      const arrayItems = allTreatProcess.map(schedule => schedule.id)
      await treatProcessModel.deleteManyItems(arrayItems, _id)
      await deleteDoc(doc(db, 'patients', _id))
    })
    // const docRef = await updateDoc(scheduleDoc, updateData);
    // return docRef
  } catch (e) {
    console.error(e)
  }
}
export const patientModel = {
  createNew,
  PATIENT_COLLECTION_SCHEMA,
  getAllPatients,
  update,
  findOneById,
  deleteAnItem,
  deleteManyItems
}