"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */
var InvalidOperationException_1 = require("../Exceptions/InvalidOperationException");
var extends_1 = require("../../extends");
// noinspection JSUnusedLocalSymbols
var __extends = extends_1.default;
var NAME = 'ObjectDisposedException';
var ObjectDisposedException = (function (_super) {
    __extends(ObjectDisposedException, _super);
    // For simplicity and consistency, lets stick with 1 signature.
    function ObjectDisposedException(objectName, message, innerException) {
        _super.call(this, message || '', innerException, function (_) {
            _.objectName = objectName;
        });
    }
    ObjectDisposedException.prototype.getName = function () {
        return NAME;
    };
    ObjectDisposedException.prototype.toString = function () {
        var _ = this;
        var oName = _.objectName;
        oName = oName ? ('{' + oName + '} ') : '';
        return '[' + _.name + ': ' + oName + _.message + ']';
    };
    ObjectDisposedException.throwIfDisposed = function (disposable, objectName, message) {
        if (disposable.wasDisposed)
            throw new ObjectDisposedException(objectName, message);
        return true;
    };
    return ObjectDisposedException;
}(InvalidOperationException_1.InvalidOperationException));
exports.ObjectDisposedException = ObjectDisposedException;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObjectDisposedException;