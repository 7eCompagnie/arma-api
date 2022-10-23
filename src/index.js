import express from "express"
import "dotenv/config"
import usersRoute from "./routes/users.route.js";
import trainingsRoute from "./routes/trainings.route.js";
import trainersRoute from "./routes/trainers.route.js";
import settingsRoute from "./routes/settings.route.js";
import campaignsRoute from "./routes/campaigns.route.js";
// import operationsRoute from "./routes/operations.route.js";

const app = express()
const PORT = process.env.SERVER_PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/users', usersRoute)
app.use('/trainings', trainingsRoute)
app.use('/trainings', trainersRoute)
app.use('/settings', settingsRoute)
app.use('/campaigns', campaignsRoute)
// app.use('/operations', operationsRoute)

app.listen(PORT, () => console.log(`[API] => Running on port ${PORT}`))