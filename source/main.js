import express from 'express'
import mongoose from 'mongoose'
import authRoute from './app/auth/auth.route.js'
//import messageRoute from './app/message/message.route.js'
//import userRoute from './app/user/user.route.js'
import { config } from 'dotenv'
import './common/mongoose.js'
import { AppError } from './common/error.js'
import {logger}  from './common/logger/logger.js'
import cors from 'cors'
config()

const app = express()
app.use(cors({origin:"http://localhost:3000"}))
app.use(express.json())

app.use('/auth',authRoute)
//app.use('/user',userRoute)
//app.use('/message',messageRoute)



app.use((err,req,res,next)=>{
    logger.error(err.message)
    if(err.isOperotnial===true){
        return res.json({
            message:err.message,
            success:false
        })
    }
    return res.status(500).json({
        message:'somthing wrong',
        success:false
    })
})

app.listen(9700,()=> logger.info('server is run on port 9700')
)