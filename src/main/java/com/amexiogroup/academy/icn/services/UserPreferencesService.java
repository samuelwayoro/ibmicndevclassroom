package com.amexiogroup.academy.icn.services;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.json.java.JSONObject;

public class UserPreferencesService extends PluginService {

	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		final String methodName = "execute";
		final PluginLogger logger = callbacks.getLogger();
		logger.logEntry(this, methodName, request);

		//
		final JSONResponse jsonResponse = new JSONResponse();
		final String mode = request.getParameter("mode");

		if ("set".equals(mode)) {
			// sauvegarde de préférences

			logger.logDebug(this, methodName, request,
					"**** AJOUT D'UN NOUVEAU CHEMIN DE SUBSTITUTION PAR L'UTILISATEUR ****");

			final String userSubstitutionFolder = request.getParameter("substitutionFolder");
			final JSONObject userPreferenceJSON = new JSONObject();
			userPreferenceJSON.put("substitutionFolder", userSubstitutionFolder);
			final String userPreferences = userPreferenceJSON.serialize();
			callbacks.saveUserConfiguration("userPreferences", userPreferences);

			logger.logDebug(this, methodName, request, "LE CHEMIN EST : " + userPreferences);

			// trace pour debogeur js
			jsonResponse.put("success", true);

		} else {
			// récuperation des préférences
			logger.logDebug(this, methodName, request, "**** RECUPERATION DU CHEMIN DE SUBSTITUTION DE L'UTILISATEUR EN COURS ****");

			final String userPreferences = callbacks.loadUserConfiguration("userPreferences");
			final JSONObject userPreferencesJSON = JSONObject.parse(userPreferences);
			final String userSubstitutionFolder = (String) userPreferencesJSON.get("substitutionFolder");
			jsonResponse.put("substitutionFolder", userSubstitutionFolder);
			
			logger.logDebug(this, methodName, request, "LE CHEMIN EST : " + userPreferences);
			
			jsonResponse.put("success", true);
		}

		PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, getId());
		logger.logExit(this, methodName, request);

	}

	@Override
	public String getId() {
		return "UserPreferencesService";
	}

}
