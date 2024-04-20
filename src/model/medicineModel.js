import Joi from 'joi'
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from '../config/firestore.js'
import { AGE_RULE, _ID_RULE, _ID_RULE_MESSAGE, DATE_RULE } from '../utils/validators.js'

const MEDICINE_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(256).trim().strict(),
  arriveTime: Joi.string().regex(DATE_RULE).required(),
  departureTime: Joi.string().regex(DATE_RULE).required(),
  expireDate: Joi.string().regex(DATE_RULE).required(),
  arrivalDate: Joi.string().regex(DATE_RULE).required(),
  departureDate: Joi.string().regex(DATE_RULE).required(),
  amount: Joi.string().pattern(AGE_RULE).trim().strict().required()

})
// const INVALID_DATA_UPDATE = ['_id', 'createdAt']
const validObjectValue = async (data) => {
  return await MEDICINE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (Data) => {
  try {
    const validData = await validObjectValue(Data)
    const insertData = JSON.parse(JSON.stringify(validData))
    const docRef = await addDoc(collection(db, "medicines"), insertData);
    console.log("Document written with ID: ", docRef.id);
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const findOneById = async (id) => {
  try {
    // const medicineDocs = await getDocs(collection(db, 'medicines'));
    const medicine = doc(db, 'medicines', id);
    return medicine
  } catch (error) {
    throw new Error(error)
  }
}
const getAllMedicines = async () => {
  try {
    const medicinesList = [];
    // const queryDocs = query(scheduleDocs, orderBy("day", "asc"))

    const medicineDocs = await getDocs(collection(db, 'medicines'));
    medicineDocs.forEach(data => {
      const validData = {
        ...data.data(),
        id: data.id
      }
      medicinesList.push(validData)
    });

    return medicinesList
  } catch (error) {
    console.error(error)
  }
}
const update = async (updateData, id) => {
  try {
    const medicineDoc = doc(db, 'medicines', id);
    const docRef = await updateDoc(medicineDoc, updateData);
    return docRef
  } catch (e) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}
const deleteAnItem = async (id) => {
  try {
    const medicineCol = collection(db, 'medicines')
    const deleteMedicine = await deleteDoc(doc(medicineCol, id))
    // const docRef = await updateDoc(scheduleDoc, updateData);
    return deleteMedicine
  } catch (e) {
    console.error(e)
  }
}
const deleteManyItems = async (arrayItems) => {
  try {
    arrayItems.forEach(async (_id) => {
      await deleteDoc(doc(db, 'medicines', _id))
    })
    // const docRef = await updateDoc(scheduleDoc, updateData);
    // return docRef
  } catch (e) {
    console.error(e)
  }
}
export const medicineModel = {
  createNew,
  findOneById,
  MEDICINE_COLLECTION_SCHEMA,
  getAllMedicines,
  update,
  deleteAnItem,
  deleteManyItems
}