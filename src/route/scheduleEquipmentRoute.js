import express from 'express'

import { schedulesEquipmentValidation } from '../validations/schedulesEquipmentvalidation.js';
import { scheduleEquipmentController } from '../controller/scheduleEquipmentController.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'

const scheduleEquipmentRouter = express.Router({ mergeParams: true });


scheduleEquipmentRouter.route('/')
  .get(scheduleEquipmentController.getAllSchedule)
  .post(schedulesEquipmentValidation.createNew, authMiddlewareLogin, authMiddlewareRole, scheduleEquipmentController.createNew)

scheduleEquipmentRouter.route('/deleteMany')
  .put(schedulesEquipmentValidation.deleteManyItems, authMiddlewareLogin, authMiddlewareRole, scheduleEquipmentController.deleteManyItems)

scheduleEquipmentRouter.route('/:id')
  .put(schedulesEquipmentValidation.update, authMiddlewareLogin, authMiddlewareRole, scheduleEquipmentController.update)
  .delete(schedulesEquipmentValidation.deleteAnItem, authMiddlewareLogin, authMiddlewareRole, scheduleEquipmentController.deleteAnItem)

export default scheduleEquipmentRouter