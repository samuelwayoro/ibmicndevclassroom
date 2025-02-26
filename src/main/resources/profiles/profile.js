var profile = (function () {

    return {
        //Path in which all the dojo resources to compile are
        basePath: "../dojo",

        //Directory for the release
        releaseDir: "../release",
        //name for the release
        releaseName: "js",

        // Builds a new release.
        action: "release",

        // Uses Closure Compiler as the JavaScript minifier. This can also be set to "shrinksafe" to use ShrinkSafe,
        // though ShrinkSafe is deprecated and not recommended.
        optimize: "closure",
        // We're building layers, so we need to set the minifier to use for those, too.
        layerOptimize: "closure",

        // Strips all comments and whitespace from CSS files and inlines @imports where possible.
        cssOptimize: "comments",

        // Excludes tests, demos, and original template files from being included in the built version.
        mini: true,

        // if you don't want the build to generate useSourceMaps
        useSourceMaps: false,

        // Strips all calls to console functions within the code. You can also set this to "warn" to strip everything
        // but console.error, and any other truthy value to strip everything but console.warn and console.error.
        // This defaults to "normal" (strip all but warn and error) if not provided.
        // Setting it to none to help debugging
        stripConsole: "warn",

        // The default selector engine is not included by default in a dojo.js build in order to make mobile builds
        // smaller. We add it back here to avoid that extra HTTP request. There is also a "lite" selector available; if
        // you use that, you will need to set the `selectorEngine` property in `app/run.js`, too. (The "lite" engine is
        // only suitable if you are not supporting IE7 and earlier.)
        selectorEngine: "acme",

        //provides a default dojoConfig
        defaultConfig: {
            hasCache: {
                "dojo-built": 1,
                "dojo-loader": 1,
                "dom": 1,
                "host-browser": 1,
                "config-selectorEngine": "acme"
            },
            async: 1
        },

        // determines whether to add a module identifier to every module definition or not
        // 'false' gets rid of most of the multiple define error
		// since this build it intended to be utilized with properly-expressed AMD modules;
		// don't insert absolute module ids into the modules
        insertAbsMids: false,

        // Providing hints to the build system allows code to be conditionally removed on a more granular level than
        // simple module dependencies can allow. This is especially useful for creating tiny mobile builds.
        // Keep in mind that dead code removal only happens in minifiers that support it! Currently, only Closure Compiler
        // to the Dojo build system with dead code removal.
        // A documented list of has-flags in use within the toolkit can be found at
        // <http://dojotoolkit.org/reference-guide/dojo/has.html>.

        localeList: "${dojo.localeList}",

        //Here are the dojo packages and contained in the ICN plugin
        packages: [
            {
                name: "${dojoPackage}",
                location: "./${dojoPackage}"
            },
        ],

        //The dojo layers contaning the entire package
        layers: {
            "${dojoPackage}/${dojoMainClass}": {
                include: [],
                exclude: [],
            },
        }
    };
})();
