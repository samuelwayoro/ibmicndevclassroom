define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/json",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/widget/admin/PluginConfigurationPane",
	"dojo/text!./templates/ConfigurationPane.html",
	"dojo/i18n!./nls/pluginMessages"],
	function(declare, lang, JSON, _TemplatedMixin, _WidgetsInTemplateMixin, PluginConfigurationPane, template, nlsMessages) {

		return declare("PluginTemplateDojo.ConfigurationPane", [PluginConfigurationPane, _TemplatedMixin,
			_WidgetsInTemplateMixin], {

			templateString: template,
			widgetsInTemplate: true,
			nlsMessages: null,

			constructor: function() {
				this.inherited(arguments);
				this.nlsMessages = nlsMessages;
				this.templateString = lang.replace(this.templateString, this.nlsMessages);
			},

			load: function(callback) {
				
				console.log("debut de la fonction callback");
				
				const configJSON = JSON.parse(this.configurationString);
				
				if (configJSON?.desktops) {
					console.log("--- recup des saisies ---")
					
					this.desktops.set("value", configJSON.desktops),
						this.repositories.set("value", configJSON.repositories),
						this.substitutionPath.set("value", configJSON.substitutionPath);
						
					console.log("--- desktops  " + configJSON.desktops + "---repositories  " + configJSON.repositories + "--- substitutionPath" + configJSON.substitutionPath)
				}
			},

			//a traiter plus tard ...
			validate: function() {
				return true;
			},

			//evenement s'executant
			_onFieldChange: function() {
				const configJSON = {
					desktops: this.desktops.get("value"),
					repositories: this.repositories.get("value"),
					substitutionPath: this.substitutionPath.get("value")

				};
				this.configurationString = JSON.stringify(configJSON);

				this.onSaveNeeded(true);
			}
		});
	});
