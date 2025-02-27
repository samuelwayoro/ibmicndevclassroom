define([
        "dojo/_base/declare",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "ecm/widget/admin/PluginConfigurationPane",
        "dojo/text!./templates/ConfigurationPane.html"
    ],
    function (declare, _TemplatedMixin, _WidgetsInTemplateMixin, PluginConfigurationPane, template) {

        return declare("PluginTemplateDojo.ConfigurationPane", [PluginConfigurationPane, _TemplatedMixin,
            _WidgetsInTemplateMixin], {

            templateString: template,
            widgetsInTemplate: true,

            load: function (callback) {
				console.log("debut de la fonction callback");
				const configJSON = JSON.parse(this.configurationString);
				if(configJSON?.desktops){
					
					console.log("--- recup des saisies ---")
					this.desktops.set("value",configJSON.desktops),
					this.repositories.set("value",configJSON.repositories),
					this.substitutionPath.set("value",configJSON.substitutionPath);
					
				}
            },

			//a traiter plus tard ...
            validate: function () {
                return true;
            },
            
            //evenement s'executant
            _onFieldChange : function(){
				const configJSON = {
					desktops: this.desktops.get("value"),
					repositories:this.repositories.get("value"),
					substitutionPath:this.substitutionPath.get("value")
					
				};
				this.configurationString = JSON.stringify(configJSON);
				
				this.onSaveNeeded(true);
			}
        });
    });
