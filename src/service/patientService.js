import { patientModel } from '../model/patientModel.js'

const createNew = async (reqBody) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newPatient = await patientModel.createNew(reqBody);
    console.log("Document written with ID: ", newPatient);
    return newPatient
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getAllPatients = async () => {
  try {
    const allPatients = await patientModel.getAllPatients();
    return allPatients
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const findOneById = async (id) => {
  try {
    const Patients = await patientModel.findOneById(id);
    return Patients
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (reqBody, id) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newPatient = await patientModel.update(reqBody, id);
    return newPatient
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (id) => {
  try {
    const targetPatient = await patientModel.findOneById(id)
    if (!targetPatient) {
      console.error("NOT FOUND")
      return
    }
    const deletePatient = await patientModel.deleteAnItem(id)
    return deletePatient
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (reqBody) => {
  try {
    const arrayItems = await patientModel.deleteManyItems(reqBody)
    return arrayItems
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const patientService = {
  createNew,
  getAllPatients,
  update, deleteAnItem,
  deleteManyItems,
  findOneById
}