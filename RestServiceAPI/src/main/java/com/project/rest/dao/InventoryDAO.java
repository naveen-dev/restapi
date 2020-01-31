/**
 * 
 */
package com.project.rest.dao;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.project.rest.pojo.Inventory;

/**
 * @author naveenraj.devaraj
 *
 */
public class InventoryDAO {
    Logger logger = LogManager.getLogger(InventoryDAO.class);

    public void addInventory(Session session, Inventory inventory) {
	Transaction transaction = null;
	try {
	    if (session != null) {
		transaction = session.beginTransaction();
		session.saveOrUpdate(inventory);
		session.flush();
		transaction.commit();
	    }
	} catch (Exception e) {
	    transaction.rollback();
	    throw e;
	}
    }

    public List<Inventory> fetchAll(Session session) {
	List<Inventory> inventories = null;
	try {
	    if (session != null) {
		Criteria criteria = session.createCriteria(Inventory.class);
		inventories = criteria.list();
	    }
	} catch (Exception e) {
	    throw e;
	}
	return inventories;
    }

    public Inventory fetchById(Session session, int id) {
	Inventory inventory = null;
	try {
	    if (session != null) {
		inventory = (Inventory) session.get(Inventory.class, new Integer(id));
	    }
	} catch (Exception e) {
	    throw e;
	}
	return inventory;
    }

    public boolean deleteById(Session session, int id) {
	Transaction transaction = null;
	try {
	    if (session != null) {
		transaction = session.beginTransaction();
		Object tempObj = session.get(Inventory.class, id);
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
