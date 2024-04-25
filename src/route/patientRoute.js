import express from 'express'
import { schedulesValidation } from '../validations/schedulesValidation.js'
import { patientController } from '../controller/patientController.js'
import { patientValidation } from '../validations/patientValidation.js'
import { authMiddlewareRole, authMiddlewareLogin } from '../middleware/authMiddleware.js'
import treatProcessRouter from './treatProcessRoute.js'

const patientRouter = express.Router();


patientRouter.route('/')
  .get(patientController.getAllPatients)
  .post(patientValidation.createNew, authMiddlewareLogin, authMiddlewareRole, patientController.createNew)
patientRouter.route('/deleteMany')
  .put(patientValidation.deleteManyItems, authMiddlewareLogin, authMiddlewareRole, patientController.deleteManyItems)
patientRouter.route('/:id')
  .get(patientController.findOneById)
  .put(patientValidation.update, authMiddlewareLogin, authMiddlewareRole, patientController.update)
  .delete(patientValidation.deleteAnItem, authMiddlewareLogin, authMiddlewareRole, patientController.deleteAnItem)
patientRouter.use('/:patientId/treatProcess', treatProcessRouter)
// patientRouter.route('/:id')
//   .post(schedulesValidation.createNew, async (req, res) => {
//     // try {
//     //   const { id } = req.params;
//     //   const specialistSchedule = [];
//     //   const docref = await addDoc(collection(db, 'users', id, 'schedules'), req.body)

//     //   const cityDocs = collection(db, 'users', id, 'schedules')

//     //   const schedules = await getDocs(cityDocs);

//     //   schedules.forEach(data => { specialistSchedule.push(data.data()) });

//     //   const newDoc = doc(db, 'users', id);

//     //   await updateDoc(newDoc, { Schedule: specialistSchedule })
//     //   console.log("Document written with ID: ", docref.id);
//     //   res.status(201).json("oke luoon")
//     // } catch (error) {
//     //   throw new Error(error)
//     // }
//   })

export default patientRouter