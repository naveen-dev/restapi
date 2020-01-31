import { Component, Input, Output } from '@angular/core';
import { Inventory } from 'src/app/models/Inventory';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export class temp {
  name: string
}

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent {
  public InventoryForm: FormGroup;

  inventory: Inventory;
  @Input() tempInventory: Inventory;
  form: FormGroup;


  public onCancel = (componentName) => {
    this.router.navigate([''], { state: { data: componentName } });

  }

  constructor(private router: Router, private inventoryService: InventoryService) {
    this.inventory = new Inventory();
  }

  public submitInventoryForm = (inventoryId) => {
    if (this.inventory.name != '' && this.inventory.price > 0) {
      this.onSubmit(inventoryId);
    }
  }

  onSubmit(id: number) {

    if (id > 0) {
      this.inventoryService.editInventoryById(this.inventory).subscribe(result => this.getAllInventories());
    } else {
      delete this.inventory.id;
      this.inventoryService.addNewInventory(this.inventory).subscribe(result => this.getAllInventories());
    }
  }

  getAllInventories() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.createForm();
    this.tempInventory = history.state.data;
    if(this.tempInventory != null && this.tempInventory != undefined){
      this.loadEditInventory(this.tempInventory);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    })
  }

  loadEditInventory(tempInventory) {
      this.inventory.id = tempInventory.id;
      this.inventory.name = tempInventory.name;
      this.inventory.description = tempInventory.description;
      this.inventory.price = tempInventory.price;
      this.inventory.quantity = tempInventory.quantity;
  }
}

