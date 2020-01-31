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

import com.project.rest.manager.OrderManager;
import com.project.rest.pojo.Order;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/orders")
public class OrderController {
    
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
	try {
	    return new ResponseEntity<List<Order>>(new OrderManager().fetchAll(), HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }
    
    @PostMapping
    public ResponseEntity<Void> addOrder(@RequestBody Order order) {
	try {
	    new OrderManager().addOrUpdateOrder(order);
	    return new ResponseEntity<Void>(HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable int id) {
	try {
	    return new ResponseEntity<Order>(new OrderManager().fetchById(id), HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteOrder(@PathVariable int id) {
	try {
	    return new ResponseEntity<Boolean>(new OrderManager().deleteById(id), HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateInventory(@PathVariable int id, @RequestBody Order order) {
	try {
	    new OrderManager().addOrUpdateOrder(order);
	    return new ResponseEntity<Void>(HttpStatus.OK);
	} catch (Exception e) {
	    throw e;
	}
    }

}
