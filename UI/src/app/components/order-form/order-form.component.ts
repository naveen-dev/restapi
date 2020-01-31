import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order-service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InventoryComponent } from '../inventory/inventory.component';
import { Inventory } from 'src/app/models/Inventory';
import { InventoryService } from 'src/app/services';




export class Status {
  id: number;
  status: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

order : Order;
myform: FormGroup;
tempStatus = [];
@Input() tempOrder: Order;
inventoryList: Inventory[];
inventoryLists: Array<Inventory>;
isValidForm = 0;
@Input() isEdit = 0;



  constructor(private router: Router, private orderService: OrderService, private formBuilder: FormBuilder, private inventoryComponent: InventoryComponent, private inventoryService: InventoryService) {
    this.order = new Order();
    this.myform = this.formBuilder.group({
      tempColorLoader: ['']
    });
   }

 
   statuses: Status[] = [
    { id: 1, status: this.inventoryComponent._INPROGRESS },
    { id: 2, status: this.inventoryComponent._DELIVERED }
  ];



  ngOnInit() {
    this.tempStatus = this.statuses;
    this.inventoryService.getAllInventories().subscribe(results =>{
      this.inventoryList = results;
      this.inventoryLists = results;
    });
    this.tempOrder = history.state.data;
      if(this.tempOrder != undefined){
        this.loadOrderFormEdit();
        this.isEdit = 1;
      }
      this.createForm();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.myform.controls[controlName].hasError(errorName);
  }

  createForm() {
    this.myform = new FormGroup({
      firstname:  new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      inventory : new FormControl('', [Validators.required]),
      quantity : new FormControl('', [Validators.required]),
      status : new FormControl('', [Validators.required])
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myform.controls[control].hasError(error);
  }


  public onCancel = (componentName) => {
    this.router.navigate(['dataTable'],{state:{data:componentName}});
    
  }

  public submitOrderForm = (orderId) =>{
    if(this.order.firstname != "" && this.order.email != "" && this.order.quantity > 0 && Number(this.order.inventory) > 0){
      this.order.inventory = this.inventoryLists.filter(result => result.id == Number(this.order.inventory))[0];
      if(this.order.quantity <= Number(this.order.inventory['quantity'])){
        this.order.date = new Date();
        this.onSubmit(orderId);
      }else{
        this.inventoryComponent.showMessage("Maximum Quantity of "+ this.order.inventory['name'] +" is "+ this.order.inventory['quantity']);
      }
    }
  }
  onSubmit(orderId){
    if(orderId < 0){
      delete this.order.id;
      this.orderService.addNewOrder(this.order).subscribe(result=> this.getAllOrders());
    }else{
      this.orderService.editOrderById(this.order).subscribe(result=> this.getAllOrders());
    }
  }
  
  getAllOrders() {
    this.router.navigate(['dataTable'],{state:{data:this.inventoryComponent.ORDER_COMPONENT}});
  }

loadOrderFormEdit(){
  this.order.id = this.tempOrder.id;
  this.order.firstname = this.tempOrder.firstname;
  this.order.lastname = this.tempOrder.lastname;
  this.order.email = this.tempOrder.email;
  this.order.date = this.tempOrder.date;
  this.order.quantity = this.tempOrder.quantity;
  this.order.inventory = this.tempOrder.inventory["id"];
  this.order.status = this.tempOrder.status;
}

}
