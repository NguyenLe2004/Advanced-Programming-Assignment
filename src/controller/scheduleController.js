import { scheduleService } from '../service/scheduleService.js'


const createNew = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const specialistId = req.params.specialistId
    const newschedule = await scheduleService.createNew(req.body, specialistId);
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json({ Result: 'Đã tạo lịch thành công thành công' })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getAllSchedule = async (req, res, next) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const specialistId = req.params.specialistId
    const allSchedule = await scheduleService.getAllSchedule(specialistId);
    // console.log("Document written with ID: ", newschedule);
    res.status(201).json(allSchedule)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const specialistId = req.params.specialistId
    const newSpecialistSchedule = await scheduleService.update(req.body, id, specialistId);
    // console.log("Document written with ID: ", newSpecialist);
    res.status(201).json(newSpecialistSchedule)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteManyItems = async (req, res, next) => {
  try {
    const specialistId = req.params.specialistId
    const arrayItems = await scheduleService.deleteManyItems(req.body, specialistId)
    res.status(201).json(arrayItems)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteAnItem = async (req, res, next) => {
  try {
    const specialistId = req.params.specialistId
    const id = req.params.id
    const schedule = await scheduleService.deleteAnItem(id, specialistId)
    res.status(201).json(schedule)
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const scheduleController = {
  createNew,
  getAllSchedule,
  update,
  deleteManyItems,
  deleteAnItem
}