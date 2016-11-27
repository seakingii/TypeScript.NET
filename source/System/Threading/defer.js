(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../../extends"], function (require, exports) {
    "use strict";
    var extends_1 = require("../../extends");
    var __extends = extends_1.default;
    var DeferBase = (function () {
        function DeferBase() {
        }
        DeferBase.prototype.dispose = function () {
            this.cancel();
        };
        return DeferBase;
    }());
    var Defer = (function (_super) {
        __extends(Defer, _super);
        function Defer(task, delay, payload) {
            var _this = _super.call(this) || this;
            if (!(delay > 0))
                delay = 0;
            _this._id = setTimeout(Defer.handler, delay, task, _this, payload);
            return _this;
        }
        Defer.prototype.cancel = function () {
            var id = this._id;
            if (id) {
                clearTimeout(id);
                this._id = null;
                return true;
            }
            return false;
        };
        Defer.handler = function (task, d, payload) {
            d.cancel();
            task(payload);
        };
        return Defer;
    }(DeferBase));
    var DeferInterval = (function (_super) {
        __extends(DeferInterval, _super);
        function DeferInterval(task, interval, _remaining) {
            if (_remaining === void 0) { _remaining = Infinity; }
            var _this = _super.call(this) || this;
            _this._remaining = _remaining;
            if (interval == null)
                throw "'interval' must be a valid number.";
            if (interval < 0)
                throw "'interval' cannot be negative.";
            _this._id = setInterval(DeferInterval.handler, interval, task, _this);
            return _this;
        }
        DeferInterval.prototype.cancel = function () {
            var id = this._id;
            if (id) {
                clearInterval(id);
                this._id = null;
                return true;
            }
            return false;
        };
        DeferInterval.handler = function (task, d) {
            if (!(--d._remaining))
                d.cancel();
            task();
        };
        return DeferInterval;
    }(DeferBase));
    function defer(task, delay, payload) {
        return new Defer(task, delay, payload);
    }
    exports.defer = defer;
    function interval(task, interval, count) {
        if (count === void 0) { count = Infinity; }
        return new DeferInterval(task, interval, count);
    }
    exports.interval = interval;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = defer;
});
//# sourceMappingURL=defer.js.map