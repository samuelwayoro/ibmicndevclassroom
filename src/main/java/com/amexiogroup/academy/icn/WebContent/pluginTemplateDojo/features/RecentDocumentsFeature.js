define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/json",
	"dojo/on",
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
	function(declare, lang, JSON, on, _LaunchBarPane, _TemplatedMixin, template, nlsMessages, RowContextMenu, DndFromDesktopAddDoc, ViewDetail, ViewMagazine, DocInfo, Bar, Toolbar, FilterData) {
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
				this._setupFilterListener();
				
				this.recentDocuments.onSetResultSet = lang.hitch(this, function(resultSet) {
					console.debug("onSetResultSet déclenché avec le resultSet mis à jour :", resultSet);
					// Ici vous pouvez ajouter du code additionnel, comme un re-render de la grille si nécessaire.
				});
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
						{
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

			/*
					_setupFilterListener: function() {
						filterModule = this.recentDocuments.getContentListModules("ecm.widget.listView.modules.FilterData");
						let theFilter = filterModule[1].top[0][0][0];
						if (theFilter) {
							//Module de filtre détecté Object { moduleClass: t(), className: "BarFilterData" }
							console.debug("Module de filtre détecté", theFilter);
							console.log("valeur testée : ", theFilter.moduleClass().name);// affiche filterData
			
			
						} else {
							console.log("le module n'a pas été détecté ")
						}
					},
		*/

			_setupFilterListener: function() {
				const filterModules = this.recentDocuments.getContentListModules("ecm.widget.listView.modules.FilterData");

				if (filterModules && filterModules.length > 0) {
					console.debug("Modules de filtre détectés :", filterModules);

					// Récupérer le premier module trouvé
					const filterModule = filterModules[0];

					// S'assurer que le module a bien une UI de filtre
					setTimeout(lang.hitch(this, function() {
						const searchInput = document.querySelector(".BarFilterData input");

						if (searchInput) {
							//console.debug("Champ de recherche détecté :", searchInput);

							// Ajout de l'écouteur d'événement "input"
							on(searchInput, "input", lang.hitch(this, function(event) {
								console.log("Texte saisi :", event.target.value);
								this._applyClientSideFilter(event.target.value);
							}));
						} else {
							console.warn("Impossible de détecter le champ de saisie du filtre.");
						}
					}), 1000); // Délai pour s'assurer que l'UI est bien rendue
				} else {
					console.warn("Aucun module de filtre détecté.");
				}
			},

			_applyClientSideFilter: function(filterText) {

				if (this.recentDocuments && this.recentDocuments.getResultSet()) {

					console.log(" contenu de this.recentDocuments.getResultSet() ", this.recentDocuments.getResultSet());

					let originalResultSet = this.recentDocuments.getResultSet();

					console.debug("repo du resultSet :", originalResultSet.repository, " columnNames ", originalResultSet.columnNames, " sortIndex  ", originalResultSet.sortIndex, " sortDirection ", originalResultSet.sortDirection);

					let allItems = originalResultSet.items || [];

					// Appliquer le filtre sur le titre du document
					const filteredItems = allItems.filter(item => {
						return item.attributes && item.attributes.DocumentTitle &&
							item.attributes.DocumentTitle.toLowerCase().includes(filterText.toLowerCase());
					});

					if (filteredItems.length === 0) {
						console.warn("Aucun document trouvé pour le filtre :", filterText);
					}

					let filteredResultSet = new ecm.model.ResultSet({
						repository: originalResultSet.repository, // Préserve le dépôt
						items: filteredItems, // Appliquer la nouvelle liste filtrée
						columnNames: originalResultSet.columnNames, // Garde les mêmes colonnes
						sortIndex: originalResultSet.sortIndex,
						sortDirection: originalResultSet.sortDirection,
					});

					originalResultSet.items = filteredItems;

					this.recentDocuments.setResultSet(originalResultSet);

				} else {
					console.warn("Aucun resultSet disponible, la liste de documents n'est pas encore chargée.");
				}
			},

		});
	});