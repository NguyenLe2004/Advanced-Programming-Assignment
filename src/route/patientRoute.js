import express from 'express'
import { schedulesValidation } from '../validations/schedulesValidation.js'
import { patientController } from '../controller/patientController.js'
import { patientValidation } from '../validations/patientValidation.js'
import {  userMiddleWare } from '../middleware/authMiddleware.js'
import treatProcessRouter from './treatProcessRoute.js'

const patientRouter = express.Router();


patientRouter.route('/')
  .get(patientController.getAllPatients)
  .post(patientValidation.createNew, patientController.createNew)
patientRouter.route('/deleteMany')
  .put(patientValidation.deleteManyItems, patientController.deleteManyItems)
patientRouter.route('/:id')
  .get(patientController.findOneById)
  //.put(patientValidation.update, patientController.update)
  .delete(patientValidation.deleteAnItem, patientController.deleteAnItem)
patientRouter.route('/updateInfo/:id')
  .patch(patientValidation.updatePatientInfo, patientController.update)
patientRouter.route('/updateInfoMedical/:id')
  .patch(patientValidation.updatePatientInfoMedical, patientController.update)
patientRouter.use('/:patientId/treatProcess', treatProcessRouter) 

export default patientRouter