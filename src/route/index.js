import express from 'express'
import patientRouter from './patientRoute.js'
import specialistRouter from './specialistRoute.js';
import medicineRouter from './medicineRoute.js';
import userRouter from './userRoute.js';
import equipmentRouter from './equipmentRoute.js';

const Router = express.Router();

Router.route('/')
  .get(async (req, res) => {
    res.status(200).end('<h1>Hello World!</h1><hr>')
  })
Router.use('/users', userRouter)
Router.use('/patients', patientRouter)
Router.use('/specialists', specialistRouter)
// Router.use('/schedules', scheduleRouter)
Router.use('/medicines', medicineRouter)
Router.use('/equipments', equipmentRouter)

export default Router