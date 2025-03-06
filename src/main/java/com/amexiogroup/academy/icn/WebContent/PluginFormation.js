require(["dojo/_base/declare",
	"dojo/_base/lang", "dojo/aspect"],
	function(declare, lang, aspect) {


		/**
		 * Utilisation d'un aspect pour créer une fenetre de dialogue affichant un msg d'erreur au client 
		 * lorsuqu'il y a une erreur dans la reponse http renvoyée par le filtre P8
		 * Ce filtre est attachée ici a la classe _retrieveItemCompleted de sorte a déclanchée notre méthode anonyme function(response){...} en dessous 
		 * avant l'instance de _retrie...
		 */
		aspect.before(
			ecm.model.Repository.prototype,
			"_retrieveItemCompleted",
			function(response) {
				debugger;
				if (response?.substitutionFolderError) {
					const warningDialog = new ecm.widget.dialog.WarningDialog();
					warningDialog.setTitle("Erreur de configuration");
					warningDialog.show();
				}
			},
			true);

	});
