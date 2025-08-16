import express from 'express'
import cors from 'cors'
import ConnectedToDB from './db/db.js'
import dotenv from 'dotenv'
import clientRoutes from './routes/client.js'
dotenv.config()
const app = express()
 
app.use(cors({
  origin: ['http://localhost:3000','https://onboard-m867.vercel.app'], // or '*' for all origins
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


 
app.use(express.json())

app.use('/api',clientRoutes)
ConnectedToDB()

app.get('/',(req,res)=>{
    return res.send("Backend is Running")
})

app.listen(4000,()=>{
    console.log("Server Running on 4000")
})



