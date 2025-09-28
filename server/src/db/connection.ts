import { connect, disconnect } from 'mongoose'

async function connectToDatabase(){
    try {
        await connect(process.env.MONGODB_URL)
    } catch(err){
        console.log("Connection with DB Error==>",err)
        throw new Error("Cannot Connect to DB")
    }
}

async function disconnectFromDatabase() {
    try {
        disconnect()
    } catch(err){
        console.log("Disconnect from DB Error==>",err)
        throw new Error("Cannot Connect to DB")
    }
}

export {
    connectToDatabase,
    disconnectFromDatabase
}