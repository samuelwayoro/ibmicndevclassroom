define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",//pk
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./templates/RecentDocumentsFeatureConfiguration.html",
	"ecm/widget/NumberTextBox",
	"dijit/Dialog",
	"dijit/form/Button",
],
	function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, NumberTextBox, Dialog, Button) {
		return declare("pluginTemplateDojo.features.RecentDocumentsFeatureConfiguration", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
			{
				templateString: template,
				dialog: null,

				postCreate: function() {
					this.inherited(arguments);
					this.saveButton.on("click", () => this._onSave());
					this.closeButton.on("click", () => this.dialog.hide());
					console.debug("creation ok du panneau d'admin du feature")
				},

				show: function() {
					if (!this.dialog) {
						this.dialog = new Dialog({
							title: "CONFIG DES DOCS",
							content: this.domNode,
							style: "width:300px;"
						});
						this.dialog.show();
					}
				},

				_onSave: function() {
					/*
					var config = this.save();
					console.log("Configuration sauvegardée:", config);
					this.dialog.hide();*/
					console.debug("Configuration sauvegardée:");
				},
			});
	})