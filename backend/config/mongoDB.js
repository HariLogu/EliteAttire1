import mongoose from "mongoose"

async function connectDB(){
    try {
        mongoose.connection.on("connected",()=>{
            console.log("DB Connected");
        })
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("DB Error:",error);
        
    }
    
}

export default connectDB;