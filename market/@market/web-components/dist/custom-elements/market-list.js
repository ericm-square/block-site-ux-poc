import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';
import { a as asyncRequestAnimationFrame } from './raf.js';
import { R as Reorderable } from './reorderable.js';
import { i as isDraggable } from './draggable.js';
import { i as isValueEmpty, g as getItemSelectableType, L as ListItemSelectableType, a as isValidControl } from './utils2.js';
import { S as Stack, b as baseIsEqual, k as keys, s as setToArray, a as SetCache, c as cacheHas } from './_baseIsEqual.js';
import { i as isObject } from './isObject.js';
import { b as baseGet, i as isKey, t as toKey, h as hasIn } from './hasIn.js';
import { i as identity } from './identity.js';
import { i as isArray } from './_Map.js';
import { S as Set$1 } from './_getTag.js';

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set$1 && (1 / setToArray(new Set$1([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set$1(values);
};

const createSet$1 = createSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet$1(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee)) : [];
}

const marketListCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:block}::slotted(.market-action-card){margin-bottom:var(--action-card-spacing)}::slotted(.market-input-search){margin-bottom:var(--core-metrics-spacing-100)}.hidden,::slotted(.hidden){display:none}::slotted(.market-row.hide-bottom-border)::before{display:none}.market-empty-state,::slotted(.market-empty-state){padding-right:0;padding-left:0;border:0}::slotted(.market-drag-cursor){--drag-cursor-height:4px;display:block;height:0;outline:calc(var(--drag-cursor-height) / 2) solid var(--core-emphasis-fill-color);pointer-events:none}";
const MarketListStyle0 = marketListCss;

const MarketList$1 = /*@__PURE__*/ proxyCustomElement(class MarketList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketListSelectionsDidChange = createEvent(this, "marketListSelectionsDidChange", 7);
        this.marketListSlotChange = createEvent(this, "marketListSlotChange", 7);
        this.marketListItemsReordered = createEvent(this, "marketListItemsReordered", 3);
        this.marketListItemsFiltered = createEvent(this, "marketListItemsFiltered", 7);
        this.observers = {};
        this.value = '';
        this.interactive = false;
        this.transient = false;
        this.multiselect = false;
        this.name = undefined;
        this.filterStrategy = 'textcontent';
        this.reorderable = 'off';
        this.reorderMode = 'default';
        this.hideSelectableCount = false;
        this.hasSearch = false;
        this.items = undefined;
        this.selections = new Set();
        this.filteredItems = undefined;
    }
    reorderableWatcher() {
        this.setReorderable();
    }
    valueWatcher() {
        this.setSelectionsFromValue();
    }
    hideSelectableCountWatcher() {
        this.injectCountOnControlRow();
    }
    /* Listen for the marketRowSelected event which is emitted by slotted market-row elements
    when they are clicked */
    rowSelectedEventHandler(e) {
        this.handleItemSelectedEvent(e.target);
    }
    /* Listen for the marketRowDeselected event which is emitted by slotted market-row elements
    when they are clicked */
    rowDeselectedEventHandler(e) {
        this.handleItemDeselectedEvent(e.target);
    }
    /* Listen for the marketCardSelected event which is emitted by slotted market-action-card elements
    when they are clicked */
    cardSelectedEventHandler(e) {
        this.handleItemSelectedEvent(e.target);
    }
    /* Listen for the marketCardDeselected event which is emitted by slotted market-action-card elements
    when they are clicked */
    cardDeselectedEventHandler(e) {
        this.handleItemDeselectedEvent(e.target);
    }
    /**
     * Listen for `marketInputSearchValueChange` which is emitted by the slotted `market-input-search`
     */
    marketInputSearchValueChangeEventHander({ detail }) {
        this.filterItems(detail.value);
    }
    getEventSelectionDetails() {
        const prevSelectionValues = (() => {
            if (typeof this.value === 'string') {
                return this.value ? this.value.split(',').filter((value) => !isValueEmpty(value)) : [];
            }
            else if (Array.isArray(this.value)) {
                return this.value.filter((value) => !isValueEmpty(value));
            }
            return this.value;
        })();
        const currentSelections = uniqBy([...this.selections].filter((item) => item !== this.controlRow), (item) => item.value);
        const currentSelectionValues = currentSelections.reduce((items, item) => {
            if (!isValueEmpty(item.value)) {
                items.push(item.value);
            }
            return items;
        }, []);
        return { currentSelections, currentSelectionValues, prevSelectionValues };
    }
    handleItemSelectedEvent(selectedItem) {
        if (selectedItem === this.controlRow) {
            this.selectAllItems();
        }
        else {
            this.selectItem(selectedItem);
        }
        const { currentSelections, currentSelectionValues, prevSelectionValues } = this.getEventSelectionDetails();
        this.value = currentSelectionValues.join(','); // reflect to DOM
        this.marketListSelectionsDidChange.emit({
            newSelection: selectedItem,
            newSelectionValue: selectedItem.value,
            newDeselection: null,
            newDeselectionValue: null,
            currentSelections,
            currentSelectionValues,
            prevSelectionValues,
        });
    }
    handleItemDeselectedEvent(deselectedItem) {
        // We check to see if the element is in our selections, since we may have
        // already manually deselected it due to another element being clicked.
        // We only want the code in the block to fire when `marketRowDeselected` is being
        // emitted due to a merchant actually clicking to deselect an element.
        if (!this.selections.has(deselectedItem)) {
            return;
        }
        if (deselectedItem === this.controlRow) {
            /**
             * special case: when the only remaining selected items are disabled,
             * the control row's checkbox will be indeterminate (expected UI behavior).
             * when normally, clicking a row with an indeterminate checkbox selects all,
             * in this case, we want it to select all (non-disabled items) instead.
             */
            const shouldSelectAll = (() => {
                var _a, _b;
                const items = ((_b = (_a = this.filteredItems) === null || _a === void 0 ? void 0 : _a.visible) !== null && _b !== void 0 ? _b : this.items).filter((item) => item !== this.controlRow);
                const nonDisabledItems = items.filter((item) => !item.disabled);
                return nonDisabledItems.every((item) => !item.selected);
            })();
            if (shouldSelectAll) {
                this.selectAllItems();
            }
            else {
                this.deselectAllItems();
            }
        }
        else {
            this.deselectItem(deselectedItem);
        }
        const { currentSelections, currentSelectionValues, prevSelectionValues } = this.getEventSelectionDetails();
        this.value = currentSelectionValues.join(','); // reflect to DOM
        this.marketListSelectionsDidChange.emit({
            newSelection: null,
            newSelectionValue: null,
            newDeselection: deselectedItem,
            newDeselectionValue: deselectedItem.value,
            currentSelections,
            currentSelectionValues,
            prevSelectionValues,
        });
    }
    /**
     * Selects a given option from the list. Also handles deselecting
     * all other elements when not in multiselect mode.
     */
    selectItem(selectedItem) {
        /* Only if this list is interactive and *doesn't* allow multiple selections,
        deselect all the options except the one that was just selected */
        if (this.interactive) {
            if (!this.multiselect) {
                this.deselectItems([selectedItem]);
                this.selections = new Set([selectedItem]);
            }
            else {
                this.selections.add(selectedItem);
            }
        }
    }
    /**
     * Selects all multiselect list options.
     */
    selectAllItems() {
        var _a;
        if (!this.items || !this.interactive || !this.multiselect) {
            return;
        }
        // if items are being filtered, "Select all" only applies to visible items
        // and then filter all non-disabled items to already selected items (might include disabled items)
        const selectableItems = (((_a = this.filteredItems) === null || _a === void 0 ? void 0 : _a.visible) || this.items).filter((item) => !item.disabled);
        this.selections = new Set([...this.selections.values(), ...selectableItems]);
    }
    /**
     * Deselects a given option from the list.
     */
    deselectItem(deselectedItem) {
        this.selections.delete(deselectedItem);
    }
    /**
     * Deselects all other items other than the ones that were just selected.
     */
    deselectItems(selectedItems) {
        if (!this.items) {
            return;
        }
        this.items.forEach((item) => {
            /* Check to make sure the item isn't in the list of
              selected items (likely only the one that was just
              selected and triggered the callback) */
            if (!selectedItems.includes(item) && item.selected) {
                item.deselect();
            }
        });
    }
    /**
     * Deselects all list options.
     */
    deselectAllItems() {
        var _a, _b;
        if (!this.selections || !this.interactive) {
            return;
        }
        /**
         * If items are being filtered, only deselect visible items.
         * Disabled items will not be deselected.
         */
        const visibleItemsSet = new Set((_b = (_a = this.filteredItems) === null || _a === void 0 ? void 0 : _a.visible) !== null && _b !== void 0 ? _b : this.items);
        const selectedItemsToKeep = [...this.selections].filter((selectedItem) => {
            return selectedItem.disabled || !visibleItemsSet.has(selectedItem);
        });
        this.selections = new Set(selectedItemsToKeep);
    }
    /**
     * If passed or updates interactive, ensure list itself is set to interactive mode.
     */
    syncListInteractiveWithItems() {
        if (this.items.length > 0 &&
            (this.items[0].tagName === getNamespacedTagFor('market-action-card').toUpperCase() ||
                (this.items[0].tagName === getNamespacedTagFor('market-row').toUpperCase() &&
                    this.items[0].interactive === true)) &&
            !this.interactive) {
            // force list to be interactive if items are interactive rows
            // (i.e. when they contain slotted controls), or
            // items are action cards (which are always interactive)
            this.interactive = true;
        }
    }
    /**
     * Processes interactive, transient, and multiselect props and propagates these props
     * to children components whenever these props are updated.
     */
    processItems() {
        this.items.forEach((item) => {
            if (item.tagName === getNamespacedTagFor('market-action-card').toUpperCase()) {
                item.transient = this.transient;
                const cardRow = item.querySelector(getNamespacedTagFor('market-row'));
                if (cardRow) {
                    this.setRowProperties(cardRow);
                }
            }
            else {
                this.setRowProperties(item);
            }
        });
    }
    getCurrentSelectionValues() {
        if (Array.isArray(this.value)) {
            return new Set(this.value);
        }
        return new Set(this.multiselect ? this.value.split(',') : [this.value]);
    }
    setRowProperties(row) {
        row.interactive = this.interactive;
        row.transient = this.transient;
        // We don't want subsequent clicks to deselect rows for single select lists
        row.togglable = this.multiselect;
    }
    /**
     * Select item that corresponds to passed value, or clear all values if value is empty string.
     */
    setSelectionsFromValue() {
        var _a;
        if (this.value || this.value === '') {
            const values = this.getCurrentSelectionValues();
            (_a = this.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                if (item === this.controlRow) {
                    // control row selection happens in syncControlRowWithSelections
                    return;
                }
                if (!isValueEmpty(this.value) && values.has(item.value)) {
                    item.silentlySelect();
                    this.selectItem(item);
                }
                else {
                    // value is '', so deselect all items
                    item.silentlyDeselect();
                    this.deselectItem(item);
                }
            });
        }
    }
    /**
     * Find any list items with the `selected` property and add to `selections`.
     */
    setSelectionsFromRowAttributes() {
        const initialSelections = new Set();
        this.items.forEach((item) => {
            if (item.selected) {
                /* TODO: Maybe figure out how to handle the case where the
                 * list is not multiselect, but more than one market-row has the
                 * [selected] attribute */
                initialSelections.add(item);
            }
        });
        this.selections = initialSelections;
    }
    setListAndItemsRoles() {
        const itemSelectableTypes = this.items.map((item) => getItemSelectableType(item));
        const allItemsHaveSameSelectableType = itemSelectableTypes.every((type) => type === ListItemSelectableType.CHECKBOX) ||
            itemSelectableTypes.every((type) => type === ListItemSelectableType.RADIO) ||
            itemSelectableTypes.every((type) => type === ListItemSelectableType.SWITCH) ||
            itemSelectableTypes.every((type) => type === ListItemSelectableType.SELECTABLE_WITHOUT_CONTROL);
        if (allItemsHaveSameSelectableType) {
            this.el.setAttribute('role', 'listbox');
            this.items.forEach((item) => {
                item.setAttribute('role', 'option');
            });
            this.el.setAttribute('aria-multiselectable', this.multiselect ? 'true' : 'false');
        }
        else {
            this.el.setAttribute('role', 'list');
            this.items.forEach((item) => {
                item.setAttribute('role', 'listitem');
            });
        }
        if (this.value) {
            this.setSelectionsFromValue();
        }
        else {
            this.setSelectionsFromRowAttributes();
        }
    }
    /**
     * Sets the initial state of the list by updating and propagating props and setting
     * default value.
     */
    setInternalState() {
        this.items = [
            ...this.el.querySelectorAll(`:scope > ${getNamespacedTagFor('market-row')}, :scope > ${getNamespacedTagFor('market-action-card')}`),
        ];
        if (this.items.length === 0) {
            return;
        }
        this.syncListInteractiveWithItems();
        this.processItems();
        this.setListAndItemsRoles();
        if (this.value) {
            this.setSelectionsFromValue();
        }
        else {
            this.setSelectionsFromRowAttributes();
        }
    }
    /**
     * Syncs the state of the slotted control row with list selections (e.g. all selected, none
     * selected, some selected).
     */
    async syncControlRowWithSelections() {
        var _a, _b;
        if (!this.controlRow) {
            return;
        }
        const slottedControl = this.controlRow.querySelector('[slot="control"]');
        const isCheckbox = slottedControl.tagName.toLowerCase() === getNamespacedTagFor('market-checkbox');
        const items = ((_b = (_a = this.filteredItems) === null || _a === void 0 ? void 0 : _a.visible) !== null && _b !== void 0 ? _b : this.items).filter((item) => item !== this.controlRow);
        const controlRowStatus = (() => {
            if (items.every((item) => item.selected)) {
                // all non-disabled items are selected
                return 'checked';
            }
            else if (items.some((item) => item.selected)) {
                // at least one is selected (regardless if it's disabled or not)
                return 'indeterminate';
            }
            else {
                return 'unchecked';
            }
        })();
        switch (controlRowStatus) {
            case 'unchecked':
                // no options selected, deselect control row
                this.deselectItem(this.controlRow);
                await this.controlRow.silentlyDeselect();
                await asyncRequestAnimationFrame(); // prevents flash where it goes from indeterminate -> checked -> unchecked
                slottedControl.removeAttribute('indeterminate');
                break;
            case 'checked':
                // all options selected, select control row
                await this.controlRow.silentlySelect();
                this.selectItem(this.controlRow);
                slottedControl.removeAttribute('indeterminate');
                break;
            case 'indeterminate':
                // some options selected
                if (isCheckbox) {
                    // control row gets selected, checkbox set to indeterminate
                    await this.controlRow.silentlySelect();
                    this.selectItem(this.controlRow);
                    await asyncRequestAnimationFrame(); // prevents bug where checkbox becomes checked but not indeterminate
                    slottedControl.setAttribute('indeterminate', '');
                }
                else {
                    // control row gets deselected
                    await this.controlRow.silentlyDeselect();
                    this.deselectItem(this.controlRow);
                }
                break;
        }
        this.injectCountOnControlRow();
    }
    /**
     * Injects an accessory to the control row that displays the number of items;
     * or edit that accessory's text content if the element already exists.
     *
     * Disabled items are not included in the count.
     *
     * Count is only rendered when `hideSelectableCount` is `false`, which it is by default.
     */
    injectCountOnControlRow() {
        if (!this.controlRow) {
            return;
        }
        const countAccessoryEl = this.controlRow.querySelector('.count[slot="trailing-accessory"]');
        if (this.hideSelectableCount) {
            if (countAccessoryEl) {
                this.controlRow.removeChild(countAccessoryEl);
            }
            return;
        }
        const count = this.filteredItems.visible.filter((item) => !item.disabled).length;
        if (countAccessoryEl) {
            countAccessoryEl.textContent = `${count}`;
        }
        else {
            const newEl = document.createElement('span');
            newEl.classList.add('count');
            newEl.setAttribute('slot', 'trailing-accessory');
            newEl.textContent = `${count}`;
            this.controlRow.appendChild(newEl);
        }
    }
    /**
     * Filters items based on search query inputted in slotted `market-input-search`
     */
    filterItems(query) {
        var _a;
        const filteredItems = this.items.reduce((filteredItems, item) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            if (item.getAttribute('slot') === 'control-row') {
                // filteredItems will not contain the control row as it isn't needed for logic purposes
                return filteredItems;
            }
            else if (!query) {
                // if there's no search query, all items are visible
                filteredItems.visible.push(item);
                return filteredItems;
            }
            else if (typeof this.filterStrategy === 'function') {
                // attempts to call the provided function
                const callbackResult = this.filterStrategy({
                    item,
                    label: (_a = item.querySelector('[slot="label"]')) === null || _a === void 0 ? void 0 : _a.textContent,
                    query,
                    textContent: item.textContent,
                    value: item.value,
                });
                if (callbackResult) {
                    filteredItems.visible.push(item);
                    return filteredItems;
                }
            }
            else if (((_c = (_b = this.filterStrategy) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase) === null || _c === void 0 ? void 0 : _c.call(_b)) === 'textcontent') {
                // search through the entire item's textContent
                const isFound = ((_d = item === null || item === void 0 ? void 0 : item.textContent) === null || _d === void 0 ? void 0 : _d.search(new RegExp(query, 'i'))) >= 0;
                if (isFound) {
                    filteredItems.visible.push(item);
                    return filteredItems;
                }
            }
            else if (((_f = (_e = this.filterStrategy) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase) === null || _f === void 0 ? void 0 : _f.call(_e)) === 'label') {
                // only works if there's a slotted label
                const labelEl = item.querySelector('[slot="label"]');
                const isFound = ((_g = labelEl === null || labelEl === void 0 ? void 0 : labelEl.textContent) === null || _g === void 0 ? void 0 : _g.search(new RegExp(query, 'i'))) >= 0;
                if (isFound) {
                    filteredItems.visible.push(item);
                    return filteredItems;
                }
            }
            else if (((_j = (_h = this.filterStrategy) === null || _h === void 0 ? void 0 : _h.toLocaleLowerCase) === null || _j === void 0 ? void 0 : _j.call(_h)) === 'value') {
                // if the item's value isn't a string, it may not work well UX-wise
                const value = String(item.value);
                const isFound = value.search(new RegExp(query)) >= 0;
                if (isFound) {
                    filteredItems.visible.push(item);
                    return filteredItems;
                }
            }
            // item didn't pass any of the conditions / filter strategies above
            filteredItems.hidden.push(item);
            return filteredItems;
        }, {
            visible: [],
            hidden: [],
            visibleSelected: [],
            selected: [],
        });
        // DOM manipulation
        requestAnimationFrame(() => {
            var _a;
            // make sure that visible items are visible, hidden items are hidden
            filteredItems.visible.forEach((item) => item.classList.remove('hidden'));
            filteredItems.hidden.forEach((item) => item.classList.add('hidden'));
            // hide last visible item's bottom border
            this.items.forEach((item) => item.classList.remove('hide-bottom-border'));
            if (filteredItems.visible.length > 0) {
                const lastVisibleItem = filteredItems.visible[filteredItems.visible.length - 1];
                lastVisibleItem.classList.add('hide-bottom-border');
            }
            // hide control row if there are no search results
            (_a = this.controlRow) === null || _a === void 0 ? void 0 : _a.classList.toggle('hidden', filteredItems.visible.length === 0);
        });
        // will not emit when the list is initially rendered without a search query
        if (this.filteredItems || (!this.filteredItems && query)) {
            this.marketListItemsFiltered.emit({
                items: filteredItems.visible,
                prevItems: (_a = this.filteredItems) === null || _a === void 0 ? void 0 : _a.visible,
            });
        }
        // this triggers a re-render since `this.filteredItems` is a `@State`
        this.filteredItems = filteredItems;
        this.updateSelectedItemsInFilteredItems();
    }
    updateSelectedItemsInFilteredItems() {
        if (!this.filteredItems) {
            return;
        }
        this.filteredItems.selected = this.items.filter((item) => item.getAttribute('slot') !== 'control-row' && item.selected);
        this.filteredItems.visibleSelected = this.filteredItems.visible.filter((item) => item.getAttribute('slot') !== 'control-row' && item.selected);
    }
    /* SLOTCHANGE HANDLERS */
    handleSearchSlotchange() {
        var _a;
        this.inputSearchEl = this.el.querySelector('[slot="search"]');
        this.hasSearch = Boolean(this.inputSearchEl);
        this.filterItems((_a = this.inputSearchEl) === null || _a === void 0 ? void 0 : _a.value);
    }
    defaultSlotchangeHandler() {
        var _a;
        this.setInternalState();
        this.filterItems((_a = this.inputSearchEl) === null || _a === void 0 ? void 0 : _a.value);
        this.setReorderable();
        this.marketListSlotChange.emit();
    }
    /**
     * Rows slotted into the "control-row" slot only function as such if the list is interactive and
     * multiselect and the row contains a valid slotted control (checkbox or toggle).
     */
    controlRowSlotchangeHandler() {
        if (!this.interactive || !this.multiselect) {
            return;
        }
        const slottedRow = this.el.querySelector('[slot="control-row"]');
        const slottedControl = slottedRow === null || slottedRow === void 0 ? void 0 : slottedRow.querySelector('[slot="control"]');
        this.controlRow = isValidControl(slottedControl) ? slottedRow : undefined;
    }
    /**
     * Show empty state if:
     * - list isn't empty, but
     * - there is a search query, and
     * - there are no search results
     */
    setEmptyStateVisibility() {
        var _a, _b;
        const emptyStateEl = this.el.querySelector('[slot="empty-state"]') ||
            this.el.shadowRoot.querySelector(getNamespacedTagFor('market-empty-state'));
        const willShowEmptyState = ((_a = this.inputSearchEl) === null || _a === void 0 ? void 0 : _a.value) && !((_b = this.filteredItems) === null || _b === void 0 ? void 0 : _b.visible.length);
        emptyStateEl === null || emptyStateEl === void 0 ? void 0 : emptyStateEl.classList.toggle('hidden', !willShowEmptyState);
    }
    /**
     * Updates the count that is injected to the control row
     * when there’s a change on an item’s `disabled` attribute.
     */
    initItemDisabledAttributeObserver() {
        if (this.observers.itemDisabledAttribute) {
            return;
        }
        this.observers.itemDisabledAttribute = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.target.parentElement === this.el &&
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'disabled') {
                    this.injectCountOnControlRow();
                }
            }
        });
        this.observers.itemDisabledAttribute.observe(this.el, {
            attributes: true,
            attributeFilter: ['disabled'],
            childList: true,
            subtree: true,
        });
    }
    /* LIFECYCLE EVENTS */
    connectedCallback() {
        this.syncControlRowWithSelections();
    }
    componentWillLoad() {
        var _a;
        this.setInternalState();
        this.filterItems((_a = this.inputSearchEl) === null || _a === void 0 ? void 0 : _a.value);
    }
    componentWillRender() {
        this.syncListInteractiveWithItems();
        this.processItems();
        this.setListAndItemsRoles();
        this.updateSelectedItemsInFilteredItems();
        this.controlRowSlotchangeHandler();
        this.syncControlRowWithSelections();
        this.setEmptyStateVisibility();
    }
    componentDidLoad() {
        this.initItemDisabledAttributeObserver();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.observers.itemDisabledAttribute) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    /*
      KEYBOARD ACCESSIBILITY
  
      tabbing goes through rows (and slotted controls, if any) once before moving
      on to rest of page content
  
      once list has focus, up/down arrows can move focus up/down, stopping at end
      of list rather than cycling through (similar to native html <select>)
      - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  
      if slotted row contents have focus, up/down arrows do nothing
    */
    handleKeydown(e) {
        switch (e.key) {
            case 'ArrowDown':
                this.handleArrowDown(e);
                break;
            case 'ArrowUp':
                this.handleArrowUp(e);
                break;
        }
    }
    handleArrowDown(e) {
        const focused = this.el.querySelector(':focus');
        const prevFocusedRowIndex = [...this.items].indexOf(focused);
        // return if no rows are focused
        if (prevFocusedRowIndex === -1) {
            return;
        }
        // focus next enabled row
        for (let i = prevFocusedRowIndex + 1; i < this.items.length; i++) {
            if (!this.items[i].disabled) {
                this.items[i].focus();
                break;
            }
        }
        e.preventDefault(); // down arrow should not scroll page
    }
    handleArrowUp(e) {
        const focused = this.el.querySelector(':focus');
        const prevFocusedRowIndex = [...this.items].indexOf(focused);
        // return if no rows are focused
        if (prevFocusedRowIndex === -1) {
            return;
        }
        // focus last enabled row
        for (let i = prevFocusedRowIndex - 1; i >= 0; i--) {
            if (!this.items[i].disabled) {
                this.items[i].focus();
                break;
            }
        }
        e.preventDefault(); // up arrow should not scroll page
    }
    /**
     * Focuses the row at the given index.
     * @param index - The index of the row to focus.
     * @returns A promise that resolves when the row is focused.
     */
    async focusRowAtIndex(index) {
        const row = this.items[index];
        if (row) {
            row.focus();
            return Promise.resolve();
        }
        else {
            return Promise.reject(new Error(`Row at index ${index} not found`));
        }
    }
    setReorderable() {
        const { el, items, controlRow, reorderable, reorderMode, reorder, marketListItemsReordered } = this;
        if (reorderable === 'off') {
            reorder === null || reorder === void 0 ? void 0 : reorder.destroy();
            this.reorder = null;
        }
        else if (!reorder) {
            this.reorder = new Reorderable({
                el,
                accepts: [`${getNamespacedTagFor('market-row')}:not([slot="control"])`],
                event: marketListItemsReordered,
                mode: reorderMode,
            });
        }
        items === null || items === void 0 ? void 0 : items.forEach((item) => {
            if (!isDraggable(item))
                return;
            if (item === controlRow)
                return; // control row is not reorderable
            item.dragEnabled = reorderable !== 'off';
        });
    }
    onDragMove(e) {
        var _a;
        (_a = this.reorder) === null || _a === void 0 ? void 0 : _a.dragMove(e);
    }
    onDragLeave() {
        var _a;
        (_a = this.reorder) === null || _a === void 0 ? void 0 : _a.dragLeave();
    }
    onDragEnd(e) {
        var _a;
        (_a = this.reorder) === null || _a === void 0 ? void 0 : _a.dragEnd(e);
    }
    onDragDrop(e) {
        var _a;
        (_a = this.reorder) === null || _a === void 0 ? void 0 : _a.dragDrop(e);
    }
    componentDidRender() {
        this.setReorderable();
    }
    render() {
        var _a;
        const MarketEmptyState = getNamespacedTagFor('market-empty-state');
        return (h(Host, { key: 'f01372045695a9776c6318303fecd322561cdb1d', class: "market-list", "aria-labelledby": this.name, "has-search": this.hasSearch, onKeydown: (e) => this.handleKeydown(e), onMarketDragMove: (e) => this.onDragMove(e), onMarketDragLeave: () => this.onDragLeave(), onMarketDragEnd: (e) => this.onDragEnd(e), onMarketDragDrop: (e) => this.onDragDrop(e) }, h("slot", { key: 'e5a0f3a54f00422e2a116d5958a1d733d4aea540', name: "search", onSlotchange: () => this.handleSearchSlotchange() }), h("slot", { key: '3aaca12e5456bc8df62bf982d00a997ffdd6a6d8', name: "control-row", onSlotchange: () => this.controlRowSlotchangeHandler() }), h("slot", { key: '2b528867d3784890f0f54619b302c223eee4cdd5', onSlotchange: () => this.defaultSlotchangeHandler() }), h("slot", { key: '7d6f8a7cf5a9add9811afe49fe24621260887769', name: "empty-state" }, h(MarketEmptyState, { key: 'af825be4ce90fa63ec83b1f2fda05abb47401750', class: "hidden" }, h("svg", { key: '9088bd651dca4d4beaaf6b22e1917af118767e21', height: "40", slot: "media", viewBox: "0 0 40 40", width: "40", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '795ff6d2afc5584c7b516e60fa385af8964e24be', d: "M34.4667 17.2L28.1 10.8333H26.6667C26.6667 9.45 25.55 8.33333 24.1667 8.33333C22.7834 8.33333 21.6667 9.45 21.6667 10.8333H18.3334C18.3334 9.45 17.2167 8.33333 15.8334 8.33333C14.45 8.33333 13.3334 9.45 13.3334 10.8333H11.9L5.53337 17.2C4.11671 18.6167 3.33337 20.5 3.33337 22.5C3.33337 26.6333 6.70004 30 10.8334 30C14.8 30 18.0167 26.9 18.2834 23.0167C18.8167 23.2167 19.4 23.3333 20 23.3333C20.6 23.3333 21.1834 23.2167 21.7167 23.0167C21.9834 26.9 25.2 30 29.1667 30C33.3 30 36.6667 26.6333 36.6667 22.5C36.6667 20.5 35.8834 18.6167 34.4667 17.2ZM10.8334 26.6667C8.53337 26.6667 6.66671 24.8 6.66671 22.5C6.66671 21.3833 7.10004 20.3333 7.88337 19.55C8.66671 18.7667 9.71671 18.3333 10.8334 18.3333C13.1334 18.3333 15 20.2 15 22.5C15 24.8 13.1334 26.6667 10.8334 26.6667ZM15.35 16.55C14.4667 15.8833 13.4334 15.3833 12.3 15.15L13.2667 14.1667H17.2334C16.3834 14.7333 15.7167 15.5667 15.35 16.55ZM20 20C19.0834 20 18.3334 19.25 18.3334 18.3333C18.3334 17.4167 19.0834 16.6667 20 16.6667C20.9167 16.6667 21.6667 17.4167 21.6667 18.3333C21.6667 19.25 20.9167 20 20 20ZM22.75 14.1667H26.7167L27.7 15.15C26.5667 15.3833 25.5334 15.8833 24.65 16.55C24.2834 15.5667 23.6167 14.7333 22.75 14.1667ZM29.1667 26.6667C26.8667 26.6667 25 24.8 25 22.5C25 20.2 26.8667 18.3333 29.1667 18.3333C30.2834 18.3333 31.3334 18.7667 32.1167 19.55C32.9 20.3333 33.3334 21.3833 33.3334 22.5C33.3334 24.8 31.4667 26.6667 29.1667 26.6667Z", fill: "var(--core-text-10-color)", "fill-opacity": "0.9" })), h("h3", { key: '2ed929f1c74989aa9df9809fa509f8c037d05d9b', slot: "primary-text" }, h("slot", { key: 'eb5ab0008deb0ca384e32a02448f72e836837b2a', name: "empty-state-primary-text" }, "No search results for \u201C", (_a = this.inputSearchEl) === null || _a === void 0 ? void 0 :
            _a.value, "\u201D")), h("p", { key: 'd0cb3833586c6b08307cb3529876a44d3668be4c', slot: "secondary-text" }, h("slot", { key: '690ffc4bb1f6c81d12ce44aca5aea14d1e8c1bec', name: "empty-state-secondary-text" }, "Try a different search."))))));
    }
    get el() { return this; }
    static get watchers() { return {
        "reorderable": ["reorderableWatcher"],
        "value": ["valueWatcher"],
        "hideSelectableCount": ["hideSelectableCountWatcher"]
    }; }
    static get style() { return MarketListStyle0; }
}, [1, "market-list", {
        "value": [1537],
        "interactive": [1028],
        "transient": [4],
        "multiselect": [516],
        "name": [1],
        "filterStrategy": [1, "filter-strategy"],
        "reorderable": [513],
        "reorderMode": [1, "reorder-mode"],
        "hideSelectableCount": [516, "hide-selectable-count"],
        "hasSearch": [32],
        "items": [32],
        "selections": [32],
        "filteredItems": [32],
        "focusRowAtIndex": [64]
    }, [[0, "marketRowSelected", "rowSelectedEventHandler"], [0, "marketRowDeselected", "rowDeselectedEventHandler"], [0, "marketCardSelected", "cardSelectedEventHandler"], [0, "marketCardDeselected", "cardDeselectedEventHandler"], [0, "marketInputSearchValueChange", "marketInputSearchValueChangeEventHander"]], {
        "reorderable": ["reorderableWatcher"],
        "value": ["valueWatcher"],
        "hideSelectableCount": ["hideSelectableCountWatcher"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-list"];
    components.forEach(tagName => { switch (tagName) {
        case "market-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketList$1);
            }
            break;
    } });
}

const MarketList = MarketList$1;
const defineCustomElement = defineCustomElement$1;

export { MarketList, defineCustomElement };

//# sourceMappingURL=market-list.js.map