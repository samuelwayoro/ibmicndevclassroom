define([
	"dojo/_base/declare",
	"ecm/widget/layout/_LaunchBarPane",
	"dojo/text!./templates/RecentDocumentsFeature.html"
],
	function(declare, _LaunchBarPane, template) {
		return declare("pluginTemplateDojo.features.RecentDocumentsFeature", [_LaunchBarPane], {
			templateString: template,
			widgetInTemplate: true,

			postCreate: function() {
				console.log("dans postCreate");
			},

			loadContent: function() {
				console.log("dans loadContent");


				this.needReset = false;
				this.isLoaded = true;
			},
		});
	});