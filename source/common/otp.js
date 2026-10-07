import crypto from 'node:crypto'
export async function generateOTPCode() {
    return   crypto.randomInt(10000,999999).toString()
    
}

export default { generateOTPCode}