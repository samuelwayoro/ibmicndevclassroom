package com.amexiogroup.academy.icn;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONObject;

public class P8GetContentItemsResponseFilter extends PluginResponseFilter {

	@Override
	public String[] getFilteredServices() {
		return new String[] { "/p8/getContentItems" };
	}

	@Override
	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request,
			JSONObject jsonResponse) throws Exception {

		String methodName = "filter";
		PluginLogger logger = callbacks.getLogger();
		logger.logEntry(this, methodName, request);

		final String errorDetected = request.getParameter("substitutionFolderError");

		if ("true".equals(errorDetected)) {
			jsonResponse.put("substitutionFolderError", true);
		}

		logger.logExit(this, methodName, request);
	}

}
