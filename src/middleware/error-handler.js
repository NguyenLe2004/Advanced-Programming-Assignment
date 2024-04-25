import { customApiErrorModule } from '../error/customError.js'

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof customApiErrorModule.CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: `Something went wrong, please try again` });
  // return res.status(500).json({msg:err});
  // return res.status(500).json({msg:`Must provide a value cannot create empty value`});
  // return res.status(err.status).json({msg: err.message});
}
