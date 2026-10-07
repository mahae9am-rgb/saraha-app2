import { toSeconds } from '../../../common/utilis/time.js'
import { valaditeBody } from '../../../common/validition/valdition.js'
import { loginDTO, registerDTO, resetpasswordDTO, sendOTPDTO, verifiyaccountDTO } from '../dto/auth.dto.js'
import authService, { register } from  '../service/auth.service.js'

export async function createUser(req,res,next) {
    try{
    const data = valaditeBody(registerDTO,req.body)
const {name,email,password}= data

    const registration = await authService.register({name,email,password})
    res.status(201).json({
        message:"user create successfully",
        data:registration,
        success:true
    })
    }catch(error){
        next(error)
    }
}

export async function updateUser(req,res,next) {
    try{
        const data= valaditeBody(verifiyaccountDTO,req.body)
        const { email, code}= data
const updated = await authService.verifiyAccount(email,code)
res.status(200).json({
    message:'user updated successfully',
    data:updated,
    success:true
})


    }catch(error){
        next(error)
    }
    
}
export async function login(req,res,next) {
   try{
    const data = valaditeBody(loginDTO,req.body)
     const {email,password}= data
    const userData= await authService.login(email,password)
    res.cookie('access-token',userData,
        {httpOnly:true,maxAge:toSeconds(1,'hours')*1000})
    res.status(200).json({message:'login successfullty',success:true,data:userData})
   }catch(error){

    next(error)
   }
}


export async function sendotp(req,res,next) {
    try{
        const data = valaditeBody (sendOTPDTO,req.body)
const {email}= data
    await authService.sendOtp(email)
    res.status(200).json({message:"otp is send, check your email",success:true})
    
    }catch(error){
        next(error)
    }
}
export async function resetPassword(req,res,next) {
    try{
        const data= valaditeBody(resetpasswordDTO,req.body)
        const {email,code,newPassword}=data
        await authService.resetPassword(email,code,newPassword)
        res.status(200).json({message:' reset password successfully',success:true})
    
    }catch(error){
        next(error)
    }
    
}
export async function loginWithG(req,res,next) {
     const token = await authService.loginWithGoogle(req.body.idToken)
    res.cookie('access token',token,{
        httpOnly:true,
        maxAge:toSeconds(1,'hours')
    })
    res.status(200).json({
        message:'login with google successfully',success:true
    })
}
export default {createUser,updateUser,login,sendotp,resetPassword,loginWithG}
