define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ecm/model/Action",
	"dojo/text!../templates/DialogueContent.html",
	"dojo/i18n!../nls/pluginMessages"],
	function(declare, lang, Action, dialogueContent, nlsMessages) {

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

				//ouverture d'une pop up de saisie de preferences
				const dialog = new ecm.widget.dialog.BaseDialog({
					//passer des infos a la construction du pou up 
					contentString: lang.replace(dialogueContent, nlsMessages)
				});

				//get pour recup si il ya une saisie prealable et l'afficher 
				ecm.model.Request.invokePluginService(
					"PluginFormation",//PluginFormation
					"UserPreferencesService",
					{
						requestParams: {
							mode: "get",

						},
						requestCompleteCallback: dojo.hitch(this, function(response) {
							console.log(response);


							dialog.setTitle(ecm.messages.admin_configuration_parameters);//titre du pop-up
							dialog.setIntroText("You can define your own personal setting");
							dialog.setSize("400px", "400px");
							dialog.setExpandable(false);
							dialog.addButton(ecm.messages.save, dojo.hitch(this, this.onSave, dialog), false, false);
							if(response?.substitutionFolder){
								dialog.substitutionPath.set("value", response.substitutionFolder);
							}

							dialog.show();
						}),
						requestFailedCallback: function(error) {
							console.log("Erreur lors de l'execution du service", error);
						}
					}
				);

			},
			onSave: function(dialog) {
				console.log("btn cliqué !!!")
				//affichage des préférences pré enregistrés dans la pop up 
				ecm.model.Request.invokePluginService(
					"PluginFormation",//PluginFormation
					"UserPreferencesService",
					{
						requestParams: {
							mode: "set",
							substitutionFolder: dialog.substitutionPath.get("value")
						},
						requestCompleteCallback: dojo.hitch(this, function(response) {
							console.log(response);
							dialog.substitutionPath.destroy();
							dialog.destroy();// ou .hide()
						}),
						requestFailedCallback: function(error) {
							console.log("Erreur lors de l'execution du service", error);
						}
					}
				);
			}

		});
	});
