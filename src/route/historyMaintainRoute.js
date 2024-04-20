import express from 'express'

import { historyMaintainValidation } from '../validations/historyMaintainValidation.js';
import { historyMaintainController } from '../controller/historyMaintainController.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'

const historyMaintainRouter = express.Router({ mergeParams: true });


historyMaintainRouter.route('/')
  .get(historyMaintainController.getAllSchedule)
  .post(historyMaintainValidation.createNew, authMiddlewareLogin, authMiddlewareRole, historyMaintainController.createNew)

historyMaintainRouter.route('/deleteMany')
  .put(historyMaintainValidation.deleteManyItems, authMiddlewareLogin, authMiddlewareRole, historyMaintainController.deleteManyItems)

historyMaintainRouter.route('/:id')
  .put(historyMaintainValidation.update, authMiddlewareLogin, authMiddlewareRole, historyMaintainController.update)
  .delete(historyMaintainValidation.deleteAnItem, authMiddlewareLogin, authMiddlewareRole, historyMaintainController.deleteAnItem)

export default historyMaintainRouter