package com.amexiogroup.academy.icn.utils;
/**
 * Utility class defining plugin constants
 */
public class Constantes {
    /**
     * Plugin identifier {@value}
     */
    // TODO - CHANGE ME
    public static final String PLUGIN_ID = "PluginFormation";

    /**
     * Plugin version {@value}
     */
    // TODO - CHANGE ME
    public static final String PLUGIN_VERSION = "1.0.0";

    /**
     * Plugin debug script file {@value}
     */
    // TODO - CHANGE ME
    public static final String PLUGIN_DEBUG_SCRIPT = "PluginFormation.js";

    /**
     * Plugin debug CSS file {@value}
     */
    // TODO - CHANGE ME
    public static final String PLUGIN_DEBUG_CSS = "PluginFormation.css";

    /**
     * Plugin Dojo Module name (root Dojo Modules directory name) {@value}
     */
    // TODO - CHANGE ME
    public static final String PLUGIN_DOJO_MODULE = "pluginTemplateDojo";

    /**
     * Plugin Dojo Configuration Class {@value}
     */
    // TODO - CHANGE ME
    public static final String PLUGIN_DOJO_CONFIGURATION_CLASS = "pluginTemplateDojo.ConfigurationPane";

    /**
     * Localization key for plugin name {@value}
     */
    public static final String PLUGIN_NAME_LOCALIZATION_KEY = "plugin.name";

    /**
     * Plugin copyright location key {@value}
     */
    public static final String PLUGIN_COPYRIGHT_LOCALIZATION_KEY = "plugin.copyright";

    // Private constants for USE_OPTIMIZED_RESOURCES calculation
    private static final PropertiesReader PROPERTIES_READER = new PropertiesReader("dojobuild.properties");
    private static final String optimizationProcess = PROPERTIES_READER.getProperty("optimizationProcess");

    /**
     * Indicates whether optimized resources Should be referenced {@value}
     */
    public static final boolean USE_OPTIMIZED_RESOURCES = optimizationProcess != null && (optimizationProcess.equals("true"));
}
