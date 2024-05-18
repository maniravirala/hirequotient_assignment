import mongoose from "mongoose";


const dbConnection = () =>{
    console.log("waiting for the Db")
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Database connected")
    }).catch(err => {throw err})
}

export default dbConnection;