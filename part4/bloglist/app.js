import express from "express"
import mongoose from "mongoose"
import { MONGODB_URI, PORT } from "./utils/config.js"
import { info, error } from "./utils/logger.js"
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware.js"

import blogsRouter from "./controllers/blogs.js"

const app = express()

info("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => {
    info("connected to MongoDB")
  })
  .catch((error) => {
    error("error connection to MongoDB:", error.message)
  })

app.use(express.json())
app.use(requestLogger)

app.use("/api/blogs", blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
