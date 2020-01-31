export class Inventory{
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
  
    constructor(inventory?: Inventory) {
      this.id = inventory ? inventory.id : -1;
      this.name = inventory ? inventory.name: '';
      this.description = inventory ? inventory.description: '';
      this.price = inventory ? inventory.price : 1;
      this.quantity = inventory ? inventory.quantity : 1;
  }
  
  }