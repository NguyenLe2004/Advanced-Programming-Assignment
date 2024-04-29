import { specialistService } from '../service/specialistService.js'


const createNew = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newSpecialist = await specialistService.createNew(req.body);
    // console.log("Document written with ID: ", newSpecialist);
    res.status(201).json(newSpecialist)
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}
const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const newSpecialist = await specialistService.update(req.body, id);
    // console.log("Document written with ID: ", newSpecialist);
    res.status(201).json(newSpecialist)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getAllSpecialists = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const position = req.query.position
    const specialty = req.query.specialty
    const allSpecialists = await specialistService.getAllSpecialists(position, specialty);
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json(allSpecialists)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const findOneById = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    // const page = req.query.page
    const idSpecialist = req.params.id
    const specialist = await specialistService.findOneById(idSpecialist);
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json(specialist)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (req, res, next) => {
  try {
    const id = req.params.id
    const deleteSpecialist = await specialistService.deleteAnItem(id)
    res.status(201).json(deleteSpecialist)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (req, res, next) => {
  try {
    const arrayItems = await specialistService.deleteManyItems(req.body)
    res.status(201).json(arrayItems)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const specialistController = {
  createNew,
  update,
  getAllSpecialists,
  deleteAnItem,
  deleteManyItems,
  findOneById
}