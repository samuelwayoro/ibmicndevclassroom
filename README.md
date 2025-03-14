# ICN Plugin Template

This is a sample Maven project for Plugin Development.

## What is included

It provides the base structure of a plugin development project, with:

* Source code organized according to commonly agreed best practices
* Localisation infrastructure for both back-end generated (java code) and front-end generated (dojo code) messages and labels
* A Maven build profile that will perform a Dojo Toolkit build (minification and compression of front end files sent to the browser)

## What is NOT included

This project doesn't provide any ICN customization.

It is only intended to provide an easy to use foundation for further customization, according to the business requirements.

## First things to do

Once the repository has been cloned or downloaded, make sure this repository is not declared as a git remote (simply delete the `.git` directory).

Then, as each plugin name should be **unique** on a given environment, you should process with customizing the project:

* It is **HIGHLY** recommended to change the project coordinates in the **pom.xml**

  * `groupId`: optional
  * `artifactId`: **highly** recommended
  * `version`: optional
  * `name`: recommended
  * `description`: recommended
  * `packaging`: **shouldn't** be changed

* It is **HIGHLY** recommended to change the packages, class and file names to meaningful names suited for your project

  * Package name (`com.amexiogroup.templates`)
  * Main plugin Java class name (`PluginTemplate.java`)
  * Dojo module name (folder `pluginTemplateDojo`)
    * Make sure you reflect such a change in the Plugin Configuration Pane Dojo class (`ConfigurationPane.js`)
  * Plugin main Dojo class (`PluginTemplate.js`)
  * Plugin main CSS file (`PluginTemplate.css`)
  * Update `utils/Constants.java` to reflect the required changes. Entries that should be updated are:
  
    * `PLUGIN_ID`: Should be a unique string identifier for your plugin
    * `PLUGIN_VERSION`: you can change this to suit your versioning policy
    * `PLUGIN_DEBUG_SCRIPT`: reflect your changes for the plugin main Dojo class name (used to be `PluginTemplate.js`)
    * `PLUGIN_DEBUG_CSS`: reflect your changes for the plugin main CSS file name (used to be `PluginTemplate.css`)
    * `PLUGIN_DOJO_MODULE`: reflect your changes for the Dojo module name (used to be `pluginTemplateDojo`)
    * `PLUGIN_DOJO_CONFIGURATION_CLASS`: reflect your changes for the Dojo module name (used to be `pluginTemplateDojo.ConfigurationPane`)

* It is **required** to adjust pom.xml project properties to match your own project requirements

  * pluginFinalName: This is the base name for the JAR generated by the build
  * pluginClass: This is the fully qualified name of the plugin Main Java class (used to be `PluginTemplate`)
  * builtBy: You can change the builder name that will appear in the JAR MANIFEST.MF
  * webcontentdir: This is the full path of the WebContent directory in the src/java/main folder (used to be `com/amexiogroup/templates/WebContent`)
  * dojoMainClass: This is the name of the Dojo Main class and CSS file name (used to be `PluginTemplate`)
  * dojoPackage: This is the name of the Dojo module (used to be `pluginTemplateDojo`) 
  * dojoVersion: This is the version of Dojo to use for the build. It should match the Dojo version used by ICN. This version can be retrieved:
    * By reading ICN version Release notes
    * By using `dojo.version` command in the browser Dev Tools when accing ICN
    * By opening the `dojo/_base/kernel.js` file embedded in ICN
  * dojo.localeList: This entry lists the localizations embedded in your profile (the template provides an example for English and French localization)

## How to use the template

The template does not provide any customization and should only be used as a baseline for plugin development, as it provides the necessary project file layout in order to start the development phase rapidly.

The template also provides 2 maven profiles to ease development and delivery:

* **release_build**: This profile is activated by default. It performs a Dojo build of your client code (JavaScript and CSS) with minification and compression
* **dev_build**: This profile does not perform minification nor compression
