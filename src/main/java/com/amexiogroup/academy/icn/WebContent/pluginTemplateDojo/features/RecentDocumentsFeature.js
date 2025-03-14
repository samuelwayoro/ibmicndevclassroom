define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/json",
	"ecm/widget/layout/_LaunchBarPane",
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/RecentDocumentsFeature.html",
	"dojo/i18n!../nls/pluginMessages",

	//Modules du comportement de contentList
	"ecm/widget/listView/gridModules/RowContextMenu",
	"ecm/widget/listView/gridModules/DndFromDesktopAddDoc", //pour le drag and drop

	//Module graphiques 
	"ecm/widget/listView/modules/ViewDetail",
	"ecm/widget/listView/modules/ViewMagazine",
	"ecm/widget/listView/modules/DocInfo",
	"ecm/widget/listView/modules/Bar",
	"ecm/widget/listView/modules/Toolbar",
	"ecm/widget/listView/modules/FilterData",//import du filtre
],
	function(declare, lang, JSON, _LaunchBarPane, _TemplatedMixin, template, nlsMessages, RowContextMenu, DndFromDesktopAddDoc, ViewDetail, ViewMagazine, DocInfo, Bar, Toolbar, FilterData) {
		return declare("pluginTemplateDojo.features.RecentDocumentsFeature", [_LaunchBarPane, _TemplatedMixin], {

			templateString: template,
			nlsMessages: null,

			//rattachement de la configuration du feature
			getConfigurationDijit: function() {
				return new RecentDocumentsFeatureConfiguration();
			},

			constructor: function() {
				console.debug("dans le contructor");
				this.nlsMessages = nlsMessages;
				this.templateString = lang.replace(this.templateString, this.nlsMessages);
				console.debug("fin du constructor");

			},

			postCreate: function() {
				console.debug("debut postCreate");
				this.inherited(arguments);
				this.recentDocuments.setContentListModules(this._getContentListModules());
				this.recentDocuments.setGridExtensionModules(this._getGridExtensionModules());
				console.debug("fin postCreate");

			},

			loadContent: function() {

				let days = 7; // Valeur par défaut
				let configurationString = {};

				if (this.feature) {
					//console.log("contenu de la configuration de l'administrateur dans l'objet this.feature.pluginConfiguration ", this.feature.pluginConfiguration);
					configurationString = JSON.parse(this.feature.pluginConfiguration);
					//console.log("apres conversion et passé a l'objet configurationString ", configurationString);
					days = configurationString.days;
					//console.log("nouvelle valeur de days ", days);

				}

				console.log("Nombre de jours utilisé pour la requête :", days);

				// Exécution de la requête SQL
				const searchQuery = new ecm.model.SearchQuery({
					repository: ecm.model.desktop.repositories[0],
					query: `SELECT * FROM Document WHERE DateCreated > Now() - TimeSpan(${days},'Days') ORDER BY DateCreated Desc`,
					pageSize: 200,
					resultsDisplay: {
						columns: ["DocumentTitle", "DateCreated", "Creator", "ContentSize", "LastModifier"],
						sortBy: "DateCreated",
						sortAsc: false
					}
				});

				// Exécution et affichage des résultats
				searchQuery.search(
					dojo.hitch(this, function(resultSet) {
						console.info("Documents récents trouvés :", resultSet);
						this.recentDocuments.setResultSet(resultSet);
					}),
					null,
					null,
					null,
					dojo.hitch(this, function(error) {
						console.error("Erreur de recherche :", error);
					})
				);

				this.needReset = false;
				this.isLoaded = true;
			},

			_getContentListModules: function() {


				const modules = [];

				modules.push({
					moduleClass: DocInfo,
					selectAutoOpen: true,
					showSystemProps: false
				});


				const viewModules = [];
				//mon content list vas m'afficher une vue detail et une vue magasine
				viewModules.push(ViewDetail);
				viewModules.push(ViewMagazine);


				modules.push({
					moduleClass: Bar,
					top: [[[
						//filtre a utiliser plutard
						{
							//moduleClass: FilterDataServer,
							moduleClass: FilterData,
							"className": "BarFilterData"
						},
						{
							moduleClasses: viewModules,
							"className": "BarViewModules"
						},
						{ moduleClass: Toolbar }

					]]],
					bottom: [[[
						//{ moduleClass: Toolbar } //barre d'outil plutot presentée en haut ici 
					]]]
				});


				return modules;

			},

			_getGridExtensionModules: function() {
				const modules = [];
				modules.push(RowContextMenu);
				modules.push(DndFromDesktopAddDoc);
				return modules;
			},

		});
	});