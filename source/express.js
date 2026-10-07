
{
class User {
    userName;
    mail;
    password;;
    age;
    isVerifed

constructor(userName,mail,password,age){
    this.userName=userName
    this.mail=mail
    this.password=password
    this.age=age
    this.isVerifed= false
}
}

class Customer extends User{
    phone
    age
    address

constructor(userName,mail,password,phone,age,address){
    super(userName,mail,password)
        this.phone=phone
        this.age=age
        this.address=address
    }
}
const customer = new Customer('ali','ali@gmail.com','2369','010256987','23','egypt')
console.log(customer);
}

