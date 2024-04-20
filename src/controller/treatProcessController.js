
import { treatProcessService } from '../service/treatProcessService.js'
const createNew = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const patientId = req.params.patientId
    const newTreatProcess = await treatProcessService.createNew(req.body, patientId);
    res.status(201).json(newTreatProcess)
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

const getAllTreatProcess = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const patientId = req.params.patientId
    const allPatients = await treatProcessService.getAllTreatProcess(patientId);
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json(allPatients)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (req, res, next) => {
  try {
    const patientId = req.params.patientId
    const id = req.params.id
    const newTreatProcess = await treatProcessService.update(req.body, id, patientId);
    // console.log("Document written with ID: ", newSpecialist);
    res.status(201).json(newTreatProcess)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (req, res, next) => {
  try {
    const patientId = req.params.patientId
    const id = req.params.id
    const deleteTreatProcess = await treatProcessService.deleteAnItem(id, patientId)
    res.status(201).json(deleteTreatProcess)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (req, res, next) => {
  try {
    const patientId = req.params.patientId
    const arrayItems = await treatProcessService.deleteManyItems(req.body, patientId)
    res.status(201).json(arrayItems)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const treatProcessController = {
  createNew,
  getAllTreatProcess,
  update,
  deleteAnItem,
  deleteManyItems
}