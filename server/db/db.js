import mongoose from "mongoose";

const ConnectedToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
        console.log("MoongoDB Connected")
    }catch(error){
        console.log("error Building on MongoDB Connection",error.message)
    }

}
export default ConnectedToDB