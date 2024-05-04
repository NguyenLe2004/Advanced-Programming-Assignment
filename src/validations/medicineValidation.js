import Joi from 'joi'
import { customApiErrorModule } from '../error/customError.js'
import {
  _ID_RULE,
  _ID_RULE_MESSAGE,
  AGE_RULE,
  DATE_RULE,
  TIME_RULE
} from '../utils/validators.js'

const createNew = async (req, res, next) => {
  const dataCorrection = Joi.object({
    name: Joi.string().required().min(3).max(256).trim().strict(),
    arrivalTime: Joi.string().regex(TIME_RULE).required(),
    departureTime: Joi.string().regex(TIME_RULE).required(),
    expireDate: Joi.string().regex(DATE_RULE).required(),
    arrivalDate: Joi.string().regex(DATE_RULE).required(),
    departureDate: Joi.string().regex(DATE_RULE).required(),
    amount: Joi.string().pattern(AGE_RULE).trim().strict().required()
  })
  try {
    await dataCorrection.validateAsync(req.body,
      {
        abortEarly: false
      })
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
    name: Joi.string().min(3).max(256).trim().strict(),
    arrivalTime: Joi.string().regex(TIME_RULE),
    departureTime: Joi.string().regex(TIME_RULE),
    expireDate: Joi.string().regex(DATE_RULE),
    arrivalDate: Joi.string().regex(DATE_RULE),
    departureDate: Joi.string().regex(DATE_RULE),
    amount: Joi.string().pattern(AGE_RULE).trim().strict()
  })
  try {
    await dataCorrection.validateAsync(req.body,
      {
        abortEarly: false,
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
export const medicineValidation = {
  createNew,
  update,
  deleteManyItems,
  deleteAnItem
}