(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "./constants/TaskNames", "gulp", "fs"], function (require, exports) {
    "use strict";
    var TASK = require("./constants/TaskNames");
    var gulp = require("gulp");
    var fs = require("fs");
    gulp.task(TASK.NUGET_PACK, 
    // [
    // 	TASK.BUILD
    // ],
    function (callback) {
        var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        require("gulp-nuget-pack")({
            id: "TypeScript.NET.Library",
            title: "TypeScript.NET",
            version: pkg.version,
            authors: "https://github.com/electricessence/",
            description: pkg.description,
            summary: "See http://electricessence.github.io/TypeScript.NET/ for details.",
            language: "en-us",
            projectUrl: "https://github.com/electricessence/TypeScript.NET",
            licenseUrl: "https://raw.githubusercontent.com/electricessence/TypeScript.NET/master/LICENSE.md",
            tags: pkg.keywords.join(" "),
            excludes: [],
            outputDir: ".nuget"
        }, [
            'source',
            'dist',
            '*.md'
        ], callback);
    });
});
//# sourceMappingURL=nuget-pack.js.map