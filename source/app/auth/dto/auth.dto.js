import {z} from 'zod'
export const registerDTO = z.object({
    name:z.string().min(6).max(20).trim(),
    email:z.string().lowercase().trim(),
    password:z.string().min(10).max(18).trim(),
    provider:z.enum(['local,google,facebook']).default('local'),
    gender:z.enum(['male,famele']).optional()
})
export const loginDTO = z.object({
     email:z.string().lowercase().trim(),
    password:z.string().min(10).max(18).trim(),

})
export const verifiyaccountDTO =z.object({
    email:z.string().lowercase().trim(),
    code:z.string().length(5).trim(),

})
export const sendOTPDTO = z.object({
     email:z.string().lowercase().trim(),

})
export const resetpasswordDTO= z.object({
    email:z.string().lowercase().trim(),
    code:z.string().length(5).trim(),
    newPassword:z.string().min(10).max(18).trim()

})