import {z} from 'zod'
import { AppError } from '../error.js'
export function valaditeBody(dto,body){
    const result= z.safeParse(dto,body)
    if(result.success===false){
        //handle error
        const errMessages= result.error.issues.map(issue=>`${issue.path[0]}:${issue.message}`)
        throw new AppError(errMessages.join(', '),400)
    }
    return result.data
}