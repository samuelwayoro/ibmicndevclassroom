package com.amexiogroup.academy.icn;

import javax.servlet.http.HttpServletRequest;

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

		final String desktop = request.getParameter("desktop");

		final String repository = request.getParameter("repositoryId");

		final String docid = request.getParameter("docid");

		// Vérifier si l'utilisateur a défini une préférence personnelle

		final String userPreferences = callbacks.loadUserConfiguration("userPreferences");

		String substitutionFolder = null;

		if (userPreferences != null && !userPreferences.isEmpty()) {

			JSONObject userPreferencesJSON = JSONObject.parse(userPreferences);

			substitutionFolder = (String) userPreferencesJSON.get("substitutionFolder");

			logger.logDebug(this, methodName, request, "Dossier utilisateur trouvé : " + substitutionFolder);

		}

		// Si l'utilisateur n'a pas de préférence, utiliser la configuration
		// administrateur

		if (userPreferences == null || userPreferences.isEmpty()) {

			final String configurationString = callbacks.loadConfiguration();

			if (configurationString != null && !configurationString.isEmpty()) {

				JSONObject configJSON = JSONObject.parse(configurationString);

				substitutionFolder = (String) configJSON.get("substitutionPath");

				logger.logDebug(this, methodName, request,
						" Aucune préférence utilisateur, utilisation du dossier admin : " + substitutionFolder);

			}

		}

		// Appliquer le dossier de substitution

		if (substitutionFolder != null && !substitutionFolder.isEmpty()) {

			logger.logDebug(this, methodName, request, " Redirection vers le dossier : " + substitutionFolder);

			PluginRequestUtil.setRequestParameter(request, "docid", substitutionFolder);

			// new conditions form

			if ("/".equals(substitutionFolder)) {

				logger.logDebug(this, methodName, request, " ---- ON RESTE SUR LA RACINE --- !!!");

			} else if ("Test Documents".equals(substitutionFolder)) {

				logger.logDebug(this, methodName, request, " ---- DANS LE DOSSIER TEST --- !!!");

				PluginRequestUtil.setRequestParameter(request, "docid",
						"Folder,{41732A1E-A113-4982-B145-161A0AFC25EF},{5023888A-0000-C512-9D2A-FEFAF83E599B}");

			} else if ("AmeXio".equals(substitutionFolder)) {

				logger.logDebug(this, methodName, request, " ---- DANS LE DOSSIER AMEXIO --- !!!");

				PluginRequestUtil.setRequestParameter(request, "docid",
						"Folder,{41732A1E-A113-4982-B145-161A0AFC25EF},{9023888A-0000-CC1F-A318-C0CE9E1A58A2}");

			}

		} else {

			logger.logDebug(this, methodName, request,
					"Aucun dossier de substitution trouvé. Affichage du dossier racine.");

		}

		logger.logExit(this, methodName, request);

		return null;

	}

}
