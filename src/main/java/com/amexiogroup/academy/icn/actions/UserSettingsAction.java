package com.amexiogroup.academy.icn.actions;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;

public class UserSettingsAction extends PluginAction {

	@Override
	public String getActionModelClass() { 
		return "pluginTemplateDojo.actions.UserSettingsAction";
	}

	@Override
	public String getActionFunction() {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public String getIcon() {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return "UserSettingsAction";
	}

	@Override
	public String getName(Locale arg0) {
		// TODO Auto-generated method stub
		return "User Settings";
	}

	@Override
	public String getPrivilege() {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public String getServerTypes() {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public boolean isMultiDoc() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isGlobal() {// bizarre méthode non implémentée
		return true;
	}

}
