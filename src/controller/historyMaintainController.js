import { historyMaintainService } from '../service/historyMaintainService.js'


const createNew = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const equipmentId = req.params.equipmentId
    const newsSchedule = await historyMaintainService.createNew(req.body, equipmentId);
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json({ Result: 'Đã tạo lịch bảo dưỡng thành công thành công' })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getAllSchedule = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const equipmentId = req.params.equipmentId
    const allSchedule = await historyMaintainService.getAllSchedule(equipmentId);
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json(allSchedule)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const equipmentId = req.params.equipmentId
    const newEquipmentSchedule = await historyMaintainService.update(req.body, id, equipmentId);
    // console.log("Document written with ID: ", newEquipment);
    res.status(201).json(newEquipmentSchedule)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteManyItems = async (req, res, next) => {
  try {
    const equipmentId = req.params.equipmentId
    const arrayItems = await historyMaintainService.deleteManyItems(req.body, equipmentId)
    res.status(201).json(arrayItems)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteAnItem = async (req, res, next) => {
  try {
    const equipmentId = req.params.equipmentId
    const id = req.params.id
    const schedule = await historyMaintainService.deleteAnItem(id, equipmentId)
    res.status(201).json(schedule)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const historyMaintainController = {
  createNew,
  getAllSchedule,
  update,
  deleteManyItems,
  deleteAnItem
}