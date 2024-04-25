import Joi from 'joi'
import { customApiErrorModule } from '../error/customError.js'
import {
  _ID_RULE,
  _ID_RULE_MESSAGE,
  PHONE_NUMBER_RULE,
  AGE_RULE,
  DATE_RULE,
  TIME_RULE
} from '../utils/validators.js'

const createNew = async (req, res, next) => {
  const dataCorrection = Joi.object({
    dateBegin: Joi.string().regex(DATE_RULE).required(),
    dateEnd: Joi.string().regex(DATE_RULE).required(),
    timeBegin: Joi.string().regex(TIME_RULE).required().trim().strict(),
    timeEnd: Joi.string().regex(TIME_RULE).required().trim().strict(),
    room: Joi.string().min(3).max(256).trim().strict(),
    title: Joi.string().min(3).max(256).trim().strict(),
    // medicalStaffID: Joi.string().required().pattern(_ID_RULE).message(_ID_RULE_MESSAGE),
    medicalStaffID: Joi.string().required(),
    description: Joi.string().min(3).max(2000).trim().strict(),

  })
  try {
    await dataCorrection.validateAsync(req.body, { abortEarly: false })
    next()
    // res.status(201).json("Tao thanh cong")
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}

const update = async (req, res, next) => {
  const dataCorrection = Joi.object({
    dateBegin: Joi.string().regex(DATE_RULE),
    dateEnd: Joi.string().regex(DATE_RULE),
    timeBegin: Joi.string().regex(TIME_RULE).required().trim().strict(),
    timeEnd: Joi.string().regex(TIME_RULE).required().trim().strict(),
    room: Joi.string().min(3).max(256).trim().strict(),
    title: Joi.string().min(3).max(256).trim().strict(),
    medicalStaffID: Joi.string().pattern(_ID_RULE).message(_ID_RULE_MESSAGE),
    description: Joi.string().min(3).max(256).trim().strict(),
  })
  try {
    await dataCorrection.validateAsync(req.body,
      {
        abortEarly: false,
        allowUnknown: true
      })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}
const deleteAnItem = async (req, res, next) => {
  const dataCorrection = Joi.object({
    id: Joi.string().pattern(_ID_RULE).message(_ID_RULE_MESSAGE)
  })
  try {
    await dataCorrection.validateAsync(req.params, {
      allowUnknown: true
    })
    next()
    // res.status(201).json("Tao thanh cong")
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}
const deleteManyItems = async (req, res, next) => {
  const dataCorrection = Joi.array().items(
    Joi.string().pattern(_ID_RULE).message(_ID_RULE_MESSAGE)
  )
  try {
    await dataCorrection.validateAsync(req.body)
    next()
    // res.status(201).json("Tao thanh cong")
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}
export const treatProcessValidation = {
  createNew, update, deleteAnItem, deleteManyItems
}