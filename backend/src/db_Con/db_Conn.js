import mongoose from "mongoose";

const db_Conn = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log('DB Connection Successful')
    }).catch((err)=>{
        console.log("DB Connection Unsuccessful", err)
    })
}

export default db_Conn