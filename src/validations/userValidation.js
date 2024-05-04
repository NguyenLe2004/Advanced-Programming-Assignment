import Joi from 'joi'
import { customApiErrorModule } from '../error/customError.js'
import { env } from '../config/environment.js'

const signUp = async (req, res, next) => {
  const dataCorrection = Joi.object({
    name: Joi.string().required().min(3).max(256).trim().strict(),
    email: Joi.string().email().required().min(3).max(50),
    password: Joi.string().min(7).required().trim().strict(),
    role: Joi.string().required()
  })
  try {
    await dataCorrection.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
    // throw new Error(error)
  }
}
const signIn = async (req, res, next) => {
  const dataCorrection = Joi.object({
    email: Joi.string().email().required().min(3).max(50),
    password: Joi.string().min(7).required().trim().strict()
  })
  try {
    await dataCorrection.validateAsync(req.body)
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new customApiErrorModule.CustomAPIError(422, errorMessage)
    next(customError)
    // throw new Error(error)
  }
}

export const userValidation = {
  signUp,
  signIn
}