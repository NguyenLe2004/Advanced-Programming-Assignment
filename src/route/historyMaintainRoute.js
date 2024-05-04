import express from 'express'

import { historyMaintainValidation } from '../validations/historyMaintainValidation.js';
import { historyMaintainController } from '../controller/historyMaintainController.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'

const historyMaintainRouter = express.Router({ mergeParams: true });


historyMaintainRouter.route('/')
  .get(historyMaintainController.getAllSchedule)
  .post(historyMaintainValidation.createNew, historyMaintainController.createNew)

historyMaintainRouter.route('/deleteMany')
  .put(historyMaintainValidation.deleteManyItems, historyMaintainController.deleteManyItems)

historyMaintainRouter.route('/:id')
  .put(historyMaintainValidation.update, historyMaintainController.update)
  .delete(historyMaintainValidation.deleteAnItem, historyMaintainController.deleteAnItem)

export default historyMaintainRouter