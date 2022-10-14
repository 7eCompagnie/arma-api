import express from "express"
import "dotenv/config"
import usersRoute from "./routes/users.route.js";

const app = express()
const PORT = process.env.SERVER_PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoute)

app.listen(PORT, () => console.log(`[API] => Running on port ${PORT}`))