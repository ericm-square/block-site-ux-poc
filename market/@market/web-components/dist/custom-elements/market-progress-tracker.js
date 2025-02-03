import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { i as isElementWithTagName } from './index2.js';
import { c as castPath, t as toKey, b as baseGet, h as hasIn } from './hasIn.js';
import { d as defineProperty, s as setToString, o as overRest } from './_overRest.js';
import { e as eq, a as arrayPush, i as isIndex } from './_arrayPush.js';
import { S as Symbol, i as isObject } from './isObject.js';
import { i as isArray, a as isArguments } from './_Map.js';

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

const pick$1 = pick;

const marketProgressTrackerCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;flex-direction:column;margin:0;padding:0;list-style:none}:host([orientation=\"horizontal\"]){flex-direction:row}:host([orientation=\"horizontal\"][size=\"small\"]:not([compact]):not([interactive])){gap:var(--tracker-horizontal-orientation-connectors-density-small-size-current-state-step-spacing)}:host([orientation=\"horizontal\"][size=\"medium\"]:not([compact]):not([interactive])){gap:var(--tracker-horizontal-orientation-connectors-density-medium-size-current-state-step-spacing)}:host([orientation=\"horizontal\"][size=\"large\"]:not([compact]):not([interactive])){gap:var(--tracker-horizontal-orientation-connectors-density-large-size-current-state-step-spacing)}:host([orientation=\"horizontal\"][size=\"small\"][compact]:not([interactive])){gap:var(--tracker-horizontal-orientation-compact-density-small-size-current-state-step-spacing)}:host([orientation=\"horizontal\"][size=\"medium\"][compact]:not([interactive])){gap:var(--tracker-horizontal-orientation-compact-density-medium-size-current-state-step-spacing)}:host([orientation=\"horizontal\"][size=\"large\"][compact]:not([interactive])){gap:var(--tracker-horizontal-orientation-compact-density-large-size-current-state-step-spacing)}:host([orientation=\"horizontal\"][compact][interactive]){gap:0}";
const MarketProgressTrackerStyle0 = marketProgressTrackerCss;

const MarketProgressTracker$1 = /*@__PURE__*/ proxyCustomElement(class MarketProgressTracker extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.compact = false;
        this.connectorless = false;
        this.currentStepIndex = undefined;
        this.indicator = undefined;
        this.interactive = false;
        this.orientation = 'vertical';
        this.reversed = false;
        this.size = 'medium';
    }
    marketProgressTrackerStepClickEventHandler(event) {
        const { defaultPrevented, detail: { index }, } = event;
        // state will be updated only if `currentStepIndex` is defined
        if (!defaultPrevented && this.currentStepIndex !== undefined) {
            this.currentStepIndex = index;
        }
    }
    currentStepIndexWatcher() {
        this.updateStepState();
    }
    reversedWatcher() {
        this.updateStepState();
    }
    otherPropsWatcher(newValue, propKey) {
        this.propagatePropsToSteps({ [propKey]: newValue });
    }
    get stepEls() {
        return [...this.el.children].filter((childEl) => isElementWithTagName(childEl, 'market-progress-tracker-step'));
    }
    updateStepState() {
        var _a;
        const { connectorless, currentStepIndex, reversed, stepEls } = this;
        const orderedSteps = reversed ? [...stepEls].reverse() : stepEls; // logical order
        // set `data-step-index` based on logical order
        orderedSteps.forEach((stepEl, index) => {
            stepEl.dataset.stepIndex = `${index}`;
        });
        // automatically updates steps’ `completed` and `active` states if `currentStepIndex` is defined
        if (currentStepIndex !== undefined) {
            orderedSteps.forEach((stepEl, index) => {
                stepEl.completed = index < currentStepIndex;
                stepEl.active = index === currentStepIndex;
            });
        }
        const activeIndex = (_a = currentStepIndex !== null && currentStepIndex !== void 0 ? currentStepIndex : orderedSteps.findIndex((stepEl) => stepEl.active)) !== null && _a !== void 0 ? _a : -1;
        stepEls.forEach((stepEl, index) => {
            if (index < stepEls.length - 1) {
                if (connectorless) {
                    stepEl.connector = null;
                }
                else if ((reversed && index >= stepEls.length - activeIndex - 1) || (!reversed && index < activeIndex)) {
                    stepEl.connector = 'active';
                }
                else {
                    stepEl.connector = 'inactive';
                }
            }
            else {
                /**
                 * visually hides the last item’s connector:
                 *  - null:   progress tracker is connectorless
                 *  - hidden: progress tracker has connectors, but only the last step’s connector is hidden
                 * note that this has styling implications
                 */
                stepEl.connector = connectorless ? null : 'hidden';
            }
        });
    }
    /**
     * Updates the steps’ props based on the provided prop-value pair(s)
     */
    propagatePropsToSteps(propValues) {
        this.stepEls.forEach((stepEl) => {
            var _a, _b, _c, _d, _e;
            stepEl.compact = (_a = propValues === null || propValues === void 0 ? void 0 : propValues.compact) !== null && _a !== void 0 ? _a : stepEl.compact;
            stepEl.indicator = (_b = propValues === null || propValues === void 0 ? void 0 : propValues.indicator) !== null && _b !== void 0 ? _b : stepEl.indicator;
            stepEl.interactive = (_c = propValues === null || propValues === void 0 ? void 0 : propValues.interactive) !== null && _c !== void 0 ? _c : stepEl.interactive;
            stepEl.orientation = (_d = propValues === null || propValues === void 0 ? void 0 : propValues.orientation) !== null && _d !== void 0 ? _d : stepEl.orientation;
            stepEl.size = (_e = propValues === null || propValues === void 0 ? void 0 : propValues.size) !== null && _e !== void 0 ? _e : stepEl.size;
        });
    }
    handleDefaultSlotChange() {
        this.propagatePropsToSteps(pick$1(this, 'compact', 'indicator', 'interactive', 'orientation', 'size'));
        this.updateStepState();
    }
    connectedCallback() {
        this.propagatePropsToSteps(pick$1(this, 'compact', 'indicator', 'interactive', 'orientation', 'size'));
        this.updateStepState();
    }
    render() {
        const { handleDefaultSlotChange, interactive } = this;
        return (h(Host, { key: '6641d3c058d83c786d2666dfce3992da9d3ef13c', class: "market-progress-tracker", role: interactive ? 'tablist' : 'list' }, h("slot", { key: '531a425b494e0a91a5845da60b4a155b9eccdc86', onSlotchange: handleDefaultSlotChange.bind(this) })));
    }
    get el() { return this; }
    static get watchers() { return {
        "currentStepIndex": ["currentStepIndexWatcher"],
        "reversed": ["reversedWatcher"],
        "compact": ["otherPropsWatcher"],
        "indicator": ["otherPropsWatcher"],
        "interactive": ["otherPropsWatcher"],
        "orientation": ["otherPropsWatcher"],
        "size": ["otherPropsWatcher"]
    }; }
    static get style() { return MarketProgressTrackerStyle0; }
}, [1, "market-progress-tracker", {
        "compact": [4],
        "connectorless": [4],
        "currentStepIndex": [1538, "current-step-index"],
        "indicator": [1],
        "interactive": [4],
        "orientation": [1],
        "reversed": [4],
        "size": [513]
    }, [[0, "marketProgressTrackerStepClick", "marketProgressTrackerStepClickEventHandler"]], {
        "currentStepIndex": ["currentStepIndexWatcher"],
        "reversed": ["reversedWatcher"],
        "compact": ["otherPropsWatcher"],
        "indicator": ["otherPropsWatcher"],
        "interactive": ["otherPropsWatcher"],
        "orientation": ["otherPropsWatcher"],
        "size": ["otherPropsWatcher"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-progress-tracker"];
    components.forEach(tagName => { switch (tagName) {
        case "market-progress-tracker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketProgressTracker$1);
            }
            break;
    } });
}

const MarketProgressTracker = MarketProgressTracker$1;
const defineCustomElement = defineCustomElement$1;

export { MarketProgressTracker, defineCustomElement };

//# sourceMappingURL=market-progress-tracker.js.map