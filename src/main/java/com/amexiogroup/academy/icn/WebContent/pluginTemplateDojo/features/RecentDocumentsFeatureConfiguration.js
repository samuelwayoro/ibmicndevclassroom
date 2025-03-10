define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",//pk
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./templates/RecentDocumentsFeatureConfiguration.html",
	//"dijit/form/NumberTextBox"
	],
	function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template,// NumberTextBox
	) {
		return declare("pluginTemplateDojo.features.RecentDocumentsFeatureConfiguration", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
			{
				templateString: template,
				widgetsInTemplate: true,


				postCreate: function() {
					console.debug("creation ok du panneau d'admin du feature")
				}


			});
	})