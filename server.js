import app from "./app.js";
import { connectDB } from './config/Database.js'

connectDB()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
