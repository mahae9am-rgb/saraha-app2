import * as authRepository from '../repository/auth.repository.js'
import * as authOTP from '../repository/auth.otp.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendEmail } from '../../../common/email/nodemailer.js'
import userRepository from '../../user/repository/user.repository.js'
import { OTP } from '../model/otp.model.js'
import JWT from 'jsonwebtoken'
import otpjs, { generateOTPCode } from '../../../common/otp.js'
import { toMs, toSeconds } from '../../../common/utilis/time.js'
import * as userError from '../../user/error.js'
import { generateToken } from '../utils/token.js'
import { comparePassword, hashPassword } from '../utils/hash.js'
import { invalidCode, otpExpiresin } from '../error.js'
import { verifyidToken } from '../../../common/utilis/google-auth.js'

export async function register(userData) {

   const userExist = await authRepository.checkUserExistByEmail(userData.email)
   if(userExist){ throw userAlreadtyExist}
userData.password =  await hashPassword(userData.password)
const createUser = await authRepository.createUser(userData)
const otp =  await generateOTPCode()
console.log("toSeconds result:", toSeconds(1, 'hours'))

const savedOtp = await authOTP.createOTP({
    code: otp,
    email: userData.email,
    expiresAt: new Date(Date.now() + toSeconds(1, 'hours') * 1000)
})
console.log("SAVED OTP DOCUMENT:", savedOtp)
try{
await sendEmail({
   to: userData.email,
    subject:'verification code',
    html: `<h1>you verification code is ${otp}</h1>`
})
}catch(error){
    console.log('email failed,otp is :',otp);
    
}
return createUser
}




export async function verifiyAccount(email,code) {
    const userExist = await authRepository.checkUserExistByEmail(email)
    if(!userExist){userError.userNotExist}
    if(userExist.isVerified===true){ throw userAlreadyVerified}
    const otp = await authOTP.getOtpByEmail(email)

    if(!otp){otpExpiresin}

    if(otp.code!==code){invalidCode}

    const updateUser = await userRepository.updateUserByEmail(email,{isVerified:true})
    await authOTP.deleteOTP(email)
    return updateUser
}

export async function login(email,password) {
    const user = await authRepository.checkUserExistByEmail(email)
if(!user){userError.userNotExist}
if(user.isVerified===false){  throw userNotVerified} 

const match = await comparePassword(password,user['password'])

if(!match){throw new Error('password not exist into db')} 

 return generateToken({id:user.id,name:user.name}) 
   
}


export async function sendOtp(email) {
    const user = await authRepository.checkUserExistByEmail(email)
    if(!user){ throw userNotExist}
     await authOTP.deleteOTP(email) 
       const code =  await generateOTPCode()

       await sendEmail({
       to: email,
        subject:'new otp',
        html:`<p>your new otp is ${code}</p>`})

       await authOTP.createOTP({
        code:code,
        email:email,
        expiresAt:new Date(Date.now()+toSeconds(5,'minutes')*1000)
       })
}
export async function resetPassword(email,code,newPassword){
    const otp = await authOTP.getOtpByEmail(email)
    if(!otp) {otpExpiresin}
    if(otp.code!==code){invalidCode}
    const hashedPassword = await hashPassword(newPassword)
    await userRepository.updateUserByEmail(email,{password:hashedPassword})
    await authOTP.deleteOTP(email)


}

export async function loginWithGoogle(idToken) {
     const payload = await verifyidToken(idToken)
   const user= await authRepository.checkUserExistByEmail(email)
   if(user){
    return generateToken({
        id:user.id,email:user.email
    })
   }
   const createUser = await authRepository.createUser({
    name:payload.createUser,
    email:payload.createUser,
    provider:payload.createUser,
    isVerified:true
   })
   return generateToken({
    id:createUser.id, email:createUser.email
   })
    
}
export default {register,verifiyAccount,login,sendOtp,resetPassword,loginWithGoogle}