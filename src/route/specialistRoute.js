import express from 'express'
import { specialistController } from '../controller/specialistController.js'
import { specialistValidation } from '../validations/specialistValidation.js'
import scheduleRouter from './scheduleRoute.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'

const specialistRouter = express.Router();


specialistRouter.route('/')
  .get(specialistController.getAllSpecialists)
  .post(specialistValidation.createNew, authMiddlewareLogin, authMiddlewareRole, specialistController.createNew)
specialistRouter.route('/deleteMany')
  .put(specialistValidation.deleteManyItems, authMiddlewareLogin, authMiddlewareRole, specialistController.deleteManyItems)
specialistRouter.route('/:id')
  .get(specialistController.findOneById)
  .put(specialistValidation.update, authMiddlewareLogin, authMiddlewareRole, specialistController.update)
  .delete(specialistValidation.deleteAnItem, authMiddlewareLogin, authMiddlewareRole, specialistController.deleteAnItem)

specialistRouter.use('/:specialistId/schedules', scheduleRouter)


export default specialistRouter