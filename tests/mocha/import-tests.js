"use strict";
var fs = require("fs");
var root = "./tests/mocha/";
function getFilesAt(path, ext) {
    return fs
        .readdirSync(path)
        .filter(function (name) {
        return (!ext || name.lastIndexOf(ext) == name.length - ext.length)
            && fs.statSync(path + '/' + name).isFile();
    });
}
function getDirectoriesAt(path) {
    return fs
        .readdirSync(path)
        .filter(function (name) { return fs.statSync(path + '/' + name).isDirectory(); });
}
function importRecursive(path, importFiles, base) {
    if (path === void 0) { path = ""; }
    if (importFiles === void 0) { importFiles = false; }
    if (base === void 0) { base = ""; }
    var dirPath = base + path;
    if (importFiles)
        console.log(dirPath);
    getDirectoriesAt(root + dirPath)
        .sort()
        .forEach(function (dirname) {
        describe(dirname + '/', function () {
            importRecursive(dirname, true, dirPath + '/');
        });
    });
    if (importFiles) {
        var files = getFilesAt(root + dirPath, '.js'), count_1 = files.length;
        files
            .sort()
            .forEach(function (filename) {
            var filePath = dirPath + '/' + filename;
            console.log(" ", filename);
            var name = filename.replace(/\.js$/, '');
            var i = function () {
                require('./' + filePath);
            };
            // Allows for simple default instead of recursive.
            if (count_1 == 1 && name == path)
                i();
            else
                describe(name, i);
        });
    }
}
console.log("Importing Tests:");
importRecursive();
//# sourceMappingURL=import-tests.js.map