export class Order{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    inventory: object;
    date: Date;
    quantity: number;
    status: number;
  
    constructor(order?: Order) {
      this.id = order ? order.id : -1;
      this.firstname = order ? order.firstname: '';
      this.lastname = order ? order.lastname: '';
      this.email = order ? order.email: '';
      this.inventory = order ? order.inventory: null;
      this.date = order ? order.date : null;
      this.quantity = order ? (order.quantity == null? 0: order.quantity) : 0;
      this.status = order ? (order.status == null? 0: order.status) : 1;
  }
  
}