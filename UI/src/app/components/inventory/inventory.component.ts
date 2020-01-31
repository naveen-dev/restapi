import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  TITLE = 'REST Angular';
  ADD_INVENTORY = 'Add Inventory';
  ADD_ORDER = 'Add Order';
  ALL_ORDERS = 'All Orders';
  LOAD_ALL = this.ALL_ORDERS;
  ALL_INVENTORIES = 'Inventories'
  ORDER_COMPONENT = "orderComponent";
  INVENTORY_COMPONENT = "inventoryComponent";

  EMPTY_DATA = "Provider Data is seems to Empty";
  ORDER_DELETED_SUCCESS = "Order Deleted Successfully";
  INVENTORY_DELETED_SUCCESS = "Inventory Deleted Successfully";
  _INPROGRESS = "In-Progress";
  _DELIVERED = "Delivered";
 

  ngOnInit() {
  }

  constructor(private router: Router, private _snackBar: MatSnackBar) {
  }
  showMessage(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  loadComponent(componentName) {
    if (componentName == this.ALL_ORDERS) {
      this.router.navigate(['dataTable'], { state: { data: this.ORDER_COMPONENT } });
    } else {
      this.router.navigate([''], { state: { data: this.INVENTORY_COMPONENT } });
    }

  }
}
