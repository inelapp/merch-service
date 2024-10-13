import app from "./app"
import { PORT } from "./config"
import { dbConnection } from "./config/dbconfig"

(async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
    await dbConnection.default();
})()