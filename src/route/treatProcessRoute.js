import express from 'express'
import { schedulesValidation } from '../validations/schedulesValidation.js'
import { treatProcessController } from '../controller/treatProcessController.js'
import { treatProcessValidation } from '../validations/treatProcessValidation.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'
const treatProcessRouter = express.Router({ mergeParams: true });


treatProcessRouter.route('/')
  .get(treatProcessController.getAllTreatProcess)
  .post(treatProcessValidation.createNew, authMiddlewareLogin, authMiddlewareRole, treatProcessController.createNew)
treatProcessRouter.route('/deleteMany')
  .put(treatProcessValidation.deleteManyItems, authMiddlewareLogin, authMiddlewareRole, treatProcessController.deleteManyItems)
treatProcessRouter.route('/:id')
  .put(treatProcessValidation.update, authMiddlewareLogin, authMiddlewareRole, treatProcessController.update)
  .delete(treatProcessValidation.deleteAnItem, authMiddlewareLogin, authMiddlewareRole, treatProcessController.deleteAnItem)


export default treatProcessRouter