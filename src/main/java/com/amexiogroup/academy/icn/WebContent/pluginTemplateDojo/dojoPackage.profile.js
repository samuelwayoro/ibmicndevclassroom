var profile = (function () {
    var testResourceRe = /^${dojoPackage}\/tests\//,
        // check if mid is in the ${dojoPackage}/tests directory
        nodeModulesRe = /\/node_modules\//,
        // check whether mid is one of the files not to be modified
        copyOnly = function (filename, mid) {
            var list = {
                "${dojoPackage}/${dojoPackage}.profile": true,
                "${dojoPackage}/package.json": true,
            };
            return (mid in list) ||
                (/^${dojoPackage}\/resources\//.test(mid)
                    && !/\.css$/.test(filename)) ||
                /(png|jpg|jpeg|gif|tiff)$/.test(filename) ||
                nodeModulesRe.test(mid);
        };

    return {
        resourceTags: {
            test: function (filename, mid) {
                return testResourceRe.test(mid) || mid == "${dojoPackage}/tests";
                // Tag test files
            },

            copyOnly: function (filename, mid) {
                return copyOnly(filename, mid);
                // Tag files that the compiler just needs to copy
            },

            amd: function (filename, mid) {
                return !testResourceRe.test(mid)
                    && !copyOnly(filename, mid)
                    && /\.js$/.test(filename);
                // tags js files in AMD if they match the conditions
            },

            miniExclude: function (filename, mid) {
                return nodeModulesRe.test(mid);
            }
        }
    };
})();