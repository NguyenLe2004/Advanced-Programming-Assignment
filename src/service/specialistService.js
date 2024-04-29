import { specialistModel } from '../model/specialistModel.js'
const createNew = async (reqBody) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newSpecialist = await specialistModel.createNew(reqBody);
    return newSpecialist
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (reqBody, id) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newSpecialist = await specialistModel.update(reqBody, id);
    return newSpecialist
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getAllSpecialists = async (position, specialty) => {
  try {
    const allSpecialists = await specialistModel.getAllSpecialists(position, specialty);
    return allSpecialists
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (id) => {
  try {
    const targetSpecialist = await specialistModel.findOneById(id)
    if (!targetSpecialist) {
      console.error("NOT FOUND")
      return
    }
    const deleteSpecialist = await specialistModel.deleteAnItem(id)
    return deleteSpecialist
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (reqBody) => {
  try {
    // get all schedules 
    const arrayItems = await specialistModel.deleteManyItems(reqBody)
    return arrayItems
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const findOneById = async (id) => {
  try {
    const specialist = await specialistModel.findOneById(id);
    return specialist
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export const specialistService = {
  createNew,
  update,
  getAllSpecialists,
  deleteAnItem,
  deleteManyItems,
  findOneById
}