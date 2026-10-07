import { OAuth2Client } from "google-auth-library";
import { AppError } from "../error.js";
const client = new OAuth2Client()

export async function verifyidToken(idToken) {
   try{
    const ticket = await client.verifyIdToken({
        idToken:idToken,
    audience:process.env.GOOGLE_OAUTH_TOKEN})
    return ticket.getPayload()
   }catch(err){
    throw new AppError('invalid google token',403)
   }

}
export default {verifyidToken}

