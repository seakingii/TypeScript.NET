System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscription;
    return {
        setters: [],
        execute: function () {
            Subscription = (function () {
                function Subscription(_subscribable, _subscriber) {
                    this._subscribable = _subscribable;
                    this._subscriber = _subscriber;
                    if (!_subscribable || !_subscriber)
                        throw 'Subscribable and subscriber cannot be null.';
                }
                Object.defineProperty(Subscription.prototype, "subscriber", {
                    get: function () {
                        return this._subscriber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Subscription.prototype, "wasDisposed", {
                    get: function () {
                        return !this._subscribable || !this._subscriber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Subscription.prototype.dispose = function () {
                    var subscriber = this.subscriber;
                    var subscribable = this._subscribable;
                    this._subscribable = null;
                    try {
                        if (subscriber && subscribable) {
                            subscribable.unsubscribe(subscriber);
                        }
                    }
                    finally {
                        this._subscriber = null;
                    }
                };
                return Subscription;
            }());
            exports_1("Subscription", Subscription);
            exports_1("default", Subscription);
        }
    };
});
//# sourceMappingURL=Subscription.js.map