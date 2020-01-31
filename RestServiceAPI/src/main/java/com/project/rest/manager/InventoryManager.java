package com.project.rest.manager;

import java.util.List;

import org.hibernate.Session;

import com.project.rest.dao.InventoryDAO;
import com.project.rest.pojo.Inventory;
import com.project.rest.sessionFactory.HibernateSessionFactory;

/**
 * @author naveenraj.devaraj
 *
 */
public class InventoryManager extends HibernateSessionFactory {
    HibernateSessionFactory hibernateSessionFactory = HibernateSessionFactory.getInstance();

    public void addOrUpdateInventory(Inventory inventory) {
	Session session = null;
	try {
	    InventoryDAO inventoryDAO = new InventoryDAO();
	    session = hibernateSessionFactory.openSession();
	    inventoryDAO.addInventory(session, inventory);

	} catch (Exception e) {
	    throw e;
	} finally {
	    hibernateSessionFactory.closeSession(session);
	}
    }

    public List<Inventory> fetchAll() {
	Session session = null;
	List<Inventory> inventories = null;
	try {
	    InventoryDAO hibernateDAO = new InventoryDAO();
	    session = hibernateSessionFactory.openSession();
	    inventories = hibernateDAO.fetchAll(session);

	} catch (Exception e) {
	    throw e;
	} finally {
	    hibernateSessionFactory.closeSession(session);
	}
	return inventories;
    }
    
    
    public Inventory fetchById(int id) {
   	Session session = null;
   	Inventory inventory = null;
   	try {
   	    InventoryDAO hibernateDAO = new InventoryDAO();
   	    session = hibernateSessionFactory.openSession();
   	    inventory = hibernateDAO.fetchById(session, id);

   	} catch (Exception e) {
   	    throw e;
   	} finally {
   	    hibernateSessionFactory.closeSession(session);
   	}
   	return inventory;
       }
    
    public boolean deleteById(int id) {
   	Session session = null;
   
   	try {
   	    InventoryDAO hibernateDAO = new InventoryDAO();
   	    session = hibernateSessionFactory.openSession();
   	    return hibernateDAO.deleteById(session, id);
   	} catch (Exception e) {
   	    throw e;
   	} finally {
   	    hibernateSessionFactory.closeSession(session);
   	}
       }

}
