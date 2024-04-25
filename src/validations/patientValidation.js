import Joi from 'joi'
import { customApiErrorModule } from '../error/customError.js'
import {
  _ID_RULE,
  _ID_RULE_MESSAGE,
  PHONE_NUMBER_RULE,
  AGE_RULE,
  DATE_RULE,
  CCCD_RULE
} from '../utils/validators.js'

const createNew = async (req, res, next) => {
  const dataCorrection = Joi.object({
    lastMiddleName: Joi.string().required().min(3).max(2000).trim().strict(),
    firstName: Joi.string().required().max(2000).trim().strict(),
    email: Joi.string().email().required().min(3),
    phoneNum: Joi.string().regex(PHONE_NUMBER_RULE).required(),
    dateOfBirth: Joi.string().regex(DATE_RULE).required(),
    // age: Joi.string().pattern(/^[0-9]+$/, 'numbers').trim().strict().required(),
    // age: Joi.string().required().pattern(AGE_RULE).trim().strict(),
    gender: Joi.string().valid('Nam', 'Nữ').required(),
    job: Joi.string().required().min(3).max(2000).trim().strict(),
    citizenID: Joi.string().required().pattern(CCCD_RULE),
    height: Joi.string().required().max(2000).trim().strict(),
    weight: Joi.string().required().max(2000).trim().strict(),
    bloodType: Joi.string().required().max(2000).trim().strict(),
    address: Joi.string().required().min(3).max(2000).trim().strict(),
    hometown: Joi.string().required().min(3).max(2000).trim().strict(),
    diagnosis: Joi.string().required().min(3).max(2000).trim().strict(),
    // // Doctor_ID: Joi.string().required().pattern(_ID_RULE).message(_ID_RULE_MESSAGE),
    symptoms: Joi.string().min(3).max(2000).required(),
    medHistory: Joi.string().min(3).max(2000).optional()
    // treatProcess: Joi.array().default([]),
    // test: Joi.array().default([]),

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

const updatePatientInfo = async (req, res, next) => {
  const dataCorrection = Joi.object({
    lastMiddleName: Joi.string().min(3).max(256).trim().strict(),
    firstName: Joi.string().min(3).max(256).trim().strict(),
    email: Joi.string().email().min(3),
    phoneNum: Joi.string().regex(PHONE_NUMBER_RULE),
    dateOfBirth: Joi.string().regex(DATE_RULE),
    // age: Joi.string().pattern(/^[0-9]+$/, 'numbers').trim().strict(),
    // age: Joi.string().pattern(AGE_RULE).trim().strict(),
    gender: Joi.string().valid('Nam', 'Nữ'),
    job: Joi.string().min(3).max(256).trim().strict(),
    citizenID: Joi.string().pattern(CCCD_RULE),
    address: Joi.string().min(3).max(256).trim().strict(),
    hometown: Joi.string().min(3).max(256).trim().strict()
    // Doctor_ID: Joi.string().pattern(_ID_RULE).message(_ID_RULE_MESSAGE),
    // treatProcess: Joi.array().default([]),
    // test: Joi.array().default([]),
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
const updatePatientInfoMedical = async (req, res, next) => {
  const dataCorrection = Joi.object({
    height: Joi.string().max(256).trim().strict(),
    weight: Joi.string().max(256).trim().strict(),
    bloodType: Joi.string().max(256).trim().strict(),

    diagnosis: Joi.string().min(3).max(256).trim().strict(),

    // Doctor_ID: Joi.string().pattern(_ID_RULE).message(_ID_RULE_MESSAGE),
    symptoms: Joi.string().min(3).max(256),
    medHistory: Joi.string().min(3).max(256).optional()
    // treatProcess: Joi.array().default([]),
    // test: Joi.array().default([]),
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
export const patientValidation = {
  createNew, updatePatientInfo, updatePatientInfoMedical, deleteAnItem, deleteManyItems
}