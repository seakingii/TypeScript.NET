"use strict";
///<reference types="node"/>
var assert = require("assert");
var TaskHandler_1 = require("../../../../dist/commonjs/System/Threading/Tasks/TaskHandler");
var Functions_1 = require("../../../../dist/commonjs/System/Functions");
describe('new', function () {
    it("should throw", function () {
        assert.throws(function () {
            new TaskHandler_1.default(null);
        });
        assert.doesNotThrow(function () {
            (new TaskHandler_1.default(Functions_1.default.Blank)).dispose();
        });
    });
});
//# sourceMappingURL=TaskHandler.js.map