import { WHITELIST_DOMAINS } from '../utils/constants.js'
// import { env } from '../config/environment.js'
import { customApiErrorModule } from '../error/customError.js'

export const corsOptions = {
  origin: function (origin, callback) {

    if (!origin) {
      return callback(null, true)
    }
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new customApiErrorModule.CustomAPIError(`${origin} not allowed by our CORS Policy.`, 403))
  },

  optionsSuccessStatus: 200,

  credentials: true
}