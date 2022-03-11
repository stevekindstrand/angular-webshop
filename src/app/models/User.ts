export class User {
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    zipCode: string;
    cellphone: string;
    email: string;
    paymentMethod: string;

    constructor(firstname: string, lastname: string, address: string, city: string, zipCode: string, cellphone: string, email: string, paymentMethod: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
        this.cellphone = cellphone;
        this.email = email;
        this.paymentMethod = paymentMethod;
    }
}