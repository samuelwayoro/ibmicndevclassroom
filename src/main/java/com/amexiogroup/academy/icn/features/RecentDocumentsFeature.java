package com.amexiogroup.academy.icn.features;

import java.util.Locale;

import com.amexiogroup.academy.icn.utils.LocalizationUtils;
import com.ibm.ecm.extension.PluginFeature;

public class RecentDocumentsFeature extends PluginFeature {

	@Override
	public String getContentClass() {
		return "pluginTemplateDojo.features.RecentDocumentsFeature";
	}

	
	@Override
	public String getConfigurationDijitClass() {
		return "pluginTemplateDojo.features.RecentDocumentsFeatureConfiguration";
	}
	
	@Override
	public String getDescription(Locale locale) {
		return "Accéder aux documents récemment ajoutés dans la GED";
	}

	@Override
	public String getFeatureIconTooltipText(Locale arg0) {
		return "Permet d'accéder aux documents récemment mis dans la GED";
	}

	@Override
	public String getIconUrl() {
		return "recentDocsIcon";
	}

	@Override
	public String getId() {
		return "RecentDocumentsFeature";
	}

	@Override
	public String getName(Locale locale) {
		return LocalizationUtils.getMessage(locale, "features.recentDocumentsFeature.name");
	}

	


	//deprecié
	@Override
	public String getPopupWindowClass() {
		// TODO Auto-generated method stub
		return null;
	}


	//deprecié
	@Override
	public String getPopupWindowTooltipText(Locale arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isPreLoad() {
		return false;
	}

}
