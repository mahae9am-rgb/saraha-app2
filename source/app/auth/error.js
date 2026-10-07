import { AppError } from "../../common/error.js"
export const userAlreadtyExist = new AppError('user already Exist')
export const userNotExist = new AppError('user not found')
export const userAlreadyVerified = new AppError('user already verified')
export const userNotVerified = new AppError('user not verified')
export const otpExpiresin = new AppError('otp expires , please resend otp')
export const invalidCode= new AppError('invalid otp')
