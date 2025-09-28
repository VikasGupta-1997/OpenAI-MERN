import app from './app'
import { connectToDatabase } from './db/connection'

const PORT = process.env.PORT || 8000
connectToDatabase().then(() => {
    console.log()
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
}).catch((err) => {
    console.log("Error")
})