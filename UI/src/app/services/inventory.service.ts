import { Injectable } from '@angular/core';
import { Inventory } from '../models/Inventory';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class InventoryService {
      
  private clientApiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllInventories(): Observable<Array<Inventory>> {
    const mapInventories = (inventories: Array<Inventory>) =>
    inventories.map((inventories: Inventory) =>
            new Inventory(inventories));
    return this.http
        .get<Array<Inventory>>(`${this.clientApiBaseUrl}/inventories`)
        .pipe(map(mapInventories));
      }

  public addNewInventory(inventory: Inventory) {
        return this.http
            .post(`${this.clientApiBaseUrl}/inventories`,inventory);
      }

  public getInventoryByID(id: number) {
        return this.http
            .get<Inventory>(`${this.clientApiBaseUrl}/inventories/`+id);
      }

  public deleteInventoryById(id: number){
        return this.http.delete(`${this.clientApiBaseUrl}/inventories/`+id);
      }

  public editInventoryById(inventory: Inventory) {
      return this.http.put(`${this.clientApiBaseUrl}/inventories/`+inventory.id,inventory);
      }
}