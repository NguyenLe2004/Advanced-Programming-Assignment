import Joi from 'joi'
import { customApiErrorModule } from '../error/customError.js'
import { PHONE_NUMBER_RULE, DATE_RULE, _ID_RULE, _ID_RULE_MESSAGE, CCCD_RULE } from '../utils/validators.js'

const createNew = async (req, res, next) => {
  const dataCorrection = Joi.object({
    lastMiddleName: Joi.string().required().min(3).max(256).trim().strict(),
    firstName: Joi.string().required().min(3).max(256).trim().strict(),
    email: Joi.string().email().required().min(3).max(2000),
    phoneNum: Joi.string().required().regex(PHONE_NUMBER_RULE),
    dateOfBirth: Joi.string().regex(DATE_RULE).required(),
    gender: Joi.string().valid('Nam', 'Nữ').required(),
    citizenID: Joi.string().required().pattern(CCCD_RULE),
    address: Joi.string().required().min(3).max(256).trim().strict(),
    hometown: Joi.string().required().min(3).max(256).trim().strict(),
    specialty: Joi.string().required().min(3).max(256).trim().strict(),
    // age: Joi.string().pattern(AGE_RULE).trim().strict().required(),
    position: Joi.string().required().min(3).max(256),
    cert: Joi.array().default([]),
    education: Joi.array().default([])
  })
  try {
    await dataCorrection.validateAsync(req.body, { abortEarly: false })
    next()
    // res.status(200).json('oke')
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
  }
}

const update = async (req, res, next) => {
  const dataCorrection = Joi.object({
    lastMiddleName: Joi.string().min(2).max(256).trim().strict(),
    firstName: Joi.string().min(3).max(256).trim().strict(),
    email: Joi.string().email().min(3).max(2000),
    phoneNum: Joi.string().regex(PHONE_NUMBER_RULE),
    dateOfBirth: Joi.string().regex(DATE_RULE),
    citizenID: Joi.string().required().pattern(CCCD_RULE),
    gender: Joi.string().valid('Nam', 'Nữ'),
    address: Joi.string().required().min(3).max(256).trim().strict(),
    hometown: Joi.string().required().min(3).max(256).trim().strict(),
    specialty: Joi.string().required().min(3).max(256).trim().strict(),
    position: Joi.string().min(3).max(256),
    cert: Joi.array().default([]),
    education: Joi.array().default([])
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
export const specialistValidation = {
  createNew,
  update,
  deleteAnItem,
  deleteManyItems
}