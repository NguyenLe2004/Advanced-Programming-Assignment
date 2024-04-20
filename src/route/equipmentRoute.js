import express from 'express'
import { equipmentController } from '../controller/equipmentController.js'
import { equipmentValidation } from '../validations/equipmentValidation.js'
import scheduleEquipmentRouter from './scheduleEquipmentRoute.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'
import historyMaintainRouter from './historyMaintainRoute.js'
const equipmentRouter = express.Router();


equipmentRouter.route('/')
  .get(equipmentController.getAllEquipments)
  .post(equipmentValidation.createNew, authMiddlewareLogin, authMiddlewareRole, equipmentController.createNew)
equipmentRouter.route('/deleteMany')
  .put(equipmentValidation.deleteManyItems, authMiddlewareLogin, authMiddlewareRole, equipmentController.deleteManyItems)
equipmentRouter.route('/:id')
  .put(equipmentValidation.update, authMiddlewareLogin, authMiddlewareRole, equipmentController.update)
  .delete(equipmentValidation.deleteAnItem, authMiddlewareLogin, authMiddlewareRole, equipmentController.deleteAnItem)

equipmentRouter.use('/:equipmentId/schedules', scheduleEquipmentRouter)
equipmentRouter.use('/:equipmentId/maintains', historyMaintainRouter)


export default equipmentRouter