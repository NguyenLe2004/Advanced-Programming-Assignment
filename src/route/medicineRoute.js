import express from 'express'
import { medicineController } from '../controller/medicineController.js'
import { medicineValidation } from '../validations/medicineValidation.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'


const medicineRouter = express.Router();


medicineRouter.route('/')
  .get(medicineController.getAllMedicines)
  .post(medicineValidation.createNew, medicineController.createNew)
medicineRouter.route('/deleteMany')
  .put(medicineValidation.deleteManyItems, medicineController.deleteManyItems)
medicineRouter.route('/:id')
  .put(medicineValidation.update, medicineController.update)
  .delete(medicineValidation.deleteAnItem, medicineController.deleteAnItem)



export default medicineRouter