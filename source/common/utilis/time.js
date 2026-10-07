export  function toMs(time,unit) {
    switch(unit){
        case 'seconds':
            return time*1000
            case 'minutes' :
            return time*60*1000
            case 'hours':
                return time*60*60*1000
                default:
throw new Error (`unknown unit:${unit}`)    }
    
}
export function toSeconds(time,unit) {
    switch(unit){
        case 'milliseconds':
            return time/1000
            case 'minutes':
                return time*60
                case 'hours':
                    return time*60*60
                    default:
                      throw new Error (`unknown unit:${unit}`)    

    }
    
}
export default {toMs,toSeconds}