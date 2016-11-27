(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../Observable/ObservableBase", "../../extends"], function (require, exports) {
    "use strict";
    var ObservableBase_1 = require("../Observable/ObservableBase");
    var extends_1 = require("../../extends");
    var __extends = extends_1.default;
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(_interval, _maxCount, _initialDelay) {
            if (_maxCount === void 0) { _maxCount = Infinity; }
            if (_initialDelay === void 0) { _initialDelay = _interval; }
            var _this = _super.call(this) || this;
            _this._interval = _interval;
            _this._maxCount = _maxCount;
            _this._initialDelay = _initialDelay;
            _this._count = 0;
            if (_interval == null)
                throw "'interval' must be a valid number.";
            if (_interval < 0)
                throw "'interval' cannot be negative.";
            return _this;
        }
        Timer.startNew = function (millisecondInterval, maxCount, initialDelay) {
            if (maxCount === void 0) { maxCount = Infinity; }
            if (initialDelay === void 0) { initialDelay = millisecondInterval; }
            var t = new Timer(millisecondInterval, maxCount, initialDelay);
            t.start();
            return t;
        };
        Object.defineProperty(Timer.prototype, "isRunning", {
            get: function () {
                return !!this._cancel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Timer.prototype.start = function () {
            var _ = this;
            _.throwIfDisposed("This timer has been disposed and can't be reused.");
            if (!_._cancel && _._count < _._maxCount) {
                if (_._count || _._initialDelay == _._interval) {
                    var i_1 = setInterval(Timer._onTick, _._interval, _);
                    _._cancel = function () {
                        clearInterval(i_1);
                    };
                }
                else {
                    var i_2 = setTimeout(Timer._onTick, _._initialDelay, _, true);
                    _._cancel = function () {
                        clearTimeout(i_2);
                    };
                }
            }
        };
        Timer.prototype.stop = function () {
            this.cancel();
        };
        Timer.prototype.reset = function () {
            this.stop();
            this._count = 0;
        };
        Timer.prototype.complete = function () {
            this.cancel();
            this._onCompleted();
            return this._count;
        };
        Timer.prototype.cancel = function () {
            if (this._cancel) {
                this._cancel();
                this._cancel = null;
                return true;
            }
            return false;
        };
        Timer.prototype._onDispose = function () {
            this.cancel();
            _super.prototype._onDispose.call(this);
        };
        Timer._onTick = function (timer, reInitTimer) {
            var index = timer._count++, max = timer._maxCount, isComplete = timer._count >= max;
            if (reInitTimer) {
                timer.cancel();
                timer.start();
            }
            if (isComplete) {
                timer.stop();
            }
            if (index < max) {
                timer._onNext(index);
            }
            if (isComplete) {
                timer._onCompleted();
            }
        };
        return Timer;
    }(ObservableBase_1.ObservableBase));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Timer;
});
//# sourceMappingURL=Timer.js.map