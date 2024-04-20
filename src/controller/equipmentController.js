import { equipmentService } from '../service/equipmentService.js'


const createNew = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newEquipment = await equipmentService.createNew(req.body);
    // console.log("Document written with ID: ", newSpecialist);
    res.status(201).json({ Result: 'Đã tạo thành công' })
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}
const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const newEquipment = await equipmentService.update(req.body, id);
    // console.log("Document written with ID: ", newEquipment);
    res.status(201).json(newEquipment)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getAllEquipments = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const allEquipments = await equipmentService.getAllEquipments();
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json(allEquipments)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (req, res, next) => {
  try {
    const id = req.params.id
    const deleteEquipment = await equipmentService.deleteAnItem(id)
    res.status(201).json(deleteEquipment)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (req, res, next) => {
  try {
    const arrayItems = await equipmentService.deleteManyItems(req.body)
    res.status(201).json(arrayItems)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const equipmentController = {
  createNew,
  update,
  getAllEquipments,
  deleteAnItem,
  deleteManyItems
}