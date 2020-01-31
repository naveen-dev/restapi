package com.project.rest.manager;

import java.util.List;

import org.hibernate.Session;

import com.project.rest.dao.OrderDAO;
import com.project.rest.pojo.Inventory;
import com.project.rest.pojo.Order;
import com.project.rest.sessionFactory.HibernateSessionFactory;

/**
 * @author naveenraj.devaraj
 *
 */
public class OrderManager extends HibernateSessionFactory {
    HibernateSessionFactory hibernateSessionFactory = HibernateSessionFactory.getInstance();

    public void addOrUpdateOrder(Order order) {
	Session session = null;
	try {
	    OrderDAO orderDAO = new OrderDAO();
	    session = hibernateSessionFactory.openSession();
	    orderDAO.addOrder(session, order);
	} catch (Exception e) {
	    throw e;
	} finally {
	    hibernateSessionFactory.closeSession(session);
	}
    }

    public List<Order> fetchAll() {
	Session session = null;
	List<Order> orders = null;
	try {
	    OrderDAO orderDao = new OrderDAO();
	    session = hibernateSessionFactory.openSession();
	    orders = orderDao.fetchAll(session);
	} catch (Exception e) {
	    throw e;
	} finally {
	    hibernateSessionFactory.closeSession(session);
	}
	return orders;
    }

    public Order fetchById(int id) {
	Session session = null;
	Order order = null;
	try {
	    OrderDAO orderDAO = new OrderDAO();
	    session = hibernateSessionFactory.openSession();
	    order = orderDAO.fetchById(session, id);

	} catch (Exception e) {
	    throw e;
	} finally {
	    hibernateSessionFactory.closeSession(session);
	}
	return order;
    }

    public boolean deleteById(int id) {
	Session session = null;
	try {
	    OrderDAO orderDAO = new OrderDAO();
	    Order order = new OrderManager().fetchById(id);
	    session = hibernateSessionFactory.openSession();
	    if(orderDAO.deleteById(session, id)) {
	    InventoryManager inventoryManager = new InventoryManager();
	    Inventory inventory = order.getInventory();
	    inventory.setQuantity(inventory.getQuantity() + order.getQuantity());
	    inventoryManager.addOrUpdateInventory(inventory);
	    return true;
	    }
	} catch (Exception e) {
	    throw e;
	} finally {
	    hibernateSessionFactory.closeSession(session);
	}
	return false;
    }
}
