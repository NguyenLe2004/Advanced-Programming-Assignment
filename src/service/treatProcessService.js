import { treatProcessModel } from '../model/treatProcessModel.js'

const createNew = async (reqBody, patientId) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newTreatProcess = await treatProcessModel.createNew(reqBody, patientId);
    console.log("Document written with ID: ", newTreatProcess);
    return newTreatProcess
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getAllTreatProcess = async (patientId) => {
  try {
    const allTreatProcess = await treatProcessModel.getAllTreatProcess(patientId);
    return allTreatProcess
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (reqBody, id, patientId) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newTreatProcess = await treatProcessModel.update(reqBody, id, patientId);
    return newTreatProcess
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (id, patientId) => {
  try {
    const targetTreatProcess = await treatProcessModel.findOneById(id, patientId)
    if (!targetTreatProcess) {
      console.error("NOT FOUND")
      return
    }
    const deleteTreatProcess = await treatProcessModel.deleteAnItem(id, patientId)
    return deleteTreatProcess
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (reqBody, patientId) => {
  try {
    const arrayItems = await treatProcessModel.deleteManyItems(reqBody, patientId)
    return arrayItems
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const treatProcessService = {
  createNew,
  getAllTreatProcess,
  update, deleteAnItem,
  deleteManyItems
}