import express from 'express'

import { schedulesValidation } from '../validations/schedulesValidation.js'
import { scheduleController } from '../controller/scheduleController.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'

const scheduleRouter = express.Router({ mergeParams: true });


scheduleRouter.route('/')
  .get(scheduleController.getAllSchedule)
  .post(schedulesValidation.createNew, authMiddlewareLogin, authMiddlewareRole, scheduleController.createNew)

scheduleRouter.route('/deleteMany')
  .put(schedulesValidation.deleteManyItems, authMiddlewareLogin, authMiddlewareRole, scheduleController.deleteManyItems)

scheduleRouter.route('/:id')
  .put(schedulesValidation.update, authMiddlewareLogin, authMiddlewareRole, scheduleController.update)
  .delete(schedulesValidation.deleteAnItem, authMiddlewareLogin, authMiddlewareRole, scheduleController.deleteAnItem)

export default scheduleRouter