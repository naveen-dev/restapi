import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { Inventory } from '../../models/Inventory';
import { InventoryService } from '../../services';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order-service.service';
import { InventoryComponent } from '../inventory/inventory.component';

export interface DynamicColumns {
  name: string;
  label: string;
  isdelete: boolean;
}


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})


export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  items: Array<any>;
  isInventory : boolean;
  constructor(private inventoryService: InventoryService, private router: Router, private orderService: OrderService, private inventoryComponent: InventoryComponent) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [];

  currentColumn: Array<any>[];


  inventoryColumns: Array<any> = [
    { name: 'name', label: 'Name', isdelete: 0},
    { name: 'description', label: 'Description' , isdelete: 0},
    { name: 'price', label: 'Price', isdelete: 0 },
    { name: 'quantity', label: 'Quantity' , isdelete: 0},
    { name: 'delete', label: 'Delete' , isdelete: 1}
  ]


  orderColumns: Array<any> = [
    { name: 'firstname', label: 'First Name' , isdelete: 0},
    { name: 'lastname', label: 'Last Name' , isdelete: 0},
    { name: 'email', label: 'Email' , isdelete: 0},
    { name: 'inventoryName', label: 'Inventory Name' , isdelete: 0},
    { name: 'quantity', label: 'Quantity' , isdelete: 0},
    { name: 'date', label: 'Order Date' , isdelete: 0},
    { name: 'orderStatus', label: 'Status' , isdelete: 0},
    { name: 'delete', label: 'Delete' , isdelete: 1}
    
  ]

  dynamicColumns : Array<any>;
  ngOnInit() {
    if ((history.state.data != undefined && history.state.data == this.inventoryComponent.ORDER_COMPONENT)) {
      this.displayedColumns = this.orderColumns.map(column => column.name);
      this.dynamicColumns = this.orderColumns;
      this.isInventory = false;
      this.inventoryComponent.LOAD_ALL = this.inventoryComponent.ALL_INVENTORIES;
      this.orderService.getAllOrders().subscribe((orders: Array<Order>) => {
        orders.map(order =>{
          order['inventoryName'] = order.inventory['name'];
        })
        this.items = orders;
      })
    } else if (history.state.data == undefined || history.state.data == this.inventoryComponent.INVENTORY_COMPONENT) {
      this.displayedColumns = this.inventoryColumns.map(column => column.name);
      this.dynamicColumns = this.inventoryColumns;
      this.inventoryComponent.LOAD_ALL = this.inventoryComponent.ALL_ORDERS;
      this.isInventory = true;
      this.inventoryService.getAllInventories().subscribe((inventories: Array<Inventory>) => {
        this.items = inventories; 
      })
    }


  }


  deleteById(deleteObj, isInventory) {
    if (deleteObj != undefined && deleteObj != null) {
      if (isInventory) {
        this.inventoryService.deleteInventoryById(deleteObj.id).subscribe((data) => {
          this.inventoryComponent.showMessage(this.inventoryComponent.INVENTORY_DELETED_SUCCESS);
          this.ngOnInit();
        });
      } else {
          this.orderService.deleteOrderById(deleteObj.id).subscribe((data) => {
            this.inventoryComponent.showMessage(this.inventoryComponent.ORDER_DELETED_SUCCESS);
            this.ngOnInit();
          });
      }

    }else{
      this.inventoryComponent.showMessage(this.inventoryComponent.EMPTY_DATA);
    }
  }

  gotoedit(editObject, isInventory) {
    if (isInventory) {
      this.router.navigate(['/addNewInventory'], { state: { data: editObject } });
    } else {
      this.router.navigate(['/addNewOrder'], { state: { data: editObject } });
    }

  }
}
