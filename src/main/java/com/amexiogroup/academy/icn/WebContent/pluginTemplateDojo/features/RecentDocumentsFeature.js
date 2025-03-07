define([
	"dojo/_base/declare",
	"dojo/_base/lang",
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
],
	function(declare, lang, _LaunchBarPane, _TemplatedMixin, template, nlsMessages, RowContextMenu, DndFromDesktopAddDoc, ViewDetail, ViewMagazine, DocInfo, Bar, Toolbar) {
		return declare("pluginTemplateDojo.features.RecentDocumentsFeature", [_LaunchBarPane, _TemplatedMixin], {

			templateString: template,
			nlsMessages: null,

			constructor: function() {
				console.debug("dans le contructor");
				this.nlsMessages = nlsMessages;
				this.templateString = lang.replace(this.templateString, this.nlsMessages);

				console.debug("fin du constructor");

			},

			postCreate: function() {
				console.debug("dans postCreate");
				this.recentDocuments.setContentListModules(this._getContentListModules());
				this.recentDocuments.setGridExtensionModules(this._getGridExtensionModules());
			},

			loadContent: function() {
				console.debug("dans loadContent");

				//au chargement rechercher les documents rajoutés il y a moins de 7 jours

				const searchQuery = new ecm.model.SearchQuery({
					//base de données :  premier des referentiel associé a mon mon bureau courant 
					repository: ecm.model.desktop.repositories[0],
					//requete : ce qu'on voudrai recupérer dans la bd (avec un trie order by exécuté coté serveur)
					"query": "SELECT * FROM Document WHERE DateCreated > Now() - TimeSpan(7,'Days') ORDER BY DateCreated Desc",
					//pagination
					pageSize: 200,
					resultsDisplay: {
						columns: ["DocumentTitle", "DateCreated", "Creator", "ContentSize", "LastModifier"],
						sortBy: "DateCreated",// un trie executé coté client
						sortAsc: false,
					}
				});

				//execution de la requete , et recup du resultat (de type ResultSet) via une methode callback
				searchQuery.search(
					//succes callback : afficher les resultat sur le contenList
					dojo.hitch(this, function(resultSet) {
						console.info("resultats de la recherche", resultSet);
						this.recentDocuments.setResultSet(resultSet);
					}),
					null,
					null,
					null,
					//error callback
					dojo.hitch(this, function(error) {
						console.error("erreur rencontré pendant la recherche des données", error)
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
						/*
						{
							moduleClass: FilterDataServer,
							"className": "BarFilterData"
						},*/
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