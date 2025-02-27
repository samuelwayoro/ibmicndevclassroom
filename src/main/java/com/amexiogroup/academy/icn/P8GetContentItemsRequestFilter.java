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
		return new String[] {"/p8/getContentItems"};
	}
	

	/**
	 * method en charge d'alterer la reponse JSON preparee par ICN
	 */
	@Override
	public JSONObject filter(PluginServiceCallbacks callbacks, HttpServletRequest request, JSONArtifact jsonRequest) throws Exception {
		
		String methodName = "filter";
		PluginLogger logger = callbacks.getLogger(); 
		logger.logEntry(this, methodName, request);
		
		//
		final String desktop = request.getParameter("desktop");
		final String repository = request.getParameter("repositoryId");
		final String docid = request.getParameter("docid");
		
		//recup de la config du plugin 
		final String configurationString = callbacks.loadConfiguration();
		//verif du contenu de la config saisie 
		logger.logDebug(this, methodName, request, "contenu de config"+configurationString.toString());
		
		if (configurationString !=null && !configurationString.isEmpty()) {
			final JSONObject configJSON = JSONObject.parse(configurationString);
			final String desktops = (String) configJSON.get("desktops");
			
			if("Demo".equals(repository) && desktops.equals(desktop) && "/".equals(docid)) {
				//logger.logDebug(this, methodName, request,"traitements applicables !!!");
				
				//traitement a effectuer 
				PluginRequestUtil.setRequestParameter(request,"docid","Folder,{41732A1E-A113-4982-B145-161A0AFC25EF},{5023888A-0000-C512-9D2A-FEFAF83E599B}");
				
				
			}
			
		}
		
		
		
		return null;
	}



}
