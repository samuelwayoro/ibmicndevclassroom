package com.amexiogroup.academy.icn.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.ibm.ecm.extension.PluginLogger;

public class PropertiesReader implements AutoCloseable {
    /**
     * Properties managed by the reader
     */
    private Properties properties;

    private static final PluginLogger LOGGER = new PluginLogger(Constantes.PLUGIN_ID);

    /**
     * Reads the properties file .
     *
     * @param propertyFileName the name of the property file to read
     * @throws IOException if the file is not found or if there is a reading problem.
     */
    public PropertiesReader(String propertyFileName) {
        try {
            InputStream is = getClass().getClassLoader()
                    .getResourceAsStream(propertyFileName);
            this.properties = new Properties();
            this.properties.load(is);
        } catch (IOException e) {
            final String methodName = "PropertiesReader";
            PropertiesReader.LOGGER.logWarning(PropertiesReader.class, methodName, e.getMessage());
        } catch (Exception e) {
            final String methodName = "PropertiesReader";
            PropertiesReader.LOGGER.logWarning(PropertiesReader.class, methodName, e.getMessage());
        }
    }

    /**
     * Gets the property with the given name from the property file.
     *
     * @param propertyName the name of the property to read
     * @return the property with the given name
     */
    public String getProperty(String propertyName) {
        return this.properties.getProperty(propertyName);
    }

    @Override
    public void close() throws Exception {
        final String methodName = "PropertiesReader";
        PropertiesReader.LOGGER.logWarning(PropertiesReader.class, methodName, "closed");
    }
}
