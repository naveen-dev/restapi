import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { fromServices } from './services';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataTableComponent } from './components/data-table/data-table.component';
import{ MatButtonModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import{ MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {MatCheckboxModule, MatSelectModule} from '@angular/material';
import { MatCardModule } from '@angular/material';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { MatSnackBarModule } from "@angular/material";

import {         
  MatMenuModule,          
  MatIconModule,               
  MatInputModule,                
  MatRadioModule,              
  MatSlideToggleModule     
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    DataTableComponent,
    InventoryFormComponent,
    OrderListComponent,
    OrderFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  providers: [ fromServices ],
  bootstrap: [AppComponent]
})
export class AppModule { }
