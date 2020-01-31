package com.project.rest.resource;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.rest.manager.InventoryManager;
import com.project.rest.pojo.Inventory;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/inventories")
public class InventoryController {

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventories() {
	try {
	    return new ResponseEntity<List<Inventory>>(new InventoryManager().fetchAll(), HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }

    @PostMapping
    public ResponseEntity<Void> addInventory(@RequestBody Inventory inventory) {
	try {
	    new InventoryManager().addOrUpdateInventory(inventory);
	    return new ResponseEntity<Void>(HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventory(@PathVariable int id) {
	try {
	    return new ResponseEntity<Inventory>(new InventoryManager().fetchById(id), HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteInventory(@PathVariable int id) {
	try {
	    return new ResponseEntity<Boolean>(new InventoryManager().deleteById(id), HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateInventory(@PathVariable int id, @RequestBody Inventory inventory) {
	try {
	    new InventoryManager().addOrUpdateInventory(inventory);
	    return new ResponseEntity<Void>(HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }
}
