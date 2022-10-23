import express from "express"
import "dotenv/config"
import usersRoute from "./routes/users.route.js";
import trainingsRoute from "./routes/trainings.route.js";
import trainersRoute from "./routes/trainers.route.js";

const app = express()
const PORT = process.env.SERVER_PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/users', usersRoute)
app.use('/trainings', trainingsRoute)
app.use('/trainings', trainersRoute)

app.listen(PORT, () => console.log(`[API] => Running on port ${PORT}`))