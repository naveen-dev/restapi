import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  
  {
    path: '', 
    component: InventoryComponent,
    children:[
      {
        path: '', 
        component: DataTableComponent
      }
    ]
  },
  {
    path: 'dataTable', 
    component: InventoryComponent,
    children:[
      {
        path: '', 
        component: DataTableComponent
      }
    ]
  },
  {
    path: 'addNewInventory', 
    component: InventoryComponent,
    children:[
      {
        path: '', 
        component: InventoryFormComponent
      }
    ]
  },
  {
    path: 'addNewOrder', 
    component: InventoryComponent,
    children:[
      {
        path: '', 
        component: OrderFormComponent
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
