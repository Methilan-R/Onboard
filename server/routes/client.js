import express from 'express'
import Client from '../modals/Client.js';
const router = express.Router()
router.post('/onboard',async(req,res)=>{
    try{
        const {fullName,email,companyName,services,budgetUsd,projectStartDate,acceptTerms}=req.body;
        const newClient = new Client({
            fullName,
            email,
            companyName,
            services,
            budgetUsd,
            projectStartDate,
            acceptTerms
        })
        await newClient.save()
        return res.status(200).json({
            success:true,
            message:"Client details add successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Client details can't added"
        })
    }
})

export default router