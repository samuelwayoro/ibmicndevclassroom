package com.amexiogroup.academy.icn;

import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

import com.amexiogroup.academy.icn.utils.FileNetUtils;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginRequestFilter;
import com.ibm.ecm.extension.PluginRequestUtil;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArtifact;
import com.ibm.json.java.JSONObject;

public class P8GetContentItemsRequestFilter extends PluginRequestFilter {

	@Override
	public String[] getFilteredServices() {
		return new String[] { "/p8/getContentItems" };
	}

	/**
	 * method en charge d'alterer la reponse JSON preparee par ICN
	 */
	@Override
	public JSONObject filter(PluginServiceCallbacks callbacks, HttpServletRequest request, JSONArtifact jsonRequest)
			throws Exception {

		String methodName = "filter";

		PluginLogger logger = callbacks.getLogger();

		logger.logEntry(this, methodName, request);

		String substitutionFolder = null;

		final String desktop = request.getParameter("desktop");

		final String repository = request.getParameter("repositoryId");

		final String docid = request.getParameter("docid");

		final String userPreferences = callbacks.loadUserConfiguration("userPreferences");
		logger.logDebug(this, methodName, request,
				"CONTENU DE UserPreferences APRES CHARGEMENT DE callbacks.loadUserConfiguration(userPreferences) : "
						+ userPreferences.toString());

		if (userPreferences != null && !userPreferences.isEmpty()) {// with UserPreferences
			logger.logDebug(this, methodName, request, "PRESENCE DE UserPreferences");
			JSONObject userPreferencesJSON = JSONObject.parse(userPreferences);
			logger.logDebug(this, methodName, request,
					"CONTENU DE userPreferencesJSON : " + userPreferencesJSON.toString());
			substitutionFolder = (String) userPreferencesJSON.get("substitutionFolder");
			logger.logDebug(this, methodName, request, "substitutionFolder RETENU : " + substitutionFolder);

		}

		if (substitutionFolder == null || substitutionFolder.isEmpty()) {// No userPreferences
			logger.logDebug(this, methodName, request, "PAS DE UserPreferences");
			final String configurationString = callbacks.loadConfiguration();
			if (configurationString != null && !configurationString.isEmpty()) {
				JSONObject configJSON = JSONObject.parse(configurationString);
				logger.logDebug(this, methodName, request,
						"CONTENU DE configurationString DONT substitutionPath a UTILISER: " + configurationString);
				substitutionFolder = (String) configJSON.get("substitutionPath");
				logger.logDebug(this, methodName, request, "substitutionFolder RETENU : " + substitutionFolder);

			}

		}

		if (substitutionFolder != null && !substitutionFolder.isEmpty()) {

			logger.logDebug(this, methodName, request, "Redirection vers le dossier : " + substitutionFolder);

			PluginRequestUtil.setRequestParameter(request, "docid", substitutionFolder);

			logger.logDebug(this, methodName, request, "Valeur de substitutionFolder : " + substitutionFolder);

			FileNetUtils fileNetUtils = new FileNetUtils(callbacks, request);

			logger.logDebug(this, methodName, "Chemin de redirection " + substitutionFolder + " trouvee ? : "
					+ (fileNetUtils.getFolder(repository, substitutionFolder) != null));

			if (fileNetUtils.getFolder(repository, substitutionFolder) != null) {
				if (("/Test Documents").equals(substitutionFolder)) {
					logger.logDebug(this, methodName, "redirection vers le chemin /Test Documents");
					PluginRequestUtil.setRequestParameter(request, "docid", "Test Documents");
				} else if (("/AmeXio").equals(substitutionFolder)) {
					logger.logDebug(this, methodName, "redirection vers le chemin /AmeXio");
					PluginRequestUtil.setRequestParameter(request, "docid", "AmeXio");
				} else if (("/SAM2").equals(substitutionFolder)) {
					logger.logDebug(this, methodName, "redirection vers le chemin /SAM2");
					PluginRequestUtil.setRequestParameter(request, "docid", "SAM2");
				} else {
					logger.logDebug(this, methodName, "redirection vers le chemin racine /");

				}
			} else {
				logger.logDebug(this, methodName, request, "Dossier de substitution introuvable");
				PluginRequestUtil.setRequestParameter(request, "docid", "/");
				PluginRequestUtil.setRequestParameter(request, "substitutionFolderError", "true");
			}

		}

		logger.logExit(this, methodName, request);

		return null;

	}

}