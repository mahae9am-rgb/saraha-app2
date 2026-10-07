
export class AppError{
    statusCode
    isOpertional
    constructor(message,statusCode,isOpertional=true){
        //super(message)
        this.message=message
        this.statusCode=statusCode
    }

}
const err = new AppError('message',404)

