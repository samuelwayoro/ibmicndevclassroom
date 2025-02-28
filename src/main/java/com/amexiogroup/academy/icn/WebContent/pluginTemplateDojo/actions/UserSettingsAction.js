define([
	"dojo/_base/declare",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/model/Action",
	"dojo/text!./templates/UserSettingsAction.html"
],
	function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, Action, template) {

		return declare("PluginTemplateDojo.ConfigurationPane",
			[Action, _TemplatedMixin, _WidgetsInTemplateMixin], {


			canPerfomAction: function(repository, itemList, listType, teamspace, resultSet) {
				return true;
			},

			isEnabled: function(repository, listType, items, teamspace, resultSet) {
				return true;
			},

			isGlobalEnabled: function(resultSet, items, repository) {
				return true;
			},

			isGlobalVisible: function(resultSet, repository, repositoryTypes) {
				return true;
			},
			
			isVisible: function(repository, items, repositoryTypes, teamspace) {
				return true;
			},
			
			/**
			 * methode s'executant suite au clic sur le btn avec le procédé suivant : 
			 * 
			 */
			performAction: function(repository, itemList, callback, teamspace, resultSet, parameterMap) {

			}

		});
	});
