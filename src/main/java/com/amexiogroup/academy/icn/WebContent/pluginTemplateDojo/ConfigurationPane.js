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
					console.log("recup de la saisie ")
					this.desktops.set("value",configJSON.desktops);
				}
            },

			//a traiter plus tard ...
            validate: function () {
                return true;
            },
            
            //evenement s'executant
            _onFieldChange : function(){
				const configJSON = {
					desktops: this.desktops.get("value")
				};
				this.configurationString = JSON.stringify(configJSON);
				
				this.onSaveNeeded(true);
			}
        });
    });
