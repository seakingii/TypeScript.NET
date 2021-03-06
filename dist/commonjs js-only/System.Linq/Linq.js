"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var Compare_1 = require("../System/Compare");
var Arrays = require("../System/Collections/Array/Compare");
var ArrayUtility = require("../System/Collections/Array/Utility");
var Utility_1 = require("../System/Collections/Array/Utility");
var enumUtil = require("../System/Collections/Enumeration/Enumerator");
var Enumerator_1 = require("../System/Collections/Enumeration/Enumerator");
var EmptyEnumerator_1 = require("../System/Collections/Enumeration/EmptyEnumerator");
var Types_1 = require("../System/Types");
var Integer_1 = require("../System/Integer");
var Functions_1 = require("../System/Functions");
var ArrayEnumerator_1 = require("../System/Collections/Enumeration/ArrayEnumerator");
var EnumeratorBase_1 = require("../System/Collections/Enumeration/EnumeratorBase");
var Dictionary_1 = require("../System/Collections/Dictionaries/Dictionary");
var Queue_1 = require("../System/Collections/Queue");
var dispose_1 = require("../System/Disposable/dispose");
var DisposableBase_1 = require("../System/Disposable/DisposableBase");
var UnsupportedEnumerableException_1 = require("../System/Collections/Enumeration/UnsupportedEnumerableException");
var ObjectDisposedException_1 = require("../System/Disposable/ObjectDisposedException");
var KeySortedContext_1 = require("../System/Collections/Sorting/KeySortedContext");
var ArgumentNullException_1 = require("../System/Exceptions/ArgumentNullException");
var ArgumentOutOfRangeException_1 = require("../System/Exceptions/ArgumentOutOfRangeException");
var IndexEnumerator_1 = require("../System/Collections/Enumeration/IndexEnumerator");
var IteratorEnumerator_1 = require("../System/Collections/Enumeration/IteratorEnumerator");
var extends_1 = require("../extends");
// noinspection JSUnusedLocalSymbols
var __extends = extends_1.default;
// #region Local Constants.
var INVALID_DEFAULT = {}; // create a private unique instance for referencing.
var VOID0 = void 0;
var NULL = null;
function BREAK() {
    return 0 /* Break */;
}
function RETURN() {
    return 1 /* Return */;
}
function isNotNullOrUndefined(e) {
    return e !== null && e !== VOID0;
}
// Leave internal to avoid accidental overwriting.
var LinqFunctions = (function (_super) {
    __extends(LinqFunctions, _super);
    function LinqFunctions() {
        _super.apply(this, arguments);
    }
    // noinspection JSMethodCanBeStatic
    LinqFunctions.prototype.Greater = function (a, b) {
        return a > b ? a : b;
    };
    // noinspection JSMethodCanBeStatic
    LinqFunctions.prototype.Lesser = function (a, b) {
        return a < b ? a : b;
    };
    return LinqFunctions;
}(Functions_1.Functions));
var Functions = Object.freeze(new LinqFunctions());
// For re-use as a factory.
function getEmptyEnumerator() {
    return EmptyEnumerator_1.EmptyEnumerator;
}
// #endregion
/*
 * NOTE: About InfiniteEnumerable<T> and Enumerable<T>.
 * There may seem like there's extra overrides here and they may seem unnecessary.
 * But after closer inspection you'll see the type chain is retained and
 * infinite enumerables are prevented from having features that finite ones have.
 *
 * I'm not sure if it's the best option to just use overrides, but it honors the typing properly.
 */
var InfiniteEnumerable = (function (_super) {
    __extends(InfiniteEnumerable, _super);
    function InfiniteEnumerable(_enumeratorFactory, finalizer) {
        _super.call(this, finalizer);
        this._enumeratorFactory = _enumeratorFactory;
        this._isEndless = true;
        this._disposableObjectName = "InfiniteEnumerable";
    }
    Object.defineProperty(InfiniteEnumerable.prototype, "isEndless", {
        get: function () {
            return this._isEndless;
        },
        enumerable: true,
        configurable: true
    });
    // #region IEnumerable<T> Implementation...
    InfiniteEnumerable.prototype.getEnumerator = function () {
        this.throwIfDisposed();
        return this._enumeratorFactory();
    };
    // #endregion
    // #region IDisposable override...
    InfiniteEnumerable.prototype._onDispose = function () {
        _super.prototype._onDispose.call(this); // Just in case.
        this._enumeratorFactory = null;
    };
    // #endregion
    // Return a default (unfiltered) enumerable.
    InfiniteEnumerable.prototype.asEnumerable = function () {
        var _ = this;
        _.throwIfDisposed();
        return new InfiniteEnumerable(function () { return _.getEnumerator(); });
    };
    InfiniteEnumerable.prototype.doAction = function (action, initializer, isEndless, onComplete) {
        if (isEndless === void 0) { isEndless = this.isEndless; }
        var _ = this;
        _.throwIfDisposed();
        var isE = isEndless || undefined; // In case it's null.
        if (!action)
            throw new ArgumentNullException_1.ArgumentNullException("action");
        return new Enumerable(function () {
            var enumerator;
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(!action);
                if (initializer)
                    initializer();
                index = 0;
                enumerator = _.getEnumerator();
                // May need a way to propagate isEndless
            }, function (yielder) {
                throwIfDisposed(!action);
                while (enumerator.moveNext()) {
                    var c = enumerator.current;
                    var actionResult = action(c, index++);
                    if (actionResult === false || actionResult === 0 /* Break */)
                        return yielder.yieldBreak();
                    if (actionResult !== 2 /* Skip */)
                        return yielder.yieldReturn(c);
                }
                if (onComplete)
                    onComplete(index);
                return false;
            }, function () {
                dispose_1.dispose(enumerator);
            }, isE);
        }, 
        // Using a finalizer value reduces the chance of a circular reference
        // since we could simply reference the enumeration and check e.wasDisposed.
        // Using a finalizer value reduces the chance of a circular reference
        // since we could simply reference the enumeration and check e.wasDisposed.
        function () {
            action = NULL;
        }, isE);
    };
    InfiniteEnumerable.prototype.force = function () {
        this.throwIfDisposed();
        this.doAction(BREAK)
            .getEnumerator()
            .moveNext();
    };
    // #region Indexing/Paging methods.
    InfiniteEnumerable.prototype.skip = function (count) {
        var _ = this;
        _.throwIfDisposed();
        if (!isFinite(count))
            return new InfiniteEnumerable(getEmptyEnumerator);
        Integer_1.Integer.assert(count, "count");
        return this.where(function (element, index) { return index >= count; });
    };
    InfiniteEnumerable.prototype.take = function (count) {
        if (!(count > 0))
            return Enumerable.empty();
        var _ = this;
        _.throwIfDisposed();
        if (!isFinite(count))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('count', count, 'Must be finite.');
        Integer_1.Integer.assert(count, "count");
        // Once action returns false, the enumeration will stop.
        return _.doAction(function (element, index) { return index < count; }, null, false);
    };
    // #region Single Value Return...
    InfiniteEnumerable.prototype.elementAt = function (index) {
        var v = this.elementAtOrDefault(index, INVALID_DEFAULT);
        if (v === INVALID_DEFAULT)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('index', index, "is greater than or equal to the number of elements in source");
        return v;
    };
    InfiniteEnumerable.prototype.elementAtOrDefault = function (index, defaultValue) {
        var _ = this;
        _.throwIfDisposed();
        Integer_1.Integer.assertZeroOrGreater(index, 'index');
        var n = index;
        return dispose_1.using(this.getEnumerator(), function (e) {
            var i = 0;
            while (e.moveNext()) {
                if (i == n)
                    return e.current;
                i++;
            }
            return defaultValue;
        });
    };
    /* Note: Unlike previous implementations, you could pass a predicate into these methods.
     * But since under the hood it ends up calling .where(predicate) anyway,
     * it may be better to remove this to allow for a cleaner signature/override.
     * JavaScript/TypeScript does not easily allow for a strict method interface like C#.
     * Having to write extra override logic is error prone and confusing to the consumer.
     * Removing the predicate here may also cause the consumer of this method to think more about how they structure their query.
     * The end all difference is that the user must declare .where(predicate) before .first(), .single(), or .last().
     * Otherwise there would need to be much more code to handle these cases (.first(predicate), etc);
     * */
    InfiniteEnumerable.prototype.first = function () {
        var v = this.firstOrDefault(INVALID_DEFAULT);
        if (v === INVALID_DEFAULT)
            throw new Error("first:The sequence is empty.");
        return v;
    };
    InfiniteEnumerable.prototype.firstOrDefault = function (defaultValue) {
        var _ = this;
        _.throwIfDisposed();
        return dispose_1.using(this.getEnumerator(), function (e) { return e.moveNext() ? e.current : defaultValue; });
    };
    InfiniteEnumerable.prototype.single = function () {
        var _ = this;
        _.throwIfDisposed();
        return dispose_1.using(this.getEnumerator(), function (e) {
            if (e.moveNext()) {
                var value = e.current;
                if (!e.moveNext())
                    return value;
                throw new Error("single:sequence contains more than one element.");
            }
            throw new Error("single:The sequence is empty.");
        });
    };
    InfiniteEnumerable.prototype.singleOrDefault = function (defaultValue) {
        var _ = this;
        _.throwIfDisposed();
        return dispose_1.using(this.getEnumerator(), function (e) {
            if (e.moveNext()) {
                var value = e.current;
                if (!e.moveNext())
                    return value;
            }
            return defaultValue;
        });
    };
    InfiniteEnumerable.prototype.any = function () {
        var _ = this;
        _.throwIfDisposed();
        return dispose_1.using(this.getEnumerator(), function (e) { return e.moveNext(); });
    };
    InfiniteEnumerable.prototype.isEmpty = function () {
        return !this.any();
    };
    InfiniteEnumerable.prototype.traverseDepthFirst = function (childrenSelector, resultSelector) {
        if (resultSelector === void 0) { resultSelector = Functions.Identity; }
        var _ = this;
        var disposed = !_.throwIfDisposed();
        var isEndless = _._isEndless; // Is endless is not affirmative if false.
        return new Enumerable(function () {
            // Dev Note: May want to consider using an actual stack and not an array.
            var enumeratorStack = [];
            var enumerator;
            var len; // Avoid using push/pop since they query .length every time and can be slower.
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                len = 0;
            }, function (yielder) {
                throwIfDisposed(disposed);
                while (true) {
                    if (enumerator.moveNext()) {
                        var value = resultSelector(enumerator.current, len);
                        enumeratorStack[len++] = enumerator;
                        var c = childrenSelector(enumerator.current);
                        var e = !Types_1.Type.isString(c) && Enumerable.fromAny(c);
                        enumerator = e ? e.getEnumerator() : EmptyEnumerator_1.EmptyEnumerator;
                        return yielder.yieldReturn(value);
                    }
                    if (len == 0)
                        return false;
                    enumerator.dispose();
                    enumerator = enumeratorStack[--len];
                    enumeratorStack.length = len;
                }
            }, function () {
                try {
                    dispose_1.dispose(enumerator);
                }
                finally {
                    dispose_1.dispose.these(enumeratorStack);
                }
            }, isEndless);
        }, function () {
            disposed = true;
        }, isEndless);
    };
    InfiniteEnumerable.prototype.flatten = function () {
        return this.selectMany(function (entry) {
            var e = !Types_1.Type.isString(entry) && Enumerable.fromAny(entry);
            return e ? e.flatten() : [entry];
        });
    };
    InfiniteEnumerable.prototype.pairwise = function (selector) {
        var _ = this;
        _.throwIfDisposed();
        if (!selector)
            throw new ArgumentNullException_1.ArgumentNullException("selector");
        var previous;
        return this.select(function (value, i) {
            var result = i ? selector(previous, value, i) : NULL;
            previous = value;
            return result;
        }).skip(1);
    };
    InfiniteEnumerable.prototype.scan = function (func, seed) {
        var _ = this;
        _.throwIfDisposed();
        if (!func)
            throw new ArgumentNullException_1.ArgumentNullException("func");
        return (seed === VOID0
            ? this.select(function (value, i) { return seed = i ? func(seed, value, i) : value; })
            : this.select(function (value, i) { return seed = func(seed, value, i); }));
    };
    // #endregion
    InfiniteEnumerable.prototype.select = function (selector) {
        return this._filterSelected(selector);
    };
    /*
    public static IEnumerable<TResult> SelectMany<TSource, TCollection, TResult>(
        this IEnumerable<TSource> source,
        Func<TSource, IEnumerable<TCollection>> collectionSelector,
        Func<TSource, TCollection, TResult> resultSelector)
     */
    InfiniteEnumerable.prototype._selectMany = function (collectionSelector, resultSelector) {
        var _ = this;
        _.throwIfDisposed();
        if (!collectionSelector)
            throw new ArgumentNullException_1.ArgumentNullException("collectionSelector");
        var isEndless = _._isEndless; // Do second enumeration, it will be indeterminate if false.
        if (!resultSelector)
            resultSelector = function (a, b) { return b; };
        return new Enumerable(function () {
            var enumerator;
            var middleEnumerator;
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(!collectionSelector);
                enumerator = _.getEnumerator();
                middleEnumerator = VOID0;
                index = 0;
            }, function (yielder) {
                throwIfDisposed(!collectionSelector);
                // Just started, and nothing to enumerate? End.
                if (middleEnumerator === VOID0 && !enumerator.moveNext())
                    return false;
                // moveNext has been called at least once...
                do {
                    // Initialize middle if there isn't one.
                    if (!middleEnumerator) {
                        var middleSeq = collectionSelector(enumerator.current, index++);
                        // Collection is null?  Skip it...
                        if (!middleSeq)
                            continue;
                        middleEnumerator = enumUtil.from(middleSeq);
                    }
                    if (middleEnumerator.moveNext())
                        return yielder.yieldReturn(resultSelector(enumerator.current, middleEnumerator.current));
                    // else no more in this middle?  Then clear and reset for next...
                    middleEnumerator.dispose();
                    middleEnumerator = null;
                } while (enumerator.moveNext());
                return false;
            }, function () {
                dispose_1.dispose(enumerator, middleEnumerator);
                enumerator = NULL;
                middleEnumerator = null;
            }, isEndless);
        }, function () {
            collectionSelector = NULL;
        }, isEndless);
    };
    InfiniteEnumerable.prototype.selectMany = function (collectionSelector, resultSelector) {
        return this._selectMany(collectionSelector, resultSelector);
    };
    InfiniteEnumerable.prototype._filterSelected = function (selector, filter) {
        if (selector === void 0) { selector = Functions.Identity; }
        var _ = this;
        var disposed = !_.throwIfDisposed();
        if (!selector)
            throw new ArgumentNullException_1.ArgumentNullException("selector");
        return new Enumerable(function () {
            var enumerator;
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(!selector);
                index = 0;
                enumerator = _.getEnumerator();
            }, function (yielder) {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    var i = index++;
                    var result = selector(enumerator.current, i);
                    if (!filter || filter(result, i++))
                        return yielder.yieldReturn(result);
                }
                return false;
            }, function () {
                dispose_1.dispose(enumerator);
            }, _._isEndless);
        }, function () {
            disposed = false;
        }, _._isEndless);
    };
    InfiniteEnumerable.prototype.choose = function (selector) {
        if (selector === void 0) { selector = Functions.Identity; }
        return this._filterSelected(selector, isNotNullOrUndefined);
    };
    InfiniteEnumerable.prototype.where = function (predicate) {
        return this._filterSelected(Functions.Identity, predicate);
    };
    InfiniteEnumerable.prototype.nonNull = function () {
        return this.where(function (v) { return v != null && v != VOID0; });
    };
    InfiniteEnumerable.prototype.ofType = function (type) {
        var typeName;
        switch (type) {
            case Number:
                typeName = Types_1.Type.NUMBER;
                break;
            case String:
                typeName = Types_1.Type.STRING;
                break;
            case Boolean:
                typeName = Types_1.Type.BOOLEAN;
                break;
            case Function:
                typeName = Types_1.Type.FUNCTION;
                break;
            default:
                return this
                    .where(function (x) { return x instanceof type; });
        }
        return this
            .where(function (x) { return isNotNullOrUndefined(x) && typeof x === typeName; });
    };
    InfiniteEnumerable.prototype.except = function (second, compareSelector) {
        var _ = this;
        var disposed = !_.throwIfDisposed();
        var isEndless = _._isEndless;
        return new Enumerable(function () {
            var enumerator;
            var keys;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                keys = new Dictionary_1.Dictionary(compareSelector);
                if (second)
                    enumUtil.forEach(second, function (key) { keys.addByKeyValue(key, true); });
            }, function (yielder) {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    var current = enumerator.current;
                    if (!keys.containsKey(current)) {
                        keys.addByKeyValue(current, true);
                        return yielder.yieldReturn(current);
                    }
                }
                return false;
            }, function () {
                dispose_1.dispose(enumerator);
                keys.clear();
            }, isEndless);
        }, function () {
            disposed = true;
        }, isEndless);
    };
    InfiniteEnumerable.prototype.distinct = function (compareSelector) {
        return this.except(NULL, compareSelector);
    };
    // [0,0,0,1,1,1,2,2,2,0,0,0,1,1] results in [0,1,2,0,1];
    InfiniteEnumerable.prototype.distinctUntilChanged = function (compareSelector) {
        if (compareSelector === void 0) { compareSelector = Functions.Identity; }
        var _ = this;
        var disposed = !_.throwIfDisposed();
        var isEndless = _._isEndless;
        return new Enumerable(function () {
            var enumerator;
            var compareKey;
            var initial = true;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, function (yielder) {
                throwIfDisposed(disposed);
                while (enumerator.moveNext()) {
                    var key = compareSelector(enumerator.current);
                    if (initial) {
                        initial = false;
                    }
                    else if (Compare_1.areEqual(compareKey, key)) {
                        continue;
                    }
                    compareKey = key;
                    return yielder.yieldReturn(enumerator.current);
                }
                return false;
            }, function () {
                dispose_1.dispose(enumerator);
            }, isEndless);
        }, function () {
            disposed = true;
        }, isEndless);
    };
    /**
     * Returns a single default value if empty.
     * @param defaultValue
     * @returns {Enumerable}
     */
    InfiniteEnumerable.prototype.defaultIfEmpty = function (defaultValue) {
        var _ = this;
        var disposed = !_.throwIfDisposed();
        var isEndless = _._isEndless;
        return new Enumerable(function () {
            var enumerator;
            var isFirst;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                isFirst = true;
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, function (yielder) {
                throwIfDisposed(disposed);
                if (enumerator.moveNext()) {
                    isFirst = false;
                    return yielder.yieldReturn(enumerator.current);
                }
                else if (isFirst) {
                    isFirst = false;
                    return yielder.yieldReturn(defaultValue);
                }
                return false;
            }, function () {
                dispose_1.dispose(enumerator);
            }, isEndless);
        }, null, isEndless);
    };
    InfiniteEnumerable.prototype.zip = function (second, resultSelector) {
        var _ = this;
        _.throwIfDisposed();
        return new Enumerable(function () {
            var firstEnumerator;
            var secondEnumerator;
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                index = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = enumUtil.from(second);
            }, function (yielder) { return firstEnumerator.moveNext()
                && secondEnumerator.moveNext()
                && yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++)); }, function () {
                dispose_1.dispose(firstEnumerator, secondEnumerator);
            });
        });
    };
    InfiniteEnumerable.prototype.zipMultiple = function (second, resultSelector) {
        var _ = this;
        _.throwIfDisposed();
        if (!second.length)
            return Enumerable.empty();
        return new Enumerable(function () {
            var secondTemp;
            var firstEnumerator;
            var secondEnumerator;
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                secondTemp = new Queue_1.Queue(second);
                index = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = NULL;
            }, function (yielder) {
                if (firstEnumerator.moveNext()) {
                    while (true) {
                        while (!secondEnumerator) {
                            if (secondTemp.count) {
                                var next = secondTemp.dequeue();
                                if (next)
                                    secondEnumerator = enumUtil.from(next);
                            }
                            else
                                return yielder.yieldBreak();
                        }
                        if (secondEnumerator.moveNext())
                            return yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++));
                        secondEnumerator.dispose();
                        secondEnumerator = NULL;
                    }
                }
                return yielder.yieldBreak();
            }, function () {
                dispose_1.dispose(firstEnumerator, secondTemp);
            });
        });
    };
    // #region Join Methods
    InfiniteEnumerable.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector) {
        if (compareSelector === void 0) { compareSelector = Functions.Identity; }
        var _ = this;
        return new Enumerable(function () {
            var outerEnumerator;
            var lookup;
            var innerElements;
            var innerCount = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                outerEnumerator = _.getEnumerator();
                lookup = Enumerable.from(inner)
                    .toLookup(innerKeySelector, Functions.Identity, compareSelector);
            }, function (yielder) {
                while (true) {
                    if (innerElements) {
                        var innerElement = innerElements[innerCount++];
                        if (innerElement !== VOID0)
                            return yielder.yieldReturn(resultSelector(outerEnumerator.current, innerElement));
                        innerElements = null;
                        innerCount = 0;
                    }
                    if (outerEnumerator.moveNext()) {
                        var key = outerKeySelector(outerEnumerator.current);
                        innerElements = lookup.get(key);
                    }
                    else {
                        return yielder.yieldBreak();
                    }
                }
            }, function () {
                dispose_1.dispose(outerEnumerator);
                innerElements = null;
                outerEnumerator = NULL;
                lookup = NULL;
            });
        });
    };
    InfiniteEnumerable.prototype.groupJoin = function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector) {
        if (compareSelector === void 0) { compareSelector = Functions.Identity; }
        var _ = this;
        return new Enumerable(function () {
            var enumerator;
            var lookup;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                enumerator = _.getEnumerator();
                lookup = Enumerable.from(inner)
                    .toLookup(innerKeySelector, Functions.Identity, compareSelector);
            }, function (yielder) {
                return enumerator.moveNext()
                    && yielder.yieldReturn(resultSelector(enumerator.current, lookup.get(outerKeySelector(enumerator.current))));
            }, function () {
                dispose_1.dispose(enumerator);
                enumerator = NULL;
                lookup = NULL;
            });
        });
    };
    InfiniteEnumerable.prototype.merge = function (enumerables) {
        var _ = this;
        var isEndless = _._isEndless;
        if (!enumerables || enumerables.length == 0)
            return _;
        return new Enumerable(function () {
            var enumerator;
            var queue;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                // 1) First get our values...
                enumerator = _.getEnumerator();
                queue = new Queue_1.Queue(enumerables);
            }, function (yielder) {
                while (true) {
                    while (!enumerator && queue.tryDequeue(function (value) {
                        enumerator = enumUtil.from(value); // 4) Keep going and on to step 2.  Else fall through to yieldBreak().
                    })) { }
                    if (enumerator && enumerator.moveNext())
                        return yielder.yieldReturn(enumerator.current);
                    if (enumerator) {
                        enumerator.dispose();
                        enumerator = NULL;
                        continue;
                    }
                    return yielder.yieldBreak();
                }
            }, function () {
                dispose_1.dispose(enumerator, queue); // Just in case this gets disposed early.
            }, isEndless);
        }, null, isEndless);
    };
    InfiniteEnumerable.prototype.concat = function () {
        var enumerables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            enumerables[_i - 0] = arguments[_i];
        }
        return this.merge(enumerables);
    };
    InfiniteEnumerable.prototype.union = function (second, compareSelector) {
        if (compareSelector === void 0) { compareSelector = Functions.Identity; }
        var _ = this;
        var isEndless = _._isEndless;
        return new Enumerable(function () {
            var firstEnumerator;
            var secondEnumerator;
            var keys;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                firstEnumerator = _.getEnumerator();
                keys = new Dictionary_1.Dictionary(compareSelector); // Acting as a HashSet.
            }, function (yielder) {
                var current;
                if (secondEnumerator === VOID0) {
                    while (firstEnumerator.moveNext()) {
                        current = firstEnumerator.current;
                        if (!keys.containsKey(current)) {
                            keys.addByKeyValue(current, null);
                            return yielder.yieldReturn(current);
                        }
                    }
                    secondEnumerator = enumUtil.from(second);
                }
                while (secondEnumerator.moveNext()) {
                    current = secondEnumerator.current;
                    if (!keys.containsKey(current)) {
                        keys.addByKeyValue(current, null);
                        return yielder.yieldReturn(current);
                    }
                }
                return false;
            }, function () {
                dispose_1.dispose(firstEnumerator, secondEnumerator);
            }, isEndless);
        }, null, isEndless);
    };
    InfiniteEnumerable.prototype.insertAt = function (index, other) {
        Integer_1.Integer.assertZeroOrGreater(index, 'index');
        var n = index;
        var _ = this;
        _.throwIfDisposed();
        var isEndless = _._isEndless;
        return new Enumerable(function () {
            var firstEnumerator;
            var secondEnumerator;
            var count = 0;
            var isEnumerated = false;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                count = 0;
                firstEnumerator = _.getEnumerator();
                secondEnumerator = enumUtil.from(other);
                isEnumerated = false;
            }, function (yielder) {
                if (count == n) {
                    isEnumerated = true;
                    if (secondEnumerator.moveNext())
                        return yielder.yieldReturn(secondEnumerator.current);
                }
                if (firstEnumerator.moveNext()) {
                    count++;
                    return yielder.yieldReturn(firstEnumerator.current);
                }
                return !isEnumerated
                    && secondEnumerator.moveNext()
                    && yielder.yieldReturn(secondEnumerator.current);
            }, function () {
                dispose_1.dispose(firstEnumerator, secondEnumerator);
            }, isEndless);
        }, null, isEndless);
    };
    InfiniteEnumerable.prototype.alternateMultiple = function (sequence) {
        var _ = this;
        var isEndless = _._isEndless;
        return new Enumerable(function () {
            var buffer, mode, enumerator, alternateEnumerator;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                // Instead of recalling getEnumerator every time, just reset the existing one.
                alternateEnumerator = new ArrayEnumerator_1.ArrayEnumerator(Enumerable.toArray(sequence)); // Freeze
                enumerator = _.getEnumerator();
                var hasAtLeastOne = enumerator.moveNext();
                mode = hasAtLeastOne
                    ? 1 /* Return */
                    : 0 /* Break */;
                if (hasAtLeastOne)
                    buffer = enumerator.current;
            }, function (yielder) {
                switch (mode) {
                    case 0 /* Break */:
                        return yielder.yieldBreak();
                    case 2 /* Skip */:
                        if (alternateEnumerator.moveNext())
                            return yielder.yieldReturn(alternateEnumerator.current);
                        alternateEnumerator.reset();
                        mode = 1 /* Return */;
                        break;
                }
                var latest = buffer;
                // Set up the next round...
                // Is there another one?  Set the buffer and setup instruct for the next one to be the alternate.
                var another = enumerator.moveNext();
                mode = another
                    ? 2 /* Skip */
                    : 0 /* Break */;
                if (another)
                    buffer = enumerator.current;
                return yielder.yieldReturn(latest);
            }, function () {
                dispose_1.dispose(enumerator, alternateEnumerator);
            }, isEndless);
        }, null, isEndless);
    };
    InfiniteEnumerable.prototype.alternateSingle = function (value) {
        return this.alternateMultiple(Enumerable.make(value));
    };
    InfiniteEnumerable.prototype.alternate = function () {
        var sequence = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sequence[_i - 0] = arguments[_i];
        }
        return this.alternateMultiple(sequence);
    };
    // #region Error Handling
    InfiniteEnumerable.prototype.catchError = function (handler) {
        var _ = this;
        var disposed = !_.throwIfDisposed();
        return new Enumerable(function () {
            var enumerator;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                try {
                    throwIfDisposed(disposed);
                    enumerator = _.getEnumerator();
                }
                catch (e) {
                }
            }, function (yielder) {
                try {
                    throwIfDisposed(disposed);
                    if (enumerator.moveNext())
                        return yielder.yieldReturn(enumerator.current);
                }
                catch (e) {
                    handler(e);
                }
                return false;
            }, function () {
                dispose_1.dispose(enumerator);
            });
        });
    };
    InfiniteEnumerable.prototype.finallyAction = function (action) {
        var _ = this;
        var disposed = !_.throwIfDisposed();
        return new Enumerable(function () {
            var enumerator;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
            }, function (yielder) {
                throwIfDisposed(disposed);
                return (enumerator.moveNext())
                    ? yielder.yieldReturn(enumerator.current)
                    : false;
            }, function () {
                try {
                    dispose_1.dispose(enumerator);
                }
                finally {
                    action();
                }
            });
        });
    };
    // #endregion
    InfiniteEnumerable.prototype.buffer = function (size) {
        if (size < 1 || !isFinite(size))
            throw new Error("Invalid buffer size.");
        Integer_1.Integer.assert(size, "size");
        var _ = this;
        var isEndless = _._isEndless;
        var len;
        return new Enumerable(function () {
            var enumerator;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                enumerator = _.getEnumerator();
            }, function (yielder) {
                var array = ArrayUtility.initialize(size);
                len = 0;
                while (len < size && enumerator.moveNext()) {
                    array[len++] = enumerator.current;
                }
                array.length = len;
                return !!len && yielder.yieldReturn(array);
            }, function () {
                dispose_1.dispose(enumerator);
            }, isEndless);
        }, null, isEndless);
    };
    InfiniteEnumerable.prototype.share = function () {
        var _ = this;
        _.throwIfDisposed();
        var sharedEnumerator;
        return new Enumerable(function () {
            return sharedEnumerator || (sharedEnumerator = _.getEnumerator());
        }, function () {
            dispose_1.dispose(sharedEnumerator);
        }, _._isEndless);
    };
    return InfiniteEnumerable;
}(DisposableBase_1.DisposableBase));
exports.InfiniteEnumerable = InfiniteEnumerable;
/**
 * Enumerable<T> is a wrapper class that allows more primitive enumerables to exhibit LINQ behavior.
 *
 * In C# Enumerable<T> is not an instance but has extensions for IEnumerable<T>.
 * In this case, we use Enumerable<T> as the underlying class that is being chained.
 */
var Enumerable = (function (_super) {
    __extends(Enumerable, _super);
    function Enumerable(enumeratorFactory, finalizer, isEndless) {
        _super.call(this, enumeratorFactory, finalizer);
        this._isEndless = isEndless;
        this._disposableObjectName = "Enumerable";
    }
    // Return a default (unfiltered) enumerable.
    Enumerable.prototype.asEnumerable = function () {
        var _ = this;
        _.throwIfDisposed();
        return new Enumerable(function () { return _.getEnumerator(); });
    };
    // #region Indexing/Paging methods.
    Enumerable.prototype.skip = function (count) {
        return _super.prototype.skip.call(this, count);
    };
    Enumerable.prototype.skipWhile = function (predicate) {
        this.throwIfDisposed();
        return this.doAction(function (element, index) {
            return predicate(element, index)
                ? 2 /* Skip */
                : 1 /* Return */;
        });
    };
    Enumerable.prototype.takeWhile = function (predicate) {
        this.throwIfDisposed();
        if (!predicate)
            throw new ArgumentNullException_1.ArgumentNullException('predicate');
        return this.doAction(function (element, index) {
            return predicate(element, index)
                ? 1 /* Return */
                : 0 /* Break */;
        }, null, null // We don't know the state if it is endless or not.
        );
    };
    // Is like the inverse of take While with the ability to return the value identified by the predicate.
    Enumerable.prototype.takeUntil = function (predicate, includeUntilValue) {
        this.throwIfDisposed();
        if (!predicate)
            throw new ArgumentNullException_1.ArgumentNullException('predicate');
        if (!includeUntilValue)
            return this.doAction(function (element, index) {
                return predicate(element, index)
                    ? 0 /* Break */
                    : 1 /* Return */;
            }, null, null // We don't know the state if it is endless or not.
            );
        var found = false;
        return this.doAction(function (element, index) {
            if (found)
                return 0 /* Break */;
            found = predicate(element, index);
            return 1 /* Return */;
        }, function () {
            found = false;
        }, null // We don't know the state if it is endless or not.
        );
    };
    Enumerable.prototype.traverseBreadthFirst = function (childrenSelector, resultSelector) {
        if (resultSelector === void 0) { resultSelector = Functions.Identity; }
        var _ = this;
        var disposed = !_.throwIfDisposed();
        var isEndless = _._isEndless; // Is endless is not affirmative if false.
        return new Enumerable(function () {
            var enumerator;
            var nestLevel = 0;
            var buffer, len;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                enumerator = _.getEnumerator();
                nestLevel = 0;
                buffer = [];
                len = 0;
            }, function (yielder) {
                throwIfDisposed(disposed);
                while (true) {
                    if (enumerator.moveNext()) {
                        buffer[len++] = enumerator.current;
                        return yielder.yieldReturn(resultSelector(enumerator.current, nestLevel));
                    }
                    if (!len)
                        return yielder.yieldBreak();
                    var next = Enumerable
                        .from(buffer)
                        .selectMany(childrenSelector);
                    if (!next.any()) {
                        return yielder.yieldBreak();
                    }
                    else {
                        nestLevel++;
                        buffer = [];
                        len = 0;
                        enumerator.dispose();
                        enumerator = next.getEnumerator();
                    }
                }
            }, function () {
                dispose_1.dispose(enumerator);
                buffer.length = 0;
            }, isEndless);
        }, function () {
            disposed = true;
        }, isEndless);
    };
    Enumerable.prototype.forEach = function (action, max) {
        if (max === void 0) { max = Infinity; }
        var _ = this;
        _.throwIfDisposed();
        if (!action)
            throw new ArgumentNullException_1.ArgumentNullException("action");
        Enumerator_1.throwIfEndless(_.isEndless);
        /*
        // It could be just as easy to do the following:
        return enumUtil.forEach(_, action, max);
        // But to be more active about checking for disposal, we use this instead:
        */
        // Return value of action can be anything, but if it is (===) false then the enumUtil.forEach will discontinue.
        return max > 0 ? dispose_1.using(_.getEnumerator(), function (e) {
            Enumerator_1.throwIfEndless(!isFinite(max) && e.isEndless);
            var i = 0;
            // It is possible that subsequently 'action' could cause the enumeration to dispose, so we have to check each time.
            while (max > i && _.throwIfDisposed() && e.moveNext()) {
                if (action(e.current, i++) === false)
                    break;
            }
            return i;
        }) : 0;
    };
    // #region Conversion Methods
    Enumerable.prototype.toArray = function (predicate) {
        return predicate
            ? this.where(predicate).toArray()
            : this.copyTo([]);
    };
    Enumerable.prototype.copyTo = function (target, index, count) {
        if (index === void 0) { index = 0; }
        if (count === void 0) { count = Infinity; }
        this.throwIfDisposed();
        if (!target)
            throw new ArgumentNullException_1.ArgumentNullException("target");
        Integer_1.Integer.assertZeroOrGreater(index);
        // If not exposing an action that could cause dispose, then use enumUtil.forEach utility instead.
        enumUtil.forEach(this, function (x, i) {
            target[i + index] = x;
        }, count);
        return target;
    };
    Enumerable.prototype.toLookup = function (keySelector, elementSelector, compareSelector) {
        if (elementSelector === void 0) { elementSelector = Functions.Identity; }
        if (compareSelector === void 0) { compareSelector = Functions.Identity; }
        var dict = new Dictionary_1.Dictionary(compareSelector);
        this.forEach(function (x, i) {
            var key = keySelector(x, i);
            var element = elementSelector(x, i);
            var array = dict.getValue(key);
            if (array !== VOID0)
                array.push(element);
            else
                dict.addByKeyValue(key, [element]);
        });
        return new Lookup(dict);
    };
    Enumerable.prototype.toMap = function (keySelector, elementSelector) {
        var obj = {};
        this.forEach(function (x, i) {
            obj[keySelector(x, i)] = elementSelector(x, i);
        });
        return obj;
    };
    Enumerable.prototype.toDictionary = function (keySelector, elementSelector, compareSelector) {
        if (compareSelector === void 0) { compareSelector = Functions.Identity; }
        var dict = new Dictionary_1.Dictionary(compareSelector);
        this.forEach(function (x, i) { return dict.addByKeyValue(keySelector(x, i), elementSelector(x, i)); });
        return dict;
    };
    Enumerable.prototype.toJoinedString = function (separator, selector) {
        if (separator === void 0) { separator = ""; }
        if (selector === void 0) { selector = Functions.Identity; }
        return this
            .select(selector)
            .toArray()
            .join(separator);
    };
    // #endregion
    Enumerable.prototype.takeExceptLast = function (count) {
        if (count === void 0) { count = 1; }
        var _ = this;
        if (!(count > 0))
            return _;
        if (!isFinite(count))
            return Enumerable.empty();
        Integer_1.Integer.assert(count, "count");
        var c = count;
        return new Enumerable(function () {
            var enumerator;
            var q;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                enumerator = _.getEnumerator();
                q = new Queue_1.Queue();
            }, function (yielder) {
                while (enumerator.moveNext()) {
                    // Add the next one to the queue.
                    q.enqueue(enumerator.current);
                    // Did we reach our quota?
                    if (q.count > c)
                        // Okay then, start returning results.
                        return yielder.yieldReturn(q.dequeue());
                }
                return false;
            }, function () {
                dispose_1.dispose(enumerator, q);
            });
        });
    };
    Enumerable.prototype.skipToLast = function (count) {
        if (!(count > 0))
            return Enumerable.empty();
        var _ = this;
        if (!isFinite(count))
            return _;
        Integer_1.Integer.assert(count, "count");
        // This sets up the query so nothing is done until move next is called.
        return _.reverse()
            .take(count)
            .reverse();
    };
    // To help with type guarding.
    Enumerable.prototype.select = function (selector) {
        return _super.prototype.select.call(this, selector);
    };
    Enumerable.prototype.selectMany = function (collectionSelector, resultSelector) {
        return this._selectMany(collectionSelector, resultSelector);
    };
    Enumerable.prototype.choose = function (selector) {
        if (selector === void 0) { selector = Functions.Identity; }
        return this._filterSelected(selector, isNotNullOrUndefined);
    };
    Enumerable.prototype.reverse = function () {
        var _ = this;
        var disposed = !_.throwIfDisposed();
        Enumerator_1.throwIfEndless(_._isEndless); // Cannot reverse an endless collection...
        return new Enumerable(function () {
            var buffer;
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                _.throwIfDisposed();
                buffer = _.toArray();
                index = buffer.length;
            }, function (yielder) { return !!index && yielder.yieldReturn(buffer[--index]); }, function () {
                buffer.length = 0;
            });
        }, function () {
            disposed = true;
        });
    };
    Enumerable.prototype.shuffle = function () {
        var _ = this;
        var disposed = !_.throwIfDisposed();
        Enumerator_1.throwIfEndless(_._isEndless); // Cannot shuffle an endless collection...
        return new Enumerable(function () {
            var buffer;
            var capacity;
            var len;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                buffer = _.toArray();
                capacity = len = buffer.length;
            }, function (yielder) {
                // Avoid using major array operations like .slice();
                if (!len)
                    return yielder.yieldBreak();
                var selectedIndex = Integer_1.Integer.random(len);
                var selectedValue = buffer[selectedIndex];
                buffer[selectedIndex] = buffer[--len]; // Take the last one and put it here.
                buffer[len] = NULL; // clear possible reference.
                if (len % 32 == 0)
                    buffer.length = len;
                return yielder.yieldReturn(selectedValue);
            }, function () {
                buffer.length = 0;
            });
        }, function () {
            disposed = true;
        });
    };
    Enumerable.prototype.count = function (predicate) {
        var count = 0;
        this.forEach(predicate
            ?
                function (x, i) {
                    if (predicate(x, i))
                        ++count;
                }
            :
                function () {
                    ++count;
                });
        return count;
    };
    // Akin to '.every' on an array.
    Enumerable.prototype.all = function (predicate) {
        if (!predicate)
            throw new ArgumentNullException_1.ArgumentNullException("predicate");
        var result = true;
        this.forEach(function (x, i) {
            if (!predicate(x, i)) {
                result = false;
                return false; // break
            }
        });
        return result;
    };
    // 'every' has been added here for parity/compatibility with an array.
    Enumerable.prototype.every = function (predicate) {
        return this.all(predicate);
    };
    // Akin to '.some' on an array.
    Enumerable.prototype.any = function (predicate) {
        if (!predicate)
            return _super.prototype.any.call(this);
        var result = false;
        // Splitting the forEach up this way reduces iterative processing.
        // forEach handles the generation and disposal of the enumerator.
        this.forEach(function (x, i) {
            result = predicate(x, i); // false = not found and therefore it should continue.  true = found and break;
            return !result;
        });
        return result;
    };
    // 'some' has been added here for parity/compatibility with an array.
    Enumerable.prototype.some = function (predicate) {
        return this.any(predicate);
    };
    Enumerable.prototype.contains = function (value, compareSelector) {
        if (compareSelector) {
            var s_1 = compareSelector(value);
            return this.any(function (v) { return Compare_1.areEqual(compareSelector(v), s_1); });
        }
        return this.any(function (v) { return Compare_1.areEqual(v, value); });
    };
    // Originally has an overload for a predicate,
    // but that's a bad idea since this could be an enumeration of functions and therefore fail the intent.
    // Better to chain a where statement first to be more explicit.
    Enumerable.prototype.indexOf = function (value, compareSelector) {
        var found = -1;
        this.forEach(compareSelector
            ?
                function (element, i) {
                    if (Compare_1.areEqual(compareSelector(element, i), compareSelector(value, i), true)) {
                        found = i;
                        return false;
                    }
                }
            :
                function (element, i) {
                    // Why?  Because NaN doesn't equal NaN. :P
                    if (Compare_1.areEqual(element, value, true)) {
                        found = i;
                        return false;
                    }
                });
        return found;
    };
    Enumerable.prototype.lastIndexOf = function (value, compareSelector) {
        var result = -1;
        this.forEach(compareSelector
            ?
                function (element, i) {
                    if (Compare_1.areEqual(compareSelector(element, i), compareSelector(value, i), true))
                        result
                            = i;
                }
            :
                function (element, i) {
                    if (Compare_1.areEqual(element, value, true))
                        result = i;
                });
        return result;
    };
    Enumerable.prototype.intersect = function (second, compareSelector) {
        var _ = this;
        _.throwIfDisposed();
        if (!second)
            throw new ArgumentNullException_1.ArgumentNullException("second");
        var isEndless = _.isEndless;
        return new Enumerable(function () {
            var enumerator;
            var keys;
            var outs;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(!second);
                enumerator = _.getEnumerator();
                keys = new Dictionary_1.Dictionary(compareSelector);
                outs = new Dictionary_1.Dictionary(compareSelector);
                enumUtil.forEach(second, function (key) {
                    keys.addByKeyValue(key, true);
                });
            }, function (yielder) {
                while (enumerator.moveNext()) {
                    var current = enumerator.current;
                    if (!outs.containsKey(current) && keys.containsKey(current)) {
                        outs.addByKeyValue(current, true);
                        return yielder.yieldReturn(current);
                    }
                }
                return yielder.yieldBreak();
            }, function () {
                dispose_1.dispose(enumerator, keys, outs);
            }, isEndless);
        }, function () {
            second = NULL;
        }, isEndless);
    };
    Enumerable.prototype.sequenceEqual = function (second, equalityComparer) {
        if (equalityComparer === void 0) { equalityComparer = Compare_1.areEqual; }
        this.throwIfDisposed();
        return dispose_1.using(this.getEnumerator(), function (e1) { return dispose_1.using(enumUtil.from(second), function (e2) {
            // if both are endless, this will never evaluate.
            Enumerator_1.throwIfEndless(e1.isEndless && e2.isEndless);
            while (e1.moveNext()) {
                if (!e2.moveNext() || !equalityComparer(e1.current, e2.current))
                    return false;
            }
            return !e2.moveNext();
        }); });
    };
    Enumerable.prototype.ofType = function (type) {
        this.throwIfDisposed();
        return _super.prototype.ofType.call(this, type);
    };
    // #region Ordering Methods
    Enumerable.prototype.orderBy = function (keySelector) {
        if (keySelector === void 0) { keySelector = Functions.Identity; }
        this.throwIfDisposed();
        return new OrderedEnumerable(this, keySelector, 1 /* Ascending */);
    };
    Enumerable.prototype.orderUsing = function (comparison) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, null, 1 /* Ascending */, null, comparison);
    };
    Enumerable.prototype.orderUsingReversed = function (comparison) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this, null, -1 /* Descending */, null, comparison);
    };
    Enumerable.prototype.orderByDescending = function (keySelector) {
        if (keySelector === void 0) { keySelector = Functions.Identity; }
        this.throwIfDisposed();
        return new OrderedEnumerable(this, keySelector, -1 /* Descending */);
    };
    /*
         weightedSample(weightSelector) {
         weightSelector = Utils.createLambda(weightSelector);
         var source = this;
         return new Enumerable<T>(() => {
         var sortedByBound;
         var totalWeight = 0;
         return new EnumeratorBase<T>(
         () => {
         sortedByBound = source
         .choose(function (x) {
         var weight = weightSelector(x);
         if (weight <= 0) return null; // ignore 0
         totalWeight += weight;
         return { value: x, bound: totalWeight }
         })
         .toArray();
         },
         () => {
         if (sortedByBound.length > 0) {
         var draw = (Math.random() * totalWeight) + 1;
         var lower = -1;
         var upper = sortedByBound.length;
         while (upper - lower > 1) {
         var index = ((lower + upper) / 2);
         if (sortedByBound[index].bound >= draw) {
         upper = index;
         }
         else {
         lower = index;
         }
         }
         return (<any>this).yieldReturn(sortedByBound[upper].value);
         }
         return (<any>this).yieldBreak();
         },
         Functions.Blank);
         });
         }
         */
    // #endregion
    Enumerable.prototype.buffer = function (size) {
        return _super.prototype.buffer.call(this, size);
    };
    Enumerable.prototype.groupBy = function (keySelector, elementSelector, compareSelector) {
        var _this = this;
        if (!elementSelector)
            elementSelector = Functions.Identity; // Allow for 'null' and not just undefined.
        return new Enumerable(function () { return _this
            .toLookup(keySelector, elementSelector, compareSelector)
            .getEnumerator(); });
    };
    Enumerable.prototype.partitionBy = function (keySelector, elementSelector, resultSelector, compareSelector) {
        if (resultSelector === void 0) { resultSelector = function (key, elements) { return new Grouping(key, elements); }; }
        if (compareSelector === void 0) { compareSelector = Functions.Identity; }
        var _ = this;
        if (!elementSelector)
            elementSelector = Functions.Identity; // Allow for 'null' and not just undefined.
        return new Enumerable(function () {
            var enumerator;
            var key;
            var compareKey;
            var group;
            var len;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(!elementSelector);
                enumerator = _.getEnumerator();
                if (enumerator.moveNext()) {
                    var v = enumerator.current;
                    key = keySelector(v);
                    compareKey = compareSelector(key);
                    group = [elementSelector(v)];
                    len = 1;
                }
                else
                    group = null;
            }, function (yielder) {
                throwIfDisposed(!elementSelector);
                if (!group)
                    return yielder.yieldBreak();
                var hasNext, c;
                while ((hasNext = enumerator.moveNext())) {
                    c = enumerator.current;
                    if (Compare_1.areEqual(compareKey, compareSelector(keySelector(c))))
                        group[len++] = elementSelector(c);
                    else
                        break;
                }
                var result = resultSelector(key, group);
                if (hasNext) {
                    c = enumerator.current;
                    key = keySelector(c);
                    compareKey = compareSelector(key);
                    group = [elementSelector(c)];
                    len = 1;
                }
                else {
                    group = null;
                }
                return yielder.yieldReturn(result);
            }, function () {
                dispose_1.dispose(enumerator);
                group = null;
            });
        }, function () {
            elementSelector = NULL;
        });
    };
    Enumerable.prototype.flatten = function () {
        return _super.prototype.flatten.call(this);
    };
    Enumerable.prototype.pairwise = function (selector) {
        return _super.prototype.pairwise.call(this, selector);
    };
    Enumerable.prototype.aggregate = function (func, seed) {
        this.forEach(function (value, i) {
            seed = i ? func(seed, value, i) : value;
        });
        return seed;
    };
    Enumerable.prototype.average = function (selector) {
        if (selector === void 0) { selector = Types_1.Type.numberOrNaN; }
        var count = 0;
        var sum = this.sum(function (e, i) {
            count++;
            return selector(e, i);
        });
        return (isNaN(sum) || !count)
            ? NaN
            : (sum / count);
    };
    // If using numbers, it may be useful to call .takeUntil(v=>v==Infinity,true) before calling max. See static versions for numbers.
    Enumerable.prototype.max = function () {
        return this.aggregate(Functions.Greater);
    };
    Enumerable.prototype.min = function () {
        return this.aggregate(Functions.Lesser);
    };
    Enumerable.prototype.maxBy = function (keySelector) {
        if (keySelector === void 0) { keySelector = Functions.Identity; }
        return this.aggregate(function (a, b) { return (keySelector(a) > keySelector(b)) ? a : b; });
    };
    Enumerable.prototype.minBy = function (keySelector) {
        if (keySelector === void 0) { keySelector = Functions.Identity; }
        return this.aggregate(function (a, b) { return (keySelector(a) < keySelector(b)) ? a : b; });
    };
    // Addition...  Only works with numerical enumerations.
    Enumerable.prototype.sum = function (selector) {
        if (selector === void 0) { selector = Types_1.Type.numberOrNaN; }
        var sum = 0;
        // This allows for infinity math that doesn't destroy the other values.
        var sumInfinite = 0; // Needs more investigation since we are really trying to retain signs.
        this.forEach(function (x, i) {
            var value = selector(x, i);
            if (isNaN(value)) {
                sum = NaN;
                return false;
            }
            if (isFinite(value))
                sum += value;
            else
                sumInfinite +=
                    value > 0 ?
                        (+1) :
                        (-1);
        });
        return isNaN(sum) ? NaN : (sumInfinite ? (sumInfinite * Infinity) : sum);
    };
    // Multiplication...
    Enumerable.prototype.product = function (selector) {
        if (selector === void 0) { selector = Types_1.Type.numberOrNaN; }
        var result = 1, exists = false;
        this.forEach(function (x, i) {
            exists = true;
            var value = selector(x, i);
            if (isNaN(value)) {
                result = NaN;
                return false;
            }
            if (value == 0) {
                result = 0; // Multiplying by zero will always end in zero.
                return false;
            }
            // Multiplication can never recover from infinity and simply must retain signs.
            // You could cancel out infinity with 1/infinity but no available representation exists.
            result *= value;
        });
        return (exists && isNaN(result)) ? NaN : result;
    };
    /**
     * Takes the first number and divides it by all following.
     * @param selector
     * @returns {number}
     */
    Enumerable.prototype.quotient = function (selector) {
        if (selector === void 0) { selector = Types_1.Type.numberOrNaN; }
        var count = 0;
        var result = NaN;
        this.forEach(function (x, i) {
            var value = selector(x, i);
            count++;
            if (count === 1) {
                result = value;
            }
            else {
                if (isNaN(value) || value === 0 || !isFinite(value)) {
                    result = NaN;
                    return false;
                }
                result /= value;
            }
        });
        if (count === 1)
            result = NaN;
        return result;
    };
    // #endregion
    // #region Single Value Return...
    Enumerable.prototype.last = function () {
        var _ = this;
        _.throwIfDisposed();
        var value = VOID0;
        var found = false;
        _.forEach(function (x) {
            found = true;
            value = x;
        });
        if (!found)
            throw new Error("last:No element satisfies the condition.");
        return value;
    };
    Enumerable.prototype.lastOrDefault = function (defaultValue) {
        var _ = this;
        _.throwIfDisposed();
        var value = VOID0;
        var found = false;
        _.forEach(function (x) {
            found = true;
            value = x;
        });
        return (!found) ? defaultValue : value;
    };
    // #endregion
    Enumerable.prototype.memoize = function () {
        var _ = this;
        var disposed = !_.throwIfDisposed();
        var cache;
        var enumerator;
        return new Enumerable(function () {
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                if (!enumerator)
                    enumerator = _.getEnumerator();
                if (!cache)
                    cache = [];
                index = 0;
            }, function (yielder) {
                throwIfDisposed(disposed);
                var i = index++;
                if (i >= cache.length) {
                    return (enumerator.moveNext())
                        ? yielder.yieldReturn(cache[i] = enumerator.current)
                        : false;
                }
                return yielder.yieldReturn(cache[i]);
            });
        }, function () {
            disposed = true;
            if (cache)
                cache.length = 0;
            cache = NULL;
            dispose_1.dispose(enumerator);
            enumerator = NULL;
        });
    };
    Enumerable.prototype.throwWhenEmpty = function () {
        return this.doAction(RETURN, null, this.isEndless, function (count) {
            if (!count)
                throw "Collection is empty.";
        });
    };
    return Enumerable;
}(InfiniteEnumerable));
exports.Enumerable = Enumerable;
// Provided for type guarding.
var FiniteEnumerable = (function (_super) {
    __extends(FiniteEnumerable, _super);
    function FiniteEnumerable(enumeratorFactory, finalizer) {
        _super.call(this, enumeratorFactory, finalizer, false);
        this._disposableObjectName = "FiniteEnumerable";
    }
    return FiniteEnumerable;
}(Enumerable));
exports.FiniteEnumerable = FiniteEnumerable;
var ArrayEnumerable = (function (_super) {
    __extends(ArrayEnumerable, _super);
    function ArrayEnumerable(source) {
        _super.call(this, function () {
            _.throwIfDisposed();
            return new ArrayEnumerator_1.ArrayEnumerator(function () {
                _.throwIfDisposed("The underlying ArrayEnumerable was disposed.", "ArrayEnumerator");
                return _._source; // Should never be null, but ArrayEnumerable if not disposed simply treats null as empty array.
            });
        });
        var _ = this;
        _._disposableObjectName = "ArrayEnumerable";
        _._source = source;
    }
    ArrayEnumerable.prototype._onDispose = function () {
        _super.prototype._onDispose.call(this);
        this._source = NULL;
    };
    Object.defineProperty(ArrayEnumerable.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    ArrayEnumerable.prototype.toArray = function () {
        var _ = this;
        _.throwIfDisposed();
        return enumUtil.toArray(_._source);
    };
    ArrayEnumerable.prototype.asEnumerable = function () {
        var _ = this;
        _.throwIfDisposed();
        return new ArrayEnumerable(this._source);
    };
    ArrayEnumerable.prototype.forEach = function (action, max) {
        if (max === void 0) { max = Infinity; }
        var _ = this;
        _.throwIfDisposed();
        return enumUtil.forEach(_._source, action, max);
    };
    // These methods should ALWAYS check for array length before attempting anything.
    ArrayEnumerable.prototype.any = function (predicate) {
        var _ = this;
        _.throwIfDisposed();
        var source = _._source;
        var len = source.length;
        return !!len && (!predicate || _super.prototype.any.call(this, predicate));
    };
    ArrayEnumerable.prototype.count = function (predicate) {
        var _ = this;
        _.throwIfDisposed();
        var source = _._source, len = source.length;
        return len && (predicate ? _super.prototype.count.call(this, predicate) : len);
    };
    ArrayEnumerable.prototype.elementAtOrDefault = function (index, defaultValue) {
        var _ = this;
        _.throwIfDisposed();
        Integer_1.Integer.assertZeroOrGreater(index, 'index');
        var source = _._source;
        return index < source.length
            ? source[index]
            : defaultValue;
    };
    ArrayEnumerable.prototype.last = function () {
        var _ = this;
        _.throwIfDisposed();
        var source = _._source, len = source.length;
        return (len)
            ? source[len - 1]
            : _super.prototype.last.call(this);
    };
    ArrayEnumerable.prototype.lastOrDefault = function (defaultValue) {
        var _ = this;
        _.throwIfDisposed();
        var source = _._source, len = source.length;
        return len
            ? source[len - 1]
            : defaultValue;
    };
    ArrayEnumerable.prototype.skip = function (count) {
        var _ = this;
        _.throwIfDisposed();
        if (!(count > 0))
            return _;
        return new Enumerable(function () { return new ArrayEnumerator_1.ArrayEnumerator(function () { return _._source; }, count); });
    };
    ArrayEnumerable.prototype.takeExceptLast = function (count) {
        if (count === void 0) { count = 1; }
        var _ = this;
        _.throwIfDisposed();
        return _.take(_._source.length - count);
    };
    ArrayEnumerable.prototype.skipToLast = function (count) {
        var _ = this;
        _.throwIfDisposed();
        if (!(count > 0))
            return Enumerable.empty();
        if (!isFinite(count))
            return _;
        var len = _._source
            ? _._source.length
            : 0;
        return _.skip(len - count);
    };
    ArrayEnumerable.prototype.reverse = function () {
        var _ = this;
        var disposed = !_.throwIfDisposed();
        return new Enumerable(function () {
            _.throwIfDisposed();
            return new IndexEnumerator_1.IndexEnumerator(function () {
                var s = _._source;
                throwIfDisposed(disposed || !s);
                return {
                    source: s,
                    pointer: (s.length - 1),
                    length: s.length,
                    step: -1
                };
            });
        }, function () {
            disposed = true;
        });
    };
    ArrayEnumerable.prototype.memoize = function () {
        return this.asEnumerable();
    };
    ArrayEnumerable.prototype.sequenceEqual = function (second, equalityComparer) {
        if (equalityComparer === void 0) { equalityComparer = Compare_1.areEqual; }
        if (Types_1.Type.isArrayLike(second))
            return Arrays.areEqual(this.source, second, true, equalityComparer);
        if (second instanceof ArrayEnumerable)
            return second.sequenceEqual(this.source, equalityComparer);
        return _super.prototype.sequenceEqual.call(this, second, equalityComparer);
    };
    ArrayEnumerable.prototype.toJoinedString = function (separator, selector) {
        if (separator === void 0) { separator = ""; }
        if (selector === void 0) { selector = Functions.Identity; }
        var s = this._source;
        return !selector && Array.isArray(s)
            ? s.join(separator)
            : _super.prototype.toJoinedString.call(this, separator, selector);
    };
    return ArrayEnumerable;
}(FiniteEnumerable));
var Grouping = (function (_super) {
    __extends(Grouping, _super);
    function Grouping(_groupKey, elements) {
        _super.call(this, elements);
        this._groupKey = _groupKey;
        this._disposableObjectName = "Grouping";
    }
    Object.defineProperty(Grouping.prototype, "key", {
        get: function () {
            return this._groupKey;
        },
        enumerable: true,
        configurable: true
    });
    return Grouping;
}(ArrayEnumerable));
var Lookup = (function () {
    function Lookup(_dictionary) {
        this._dictionary = _dictionary;
    }
    Object.defineProperty(Lookup.prototype, "count", {
        get: function () {
            return this._dictionary.count;
        },
        enumerable: true,
        configurable: true
    });
    Lookup.prototype.get = function (key) {
        return this._dictionary.getValue(key) || null;
    };
    Lookup.prototype.contains = function (key) {
        return this._dictionary.containsKey(key);
    };
    Lookup.prototype.getEnumerator = function () {
        var _ = this;
        var enumerator;
        return new EnumeratorBase_1.EnumeratorBase(function () {
            enumerator = _._dictionary.getEnumerator();
        }, function (yielder) {
            if (!enumerator.moveNext())
                return false;
            var current = enumerator.current;
            return yielder.yieldReturn(new Grouping(current.key, current.value));
        }, function () {
            dispose_1.dispose(enumerator);
            enumerator = NULL;
        });
    };
    return Lookup;
}());
var OrderedEnumerable = (function (_super) {
    __extends(OrderedEnumerable, _super);
    function OrderedEnumerable(source, keySelector, order, parent, comparer) {
        if (comparer === void 0) { comparer = Compare_1.compare; }
        _super.call(this, NULL);
        this.source = source;
        this.keySelector = keySelector;
        this.order = order;
        this.parent = parent;
        this.comparer = comparer;
        Enumerator_1.throwIfEndless(source && source.isEndless);
        this._disposableObjectName = "OrderedEnumerable";
    }
    OrderedEnumerable.prototype.createOrderedEnumerable = function (keySelector, order) {
        this.throwIfDisposed();
        return new OrderedEnumerable(this.source, keySelector, order, this);
    };
    OrderedEnumerable.prototype.thenBy = function (keySelector) {
        return this.createOrderedEnumerable(keySelector, 1 /* Ascending */);
    };
    OrderedEnumerable.prototype.thenUsing = function (comparison) {
        return new OrderedEnumerable(this.source, null, 1 /* Ascending */, this, comparison);
    };
    OrderedEnumerable.prototype.thenByDescending = function (keySelector) {
        return this.createOrderedEnumerable(keySelector, -1 /* Descending */);
    };
    OrderedEnumerable.prototype.thenUsingReversed = function (comparison) {
        return new OrderedEnumerable(this.source, null, -1 /* Descending */, this, comparison);
    };
    OrderedEnumerable.prototype.getEnumerator = function () {
        var _ = this;
        _.throwIfDisposed();
        var buffer;
        var indexes;
        var index = 0;
        return new EnumeratorBase_1.EnumeratorBase(function () {
            _.throwIfDisposed();
            index = 0;
            buffer = Enumerable.toArray(_.source);
            indexes = createSortContext(_)
                .generateSortedIndexes(buffer);
        }, function (yielder) {
            _.throwIfDisposed();
            return (index < indexes.length)
                ? yielder.yieldReturn(buffer[indexes[index++]])
                : false;
        }, function () {
            if (buffer)
                buffer.length = 0;
            buffer = NULL;
            if (indexes)
                indexes.length = 0;
            indexes = NULL;
        }, false);
    };
    OrderedEnumerable.prototype._onDispose = function () {
        var _ = this;
        _super.prototype._onDispose.call(this);
        _.source = NULL;
        _.keySelector = NULL;
        _.order = NULL;
        _.parent = NULL;
    };
    return OrderedEnumerable;
}(FiniteEnumerable));
// A private static helper for the weave function.
function nextEnumerator(queue, e) {
    if (e) {
        if (e.moveNext()) {
            queue.enqueue(e);
        }
        else {
            dispose_1.dispose(e);
            return null;
        }
    }
    return e;
}
/**
 * Recursively builds a SortContext chain.
 * @param orderedEnumerable
 * @param currentContext
 * @returns {any}
 */
function createSortContext(orderedEnumerable, currentContext) {
    if (currentContext === void 0) { currentContext = null; }
    var context = new KeySortedContext_1.KeySortedContext(currentContext, orderedEnumerable.keySelector, orderedEnumerable.order, orderedEnumerable.comparer);
    if (orderedEnumerable.parent)
        return createSortContext(orderedEnumerable.parent, context);
    return context;
}
function throwIfDisposed(disposed) {
    if (disposed)
        throw new ObjectDisposedException_1.ObjectDisposedException("Enumerable");
    return true;
}
// #endregion
var Enumerable;
(function (Enumerable) {
    /**
     * Universal method for converting a primitive enumerables into a LINQ enabled ones.
     *
     * Is not limited to TypeScript usages.
     */
    function from(source) {
        var e = fromAny(source);
        if (!e)
            throw new UnsupportedEnumerableException_1.UnsupportedEnumerableException();
        return e;
    }
    Enumerable.from = from;
    function fromAny(source, defaultEnumerable) {
        if (Types_1.Type.isObject(source) || Types_1.Type.isString(source)) {
            if (source instanceof Enumerable)
                return source;
            if (Types_1.Type.isArrayLike(source))
                return new ArrayEnumerable(source);
            if (Enumerator_1.isEnumerable(source))
                return new Enumerable(function () { return source.getEnumerator(); }, null, source.isEndless);
            if (Enumerator_1.isEnumerator(source))
                return new Enumerable(function () { return source; }, null, source.isEndless);
            if (Enumerator_1.isIterator(source))
                return fromAny(new IteratorEnumerator_1.IteratorEnumerator(source));
        }
        return defaultEnumerable;
    }
    Enumerable.fromAny = fromAny;
    function fromOrEmpty(source) {
        return Enumerable.fromAny(source) || Enumerable.empty();
    }
    Enumerable.fromOrEmpty = fromOrEmpty;
    /**
     * Static helper for converting enumerables to an array.
     * @param source
     * @returns {any}
     */
    function toArray(source) {
        if (source instanceof Enumerable)
            return source.toArray();
        return enumUtil.toArray(source);
    }
    Enumerable.toArray = toArray;
    function _choice(values) {
        return new InfiniteEnumerable(function () { return new EnumeratorBase_1.EnumeratorBase(null, function (yielder) {
            throwIfDisposed(!values);
            return yielder.yieldReturn(Integer_1.Integer.random.select(values));
        }, true // Is endless!
        ); }, function () {
            values.length = 0;
            values = NULL;
        });
    }
    Enumerable._choice = _choice;
    function choice(values) {
        var len = values && values.length;
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!len || !isFinite(len))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('length', length);
        return _choice(Utility_1.copy(values));
    }
    Enumerable.choice = choice;
    function chooseFrom() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!args.length)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('length', length);
        return _choice(args);
    }
    Enumerable.chooseFrom = chooseFrom;
    function _cycle(values) {
        return new InfiniteEnumerable(function () {
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                index = 0;
            }, // Reinitialize the value just in case the enumerator is restarted.
            function (yielder) {
                throwIfDisposed(!values);
                if (index >= values.length)
                    index = 0;
                return yielder.yieldReturn(values[index++]);
            }, true // Is endless!
            );
        }, function () {
            values.length = 0;
            values = NULL;
        });
    }
    function cycle(values) {
        var len = values && values.length;
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!len || !isFinite(len))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('length', length);
        // Make a copy to avoid modifying the collection as we go.
        return _cycle(Utility_1.copy(values));
    }
    Enumerable.cycle = cycle;
    function cycleThrough() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        // We could return empty if no length, but that would break the typing and produce unexpected results.
        // Enforcing that there must be at least 1 choice is key.
        if (!args.length)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('length', length);
        return _cycle(args);
    }
    Enumerable.cycleThrough = cycleThrough;
    function empty() {
        // Could be single export function instance, but for safety, we'll make a new one.
        return new FiniteEnumerable(getEmptyEnumerator);
    }
    Enumerable.empty = empty;
    function repeat(element, count) {
        if (count === void 0) { count = Infinity; }
        if (!(count > 0))
            return Enumerable.empty();
        return isFinite(count) && Integer_1.Integer.assert(count, "count")
            ? new FiniteEnumerable(function () {
                var c = count;
                var index = 0;
                return new EnumeratorBase_1.EnumeratorBase(function () { index = 0; }, function (yielder) { return (index++ < c) && yielder.yieldReturn(element); }, null, false);
            })
            : new Enumerable(function () {
                return new EnumeratorBase_1.EnumeratorBase(null, function (yielder) { return yielder.yieldReturn(element); }, true // Is endless!
                );
            });
    }
    Enumerable.repeat = repeat;
    function repeatWithFinalize(initializer, finalizer) {
        if (!initializer)
            throw new ArgumentNullException_1.ArgumentNullException("initializer");
        return new InfiniteEnumerable(function () {
            var element;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                if (initializer)
                    element = initializer();
            }, function (yielder) {
                return initializer
                    ? yielder.yieldReturn(element)
                    : yielder.yieldBreak();
            }, function () {
                element = NULL;
                if (finalizer)
                    finalizer(element);
            }, true // Is endless!
            );
        }, function () {
            initializer = NULL;
            finalizer = VOID0;
        });
    }
    Enumerable.repeatWithFinalize = repeatWithFinalize;
    /**
     * Creates an enumerable of one element.
     * @param element
     * @returns {FiniteEnumerable<T>}
     */
    function make(element) {
        return repeat(element, 1);
    }
    Enumerable.make = make;
    // start and step can be other than integer.
    function range(start, count, step) {
        if (step === void 0) { step = 1; }
        if (!isFinite(start))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("start", start, "Must be a finite number.");
        if (!(count > 0))
            return empty();
        if (!step)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("step", step, "Must be a valid value");
        if (!isFinite(step))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("step", step, "Must be a finite number.");
        Integer_1.Integer.assert(count, "count");
        return new FiniteEnumerable(function () {
            var value;
            var c = count; // Force integer evaluation.
            var index = 0;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                index = 0;
                value = start;
            }, function (yielder) {
                var result = index++ < c
                    && yielder.yieldReturn(value);
                if (result && index < count)
                    value += step;
                return result;
            }, false);
        });
    }
    Enumerable.range = range;
    function rangeDown(start, count, step) {
        if (step === void 0) { step = 1; }
        step = Math.abs(step) * -1;
        return range(start, count, step);
    }
    Enumerable.rangeDown = rangeDown;
    // step = -1 behaves the same as toNegativeInfinity;
    function toInfinity(start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        if (!isFinite(start))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("start", start, "Must be a finite number.");
        if (!step)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("step", step, "Must be a valid value");
        if (!isFinite(step))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("step", step, "Must be a finite number.");
        return new InfiniteEnumerable(function () {
            var value;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                value = start;
            }, function (yielder) {
                var current = value;
                value += step;
                return yielder.yieldReturn(current);
            }, true // Is endless!
            );
        });
    }
    Enumerable.toInfinity = toInfinity;
    function toNegativeInfinity(start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        return toInfinity(start, -step);
    }
    Enumerable.toNegativeInfinity = toNegativeInfinity;
    function rangeTo(start, to, step) {
        if (step === void 0) { step = 1; }
        if (isNaN(to) || !isFinite(to))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("to", to, "Must be a finite number.");
        if (step && !isFinite(step))
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("step", step, "Must be a finite non-zero number.");
        // This way we adjust for the delta from start and to so the user can say +/- step and it will work as expected.
        step = Math.abs(step);
        return new FiniteEnumerable(function () {
            var value;
            return new EnumeratorBase_1.EnumeratorBase(function () { value = start; }, start < to
                ?
                    function (yielder) {
                        var result = value <= to && yielder.yieldReturn(value);
                        if (result)
                            value += step;
                        return result;
                    }
                :
                    function (yielder) {
                        var result = value >= to && yielder.yieldReturn(value);
                        if (result)
                            value -= step;
                        return result;
                    }, false);
        });
    }
    Enumerable.rangeTo = rangeTo;
    function matches(input, pattern, flags) {
        if (flags === void 0) { flags = ""; }
        if (input === null || input === VOID0)
            throw new ArgumentNullException_1.ArgumentNullException("input");
        var type = typeof input;
        if (type != Types_1.Type.STRING)
            throw new Error("Cannot exec RegExp matches of type '" + type + "'.");
        if (pattern instanceof RegExp) {
            flags += (pattern.ignoreCase) ? "i" : "";
            flags += (pattern.multiline) ? "m" : "";
            pattern = pattern.source;
        }
        if (flags.indexOf("g") === -1)
            flags += "g";
        return new FiniteEnumerable(function () {
            var regex;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                regex = new RegExp(pattern, flags);
            }, function (yielder) {
                // Calling regex.exec consecutively on the same input uses the lastIndex to start the next match.
                var match = regex.exec(input);
                return (match !== null) ? yielder.yieldReturn(match) : false;
            });
        });
    }
    Enumerable.matches = matches;
    function generate(factory, count) {
        if (count === void 0) { count = Infinity; }
        if (!factory)
            throw new ArgumentNullException_1.ArgumentNullException("factory");
        if (isNaN(count) || count <= 0)
            return Enumerable.empty();
        return isFinite(count) && Integer_1.Integer.assert(count, "count")
            ?
                new FiniteEnumerable(function () {
                    var c = count;
                    var index = 0;
                    return new EnumeratorBase_1.EnumeratorBase(function () {
                        index = 0;
                    }, function (yielder) {
                        throwIfDisposed(!factory);
                        var current = index++;
                        return current < c && yielder.yieldReturn(factory(current));
                    }, false);
                }, function () {
                    factory = NULL;
                })
            :
                new InfiniteEnumerable(function () {
                    var index = 0;
                    return new EnumeratorBase_1.EnumeratorBase(function () {
                        index = 0;
                    }, function (yielder) {
                        throwIfDisposed(!factory);
                        return yielder.yieldReturn(factory(index++));
                    }, true // Is endless!
                    );
                }, function () {
                    factory = NULL;
                });
    }
    Enumerable.generate = generate;
    function unfold(seed, valueFactory, skipSeed) {
        if (skipSeed === void 0) { skipSeed = false; }
        if (!valueFactory)
            throw new ArgumentNullException_1.ArgumentNullException("factory");
        return new InfiniteEnumerable(function () {
            var index = 0;
            var value;
            var isFirst;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                index = 0;
                value = seed;
                isFirst = !skipSeed;
            }, function (yielder) {
                throwIfDisposed(!valueFactory);
                var i = index++;
                if (isFirst)
                    isFirst = false;
                else
                    value = valueFactory(value, i);
                return yielder.yieldReturn(value);
            }, true // Is endless!
            );
        }, function () {
            valueFactory = NULL;
        });
    }
    Enumerable.unfold = unfold;
    function forEach(enumerable, action, max) {
        if (max === void 0) { max = Infinity; }
        // Will properly dispose created enumerable.
        // Will throw if enumerable is endless.
        return enumUtil.forEach(enumerable, action, max);
    }
    Enumerable.forEach = forEach;
    function map(enumerable, selector) {
        // Will properly dispose created enumerable.
        // Will throw if enumerable is endless.
        return enumUtil.map(enumerable, selector);
    }
    Enumerable.map = map;
    // Slightly optimized versions for numbers.
    function max(values) {
        var v = values
            .takeUntil(function (v) { return v == +Infinity; }, true)
            .aggregate(Functions.Greater);
        return v === VOID0 ? NaN : v;
    }
    Enumerable.max = max;
    function min(values) {
        var v = values
            .takeUntil(function (v) { return v == -Infinity; }, true)
            .aggregate(Functions.Lesser);
        return v === VOID0 ? NaN : v;
    }
    Enumerable.min = min;
    /**
     * Takes any set of collections of the same type and weaves them together.
     * @param enumerables
     * @returns {Enumerable<T>}
     */
    function weave(enumerables) {
        if (!enumerables)
            throw new ArgumentNullException_1.ArgumentNullException('enumerables');
        var disposed = false;
        return new Enumerable(function () {
            var queue;
            var mainEnumerator;
            var index;
            return new EnumeratorBase_1.EnumeratorBase(function () {
                throwIfDisposed(disposed);
                index = 0;
                queue = new Queue_1.Queue();
                mainEnumerator = enumUtil.from(enumerables);
            }, function (yielder) {
                throwIfDisposed(disposed);
                var e = null;
                // First pass...
                if (mainEnumerator) {
                    while (!e && mainEnumerator.moveNext()) {
                        var c = mainEnumerator.current;
                        e = nextEnumerator(queue, c ? enumUtil.from(c) : NULL);
                    }
                    if (!e)
                        mainEnumerator = null;
                }
                while (!e && queue.tryDequeue(function (value) {
                    e = nextEnumerator(queue, enumUtil.from(value));
                })) { }
                return e
                    ? yielder.yieldReturn(e.current)
                    : yielder.yieldBreak();
            }, function () {
                dispose_1.dispose.these(queue.dump());
                dispose_1.dispose(mainEnumerator, queue);
                mainEnumerator = null;
                queue = NULL;
            });
        }, function () {
            disposed = true;
        });
    }
    Enumerable.weave = weave;
})(Enumerable = exports.Enumerable || (exports.Enumerable = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Enumerable;