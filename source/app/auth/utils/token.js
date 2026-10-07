import JWT from 'jsonwebtoken'
import { toSeconds } from '../../../common/utilis/time.js'
export function generateToken(payload){
    payload,
    process.env.JWT_SECRET,
    {expiresIn:toSeconds(1,'hours')}
}
 export default {generateToken}
