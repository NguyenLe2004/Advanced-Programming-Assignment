
import { patientService } from '../service/patientService.js'
const createNew = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newPatient = await patientService.createNew(req.body);
    res.status(201).json(newPatient)
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

const getAllPatients = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    // const page = req.query.page
    const allPatients = await patientService.getAllPatients();
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json(allPatients)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const findOneById = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    // const page = req.query.page
    const idPatient = req.params.id
    const patient = await patientService.findOneById(idPatient);
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json(patient)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const newPatient = await patientService.update(req.body, id);
    // console.log("Document written with ID: ", newSpecialist);
    res.status(201).json(newPatient)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (req, res, next) => {
  try {
    const id = req.params.id
    const deletePatient = await patientService.deleteAnItem(id)
    res.status(201).json(deletePatient)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (req, res, next) => {
  try {
    const arrayItems = await patientService.deleteManyItems(req.body)
    res.status(201).json(arrayItems)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const patientController = {
  createNew,
  getAllPatients,
  update,
  findOneById,
  deleteAnItem,
  deleteManyItems
}