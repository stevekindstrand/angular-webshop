import { User } from "./User";
import { IOrderRows } from "./IOrderRows";

export class Order {
    id: number;
    companyId: number;
    created: Date;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: IOrderRows[];


    constructor(user: User, totalPrice: number, orderRows: IOrderRows[]) {
        this.id = Number();
        this.companyId = 2246;
        this.created = new Date();
        this.createdBy = user.firstname + " " + user.lastname;
        this.paymentMethod = user.paymentMethod;
        this.totalPrice = totalPrice;
        this.status = 0;
        this.orderRows = orderRows;
    }
}