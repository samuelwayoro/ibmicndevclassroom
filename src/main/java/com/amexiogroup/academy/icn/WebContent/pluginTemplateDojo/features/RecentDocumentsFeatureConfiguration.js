define([
	"dojo/_base/declare",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/widget/admin/PluginConfigurationPane",
	"dojo/text!./templates/RecentDocumentsFeatureConfiguration.html"],
	function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, PluginConfigurationPane, template) {

		return declare("PluginTemplateDojo.ConfigurationPane", [PluginConfigurationPane, _TemplatedMixin,
			_WidgetsInTemplateMixin], {
				
			templateString: template,
			widgetsInTemplate: true,

			constructor: function() {
				this.inherited(arguments);
			},
			
			load: function() {
				
				console.log("debut de la fonction callback de RecentDocumentsFeatureConfiguration");
				
			},

			//a traiter plus tard ...
			validate: function() {
				return true;
			},

			
			
		});
	})