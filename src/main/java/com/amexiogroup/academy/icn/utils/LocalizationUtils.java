package com.amexiogroup.academy.icn.utils;

import com.ibm.ecm.extension.PluginLogger;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

/**
 * Utility class providing message location management services for Java code.
 * Created by AMEXIO on 01/09/2016.
 */
public class LocalizationUtils {

    private static final PluginLogger LOGGER = new PluginLogger(Constantes.PLUGIN_ID);

    private static final String LABELS = "nls.labels";

    private LocalizationUtils() {
    }

    private static ResourceBundle getResourceBundle(final Locale locale) {
        final ClassLoader loader = LocalizationUtils.class.getClassLoader();
        return ResourceBundle.getBundle(LocalizationUtils.LABELS, locale, loader);
    }

    public static String getMessage(final Locale locale, final String messageKey) {
        final ResourceBundle resourceBundle = LocalizationUtils.getResourceBundle(locale);
        String nlsMessage = null;
        if(resourceBundle!=null) {
            try {
                nlsMessage = resourceBundle.getString(messageKey);
            } catch (final MissingResourceException ignored) {
            	 //voluntarily do nothing
                nlsMessage = "";
                final String methodName = "getMessage";
                LocalizationUtils.LOGGER.logWarning(LocalizationUtils.class, methodName,
                    String.format("Clé de localisation %s non trouvée pour la locale %s", messageKey,
                        locale.getDisplayCountry()));
            }
        }
        if(nlsMessage == null || nlsMessage.isEmpty()) {
            nlsMessage = messageKey;
        }
        return nlsMessage;
    }
}
