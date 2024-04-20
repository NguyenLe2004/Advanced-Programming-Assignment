import express from 'express'
import { medicineController } from '../controller/medicineController.js'
import { medicineValidation } from '../validations/medicineValidation.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'


const medicineRouter = express.Router();


medicineRouter.route('/')
  .get(medicineController.getAllMedicines)
  .post(medicineValidation.createNew, authMiddlewareLogin, authMiddlewareRole, medicineController.createNew)
medicineRouter.route('/deleteMany')
  .put(medicineValidation.deleteManyItems, authMiddlewareLogin, authMiddlewareRole, medicineController.deleteManyItems)
medicineRouter.route('/:id')
  .put(medicineValidation.update, authMiddlewareLogin, authMiddlewareRole, medicineController.update)
  .delete(medicineValidation.deleteAnItem, authMiddlewareLogin, authMiddlewareRole, medicineController.deleteAnItem)



export default medicineRouter