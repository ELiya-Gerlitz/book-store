import express from "express"
import appConfig from "./2-Utils/appConfig"
import catchAll from "./3-Middlewares/catch-all"
import routeNotFound from "./3-Middlewares/routeNotFound"
import booksController from "./6-Controllers/books-controllers"
import authController from "./6-Controllers/auth-controller"
import cors from "cors"
import Shabbat from "./3-Middlewares/shabbat"
import fileUpload from "express-fileupload"

const server= express()

server.use(cors()); // Allow any site to access our backend
// server.use(cors({ origin: "http://localhost:3000" })); // Allow only this site to access our backend
// server.use(cors({ origin: ["http://localhost:3000", "http://some-other.com"] })); // Allow only those sites to access our backend
server.use(express.json())
server.use(fileUpload())

server.use(Shabbat)
server.use("/api", authController)
server.use("/api", booksController)
server.use("*", routeNotFound)

server.use(catchAll)


server.listen(appConfig.port, ()=> console.log(`I am listening to port ${appConfig.port}`))
console.log("I am app")