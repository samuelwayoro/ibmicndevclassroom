require(["dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/i18n!../nls/pluginMessages"],
	function(declare, lang, aspect, i18n) {

		// Intercepter _retrieveItemCompleted pour afficher un warning
		aspect.before(
			ecm.model.Repository.prototype,
			"_retrieveItemCompleted",
			function(response) {
				if (response?.substitutionFolderError) {
					const warningDialog = new ecm.widget.dialog.WarningDialog({
						contentString: lang.replace(title, i18n)
					});
					var message = lang.replace(i18n.errorDialogueTitle, ["L'élément a été récupéré avec succès."]);

					warningDialog.setTitle(message);
					warningDialog.show();

				}
			},
			true);


	});
