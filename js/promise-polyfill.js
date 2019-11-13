!(function (e, n) {
    "object" == typeof exports && "undefined" != typeof module
        ? n()
        : "function" == typeof define && define.amd
            ? define(n)
            : n();
})(0, function () {
    "use strict";
    function e(e) {
        var n = this.constructor;
        return this.then(
            function (t) {
                return n.resolve(e()).then(function () {
                    return t;
                });
            },
            function (t) {
                return n.resolve(e()).then(function () {
                    return n.reject(t);
                });
            }
        );
    }
    function n(e) {
        return !(!e || "undefined" == typeof e.length);
    }
    function t() { }
    function o(e) {
        if (!(this instanceof o))
            throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        (this._state = 0),
            (this._handled = !1),
            (this._value = undefined),
            (this._deferreds = []),
            c(e, this);
    }
    function r(e, n) {
        for (; 3 === e._state;) e = e._value;
        0 !== e._state
            ? ((e._handled = !0),
                o._immediateFn(function () {
                    var t = 1 === e._state ? n.onFulfilled : n.onRejected;
                    if (null !== t) {
                        var o;
                        try {
                            o = t(e._value);
                        } catch (r) {
                            return void f(n.promise, r);
                        }
                        i(n.promise, o);
                    } else (1 === e._state ? i : f)(n.promise, e._value);
                }))
            : e._deferreds.push(n);
    }
    function i(e, n) {
        try {
            if (n === e)
                throw new TypeError("A promise cannot be resolved with itself.");
            if (n && ("object" == typeof n || "function" == typeof n)) {
                var t = n.then;
                if (n instanceof o) return (e._state = 3), (e._value = n), void u(e);
                if ("function" == typeof t)
                    return void c(
                        (function (e, n) {
                            return function () {
                                e.apply(n, arguments);
                            };
                        })(t, n),
                        e
                    );
            }
            (e._state = 1), (e._value = n), u(e);
        } catch (r) {
            f(e, r);
        }
    }
    function f(e, n) {
        (e._state = 2), (e._value = n), u(e);
    }
    function u(e) {
        2 === e._state &&
            0 === e._deferreds.length &&
            o._immediateFn(function () {
                e._handled || o._unhandledRejectionFn(e._value);
            });
        for (var n = 0, t = e._deferreds.length; t > n; n++) r(e, e._deferreds[n]);
        e._deferreds = null;
    }
    function c(e, n) {
        var t = !1;
        try {
            e(
                function (e) {
                    t || ((t = !0), i(n, e));
                },
                function (e) {
                    t || ((t = !0), f(n, e));
                }
            );
        } catch (o) {
            if (t) return;
            (t = !0), f(n, o);
        }
    }
    var a = setTimeout;
    (o.prototype["catch"] = function (e) {
        return this.then(null, e);
    }),
        (o.prototype.then = function (e, n) {
            var o = new this.constructor(t);
            return (
                r(
                    this,
                    new (function (e, n, t) {
                        (this.onFulfilled = "function" == typeof e ? e : null),
                            (this.onRejected = "function" == typeof n ? n : null),
                            (this.promise = t);
                    })(e, n, o)
                ),
                o
            );
        }),
        (o.prototype["finally"] = e),
        (o.all = function (e) {
            return new o(function (t, o) {
                function r(e, n) {
                    try {
                        if (n && ("object" == typeof n || "function" == typeof n)) {
                            var u = n.then;
                            if ("function" == typeof u)
                                return void u.call(
                                    n,
                                    function (n) {
                                        r(e, n);
                                    },
                                    o
                                );
                        }
                        (i[e] = n), 0 == --f && t(i);
                    } catch (c) {
                        o(c);
                    }
                }
                if (!n(e)) return o(new TypeError("Promise.all accepts an array"));
                var i = Array.prototype.slice.call(e);
                if (0 === i.length) return t([]);
                for (var f = i.length, u = 0; i.length > u; u++) r(u, i[u]);
            });
        }),
        (o.resolve = function (e) {
            return e && "object" == typeof e && e.constructor === o
                ? e
                : new o(function (n) {
                    n(e);
                });
        }),
        (o.reject = function (e) {
            return new o(function (n, t) {
                t(e);
            });
        }),
        (o.race = function (e) {
            return new o(function (t, r) {
                if (!n(e)) return r(new TypeError("Promise.race accepts an array"));
                for (var i = 0, f = e.length; f > i; i++) o.resolve(e[i]).then(t, r);
            });
        }),
        (o._immediateFn =
            ("function" == typeof setImmediate &&
                function (e) {
                    setImmediate(e);
                }) ||
            function (e) {
                a(e, 0);
            }),
        (o._unhandledRejectionFn = function (e) {
            void 0 !== console &&
                console &&
                console.warn("Possible Unhandled Promise Rejection:", e);
        });
    var l = (function () {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw Error("unable to locate global object");
    })();
    "Promise" in l
        ? l.Promise.prototype["finally"] || (l.Promise.prototype["finally"] = e)
        : (l.Promise = o);
});