import express from 'express'
import cors from 'cors'
import ConnectedToDB from './db/db.js'
import dotenv from 'dotenv'
import clientRoutes from './routes/client.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 4000

const corsOption={
  origin:process.env.APPLICATION_URL,
  methods:"POST,GET"
};
app.use(cors(corsOption));


 
app.use(express.json())

app.use('/api/onboard',clientRoutes)
ConnectedToDB()

app.get('/',(req,res)=>{
    return res.send("Backend is Running")
})

app.listen(port,()=>{
    console.log("Server Running on 4000")
})



