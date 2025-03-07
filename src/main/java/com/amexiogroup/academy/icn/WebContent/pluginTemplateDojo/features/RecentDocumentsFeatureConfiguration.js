define([
	"dojo/_base/declare",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/widget/admin/PluginConfigurationPane",
	"dojo/text!./templates/RecentDocumentsFeatureConfiguration.html"],
	function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, PluginConfigurationPane, template) {
		return declare("pluginTemplateDojo.features.RecentDocumentsFeatureConfiguration", [PluginConfigurationPane], 
		{
			templateString:template,
			widgetsInTemplate:true
		});
	})