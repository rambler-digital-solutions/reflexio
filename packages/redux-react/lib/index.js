var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React from 'react';
import { useState, useEffect } from 'react';
import { useSystem } from '../../reflexio-on-redux/dist';
import { matchActionType } from './matchActionType';
export var connector = function (condition) { return function (WrappedComponent) {
    /* Flow
    ** When trigger - on Next(actio) => set current action type to buffer replacing previous value
    ** In listener check the value in buffer and compare with arguments
    ** setState or ingore
    */
    /* Task -1 => set to WaitBuffer to lastPlace
    ** In listener check wait buffer - pick first and remove
    **
    */
    return function (props) {
        var system = useSystem();
        var store = {}; // get from context
        var initialState = store.getState().module;
        var _a = __read(useState(initialState), 2), state = _a[0], setState = _a[1];
        useEffect(function () {
            store.subscribe(function () {
                var task = system.taksQueue.getCurrentTask();
                if (task && matchActionType(task, condition)) {
                    setState(store.getState().module);
                }
            });
        }, []);
        return React.createElement(WrappedComponent, { state: state, props: props });
    };
}; };
//# sourceMappingURL=index.js.map