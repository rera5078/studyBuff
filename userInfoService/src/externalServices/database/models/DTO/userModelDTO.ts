export interface IUserDBModel {
    CustomerId: string;
    Name: string;
    Email: string;
    Password: string;
}


export default class UserModelDTO {
    userId: string;
    name: string;
    email: string;
    password: string;
  
    constructor(customer: IUserDBModel) {
        this.userId = customer.CustomerId;
        this.name = customer.Name;
        this.email = customer.Email;
        this.password = customer.Password;
    }
  }