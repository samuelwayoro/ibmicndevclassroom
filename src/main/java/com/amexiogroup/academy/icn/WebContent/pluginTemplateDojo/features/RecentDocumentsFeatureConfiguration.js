define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",//pk
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./templates/RecentDocumentsFeatureConfiguration.html",
	"ecm/widget/NumberTextBox",
	"dijit/Dialog",
],
	function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, NumberTextBox, Dialog) {
		return declare("pluginTemplateDojo.features.RecentDocumentsFeatureConfiguration", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
			{
				templateString: template,


				postCreate: function() {
					this.inherited(arguments);
					console.debug("creation ok du panneau d'admin du feature")
				},

				show: function() {
					this.startup();
					var dialog = new Dialog({
						title: "Configuration des documents récents",
						content: this.domNode,
						style: "width: 300px;"
					});
					dialog.show();
				},


			});
	})