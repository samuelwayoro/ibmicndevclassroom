define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/json",
	"dojo/on",//UTIL POUR ECOUTER LA SAISIE DU USER DANS LE FILTRE
	"ecm/widget/layout/_LaunchBarPane",
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/RecentDocumentsFeature.html",
	"dojo/i18n!../nls/pluginMessages",

	// Modules pour le ContentList
	"ecm/widget/listView/gridModules/RowContextMenu",
	"ecm/widget/listView/gridModules/DndFromDesktopAddDoc",

	// Modules graphiques
	"ecm/widget/listView/modules/ViewDetail",
	"ecm/widget/listView/modules/ViewMagazine",
	"ecm/widget/listView/modules/DocInfo",
	"ecm/widget/listView/modules/Bar",
	"ecm/widget/listView/modules/Toolbar"
],
	function(
		declare, lang, JSON, on, _LaunchBarPane, _TemplatedMixin, template,
		nlsMessages, RowContextMenu, DndFromDesktopAddDoc, ViewDetail, ViewMagazine,
		DocInfo, Bar, Toolbar
	) {
		return declare("pluginTemplateDojo.features.RecentDocumentsFeature", [_LaunchBarPane, _TemplatedMixin], {

			templateString: template,
			nlsMessages: null,

			getConfigurationDijit: function() {
				return new RecentDocumentsFeatureConfiguration();
			},

			constructor: function() {
				console.debug("Constructeur exécuté.");
				this.nlsMessages = nlsMessages;
				this.templateString = lang.replace(this.templateString, this.nlsMessages);
			},

			postCreate: function() {
				console.debug("Début postCreate.");
				this.inherited(arguments);

				this.recentDocuments.setContentListModules(this._getContentListModules());
				this.recentDocuments.setGridExtensionModules(this._getGridExtensionModules());

				// Attacher l'événement de filtre sur le champ input
				this._setupFilterListener();

				console.debug("Fin postCreate.");
			},

			loadContent: function(filterValue) {
				let days = 7;
				let configurationString = {};

				if (this.feature) {
					configurationString = JSON.parse(this.feature.pluginConfiguration);
					days = configurationString.days;
				}

				//console.log("Nombre de jours utilisé pour la requête :", days);

				let query = `SELECT * FROM Document WHERE DateCreated > Now() - TimeSpan(${days},'Days')`;

				// Appliquer le filtre si du texte est saisi
				if (filterValue && filterValue.length > 0) {
					query += ` AND DocumentTitle LIKE '%${filterValue}%'`;
				}

				query += " ORDER BY DateCreated Desc";

				const searchQuery = new ecm.model.SearchQuery({
					repository: ecm.model.desktop.repositories[0],
					query: query,
					pageSize: 200,
					resultsDisplay: {
						columns: ["DocumentTitle", "DateCreated", "Creator", "ContentSize", "LastModifier"],
						sortBy: "DateCreated",
						sortAsc: false
					}
				});

				searchQuery.search(
					dojo.hitch(this, function(resultSet) {
						//console.info("Documents trouvés :", resultSet);
						this.recentDocuments.setResultSet(resultSet);
					}),
					null, null, null,
					dojo.hitch(this, function(error) {
						console.error("Erreur de recherche :", error);
					})
				);
			},

			_setupFilterListener: function() {
				console.debug("debut de la méthode _setupFilterListener");
				if (this.filterInput) {
					console.debug("presence d'une saisie...", this.filterInput.get("value"));
					on(this.filterInput, "keyup", dojo.hitch(this, function() {
						console.debug("DONNEE SAISIE ", this.filterInput.get("value"));
						let filterText = this.filterInput.get("value");
						console.log("Filtrage avec :", filterText);
						this.loadContent(filterText);
					}));
				}
				console.debug("debut de la méthode _setupFilterListener");
			},

			_getContentListModules: function() {
				const modules = [];

				modules.push({
					moduleClass: DocInfo,
					selectAutoOpen: true,
					showSystemProps: false
				});

				const viewModules = [ViewDetail, ViewMagazine];

				modules.push({
					moduleClass: Bar,
					top: [[[
						{ moduleClasses: viewModules, "className": "BarViewModules" },
						{ moduleClass: Toolbar }
					]]],
					bottom: [[]]
				});

				return modules;
			},

			_getGridExtensionModules: function() {
				return [RowContextMenu, DndFromDesktopAddDoc];
			}
		});
	});
