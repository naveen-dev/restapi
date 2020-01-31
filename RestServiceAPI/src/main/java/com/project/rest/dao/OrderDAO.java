/**
 * 
 */
package com.project.rest.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.project.rest.pojo.Inventory;
import com.project.rest.pojo.Order;

/**
 * @author naveenraj.devaraj
 *
 */
public class OrderDAO {

    public List<Order> fetchAll(Session session) {
	List<Order> orders = null;
	try {
	    if (session != null) {
		Criteria criteria = session.createCriteria(Order.class);
		orders = criteria.list();
	    }
	} catch (Exception e) {
	    throw e;
	}
	return orders;
    }
    
    public void addOrder(Session session, Order order) {
	Transaction transaction = null;
	try {
	    if (session != null) {
		transaction = session.beginTransaction();
		session.saveOrUpdate(order);
		session.flush();
		transaction.commit();
	    }
	} catch (Exception e) {
	    transaction.rollback();
	    throw e;
	}
    }
    
    
    public Order fetchById(Session session, int id) {
	Order order = null;
	try {
	    if (session != null) {
		order = (Order) session.get(Order.class, new Integer(id));
	    }
	} catch (Exception e) {
	    throw e;
	}
	return order;
    }

    public boolean deleteById(Session session, int id) {
	Transaction transaction = null;
	try {
	    if (session != null) {
		transaction = session.beginTransaction();
		Object tempObj = session.get(Order.class, id);
		if (tempObj != null) {
		    session.delete(tempObj);
		}
		session.flush();
		transaction.commit();
	    }
	} catch (Exception e) {
	    transaction.rollback();
	    throw e;
	}
	return true;
    }

}
