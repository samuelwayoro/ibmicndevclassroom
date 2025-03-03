define([
	"dojo/_base/declare",
	"ecm/model/Action"
],
	function(declare, Action) {

		return declare("pluginTemplateDojo.actions.UserSettingsAction",
			[Action], {


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

				console.log("***Debut de la performAction method***")

				//ouverture d'une pop up de saisie de preferences
				const dialog = new ecm.widget.dialog.BaseDialog();

				dialog.setTitle(ecm.messages.admin_configuration_parameters);//titre du pop-up
				dialog.setIntroText("You can define your own personal setting");
				dialog.setSize("400px", "400px");
				dialog.setExpandable(false);

				dialog.addButton(ecm.messages.save, dojo.hitch(this, this.onSave), false, false);

				dialog.show();
			}

		});
	});
