import express from 'express';
import cors from 'cors';

import { env } from './config/environment.js'
import { errorHandlerMiddleware } from './middleware/error-handler.js'
import { notFound } from './middleware/notFound.js'
import Router from './route/index.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { corsOptions } from './config/cors.js';

const app = express();

app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandlerMiddleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(notFound)

app.use('/v1', Router);
// app.route('/get').get((req, res) => {
//   res.status(200).end('<h1>Hello World!</h1><hr>')
// })
app.get("/", (req, res) => {
  res.send("task manager")
})
app.listen(env.PORT, () =>
  console.log(`Server is live @ ${env.HOST_URL}`),
);
// app.listen(8080, () => {
//   // eslint-disable-next-line no-console
//   console.log(' I am running  http://localhost:8080')
// })