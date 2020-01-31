/**
 * 
 */
package com.project.rest.sessionFactory;

import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

/**
 * @author naveenraj.devaraj
 *
 */
public class HibernateSessionFactory {

    private static SessionFactory sessionFactory = null;
    private static ServiceRegistry serviceRegistry = null;
    static HibernateSessionFactory hibernateSessionFactory = null;

    private static SessionFactory configureSessionFactory() throws HibernateException {
	Configuration configuration = new Configuration();
	configuration.configure();
	Properties properties = configuration.getProperties();
	serviceRegistry = new ServiceRegistryBuilder().applySettings(properties).buildServiceRegistry();
	sessionFactory = configuration.buildSessionFactory(serviceRegistry);
	return sessionFactory;
    }

    protected static HibernateSessionFactory getInstance() {
	if (hibernateSessionFactory == null) {
	    synchronized (HibernateSessionFactory.class) {
		if (hibernateSessionFactory == null) {
		    hibernateSessionFactory = new HibernateSessionFactory();
		    sessionFactory = configureSessionFactory();
		}
	    }
	}
	return hibernateSessionFactory;
    }

    public Session openSession() {
	Session session = null;
	try {
	    session = sessionFactory.openSession();
	} catch (Exception e) {
	    throw e;
	}
	return session;
    }

    public void closeSession(Session session) {
	try {
	    if (session != null) {
		session.close();
	    }
	} catch (Exception e) {
	    throw e;
	}
    }
}
