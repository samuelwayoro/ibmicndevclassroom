define([
	"dojo/_base/declare",
	"dojo/json",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/widget/admin/PluginConfigurationPane",
	"dojo/text!./templates/RecentDocumentsFeatureConfiguration.html"],
	function(declare, JSON, _TemplatedMixin, _WidgetsInTemplateMixin, PluginConfigurationPane, template) {

		return declare("PluginTemplateDojo.ConfigurationPane", [PluginConfigurationPane, _TemplatedMixin,
			_WidgetsInTemplateMixin], {

			templateString: template,
			widgetsInTemplate: true,

			constructor: function() {
				this.inherited(arguments);
			},

			load: function() {
				console.log("debut du chargement des donnees sauvegardee");

				if (this.configurationString == null) {
					console.debug("il y aucune valeur de nombre de jours sauvegardee , on a par defaut alors 7 jours ")
				} else {
					console.debug("Configuration chargée dans le panneau d'admin :", this.configurationString);//affichage de l'objet json {"days":10}

				}

				let configJSON = {};

				//verif de la présence de la config stockée 
				if (this.configurationString) {
					try {
						configJSON = JSON.parse(this.configurationString);
					} catch (e) {
						console.error("Erreur lors de la conversion JSON de la config du nombre de jours stockée ", e);
						configJSON = {};
					}
				}

				this.days.set("value", configJSON.days || 7);//on met le nbre de jours par défaut à 7 

			},

			validate: function() {
				return true;
			},


			_onFieldChange: function() {
				const configJSON = {
					days: this.days.get("value")
				};
				this.configurationString = JSON.stringify(configJSON); //convertit l'objet js configJSON en objet json configurationString
				console.debug("nombre saisi " + this.configurationString)
				this.onSaveNeeded(true);
			}



		});
	})