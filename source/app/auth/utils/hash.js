//import bcrypt, { compare }  from "bcryptjs";
import argon2 from "argon2"
export  async function hashPassword(password){
    return argon2.hash(password)
}
export async function comparePassword(password,passwordhash){
    return argon2.verify(passwordhash,password)
} 
export default {hashPassword,comparePassword}