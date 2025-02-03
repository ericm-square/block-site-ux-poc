import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { c as cjs } from './index-0ae5b082.js';
import { c as classNames } from './classnames-84eaa2b2.js';
import { D as Draggable } from './draggable-dbb6e789.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';
import { a as asyncRequestAnimationFrame } from './raf-ac8923ee.js';
import { a as isCheckboxElement, b as isRadioElement, c as isToggleElement } from './element-type-guard-08daa588.js';
import { b as isArrayLike, i as isBuffer, a as isTypedArray, g as getTag, d as isPrototype, c as baseKeys } from './_getTag-40eee50c.js';
import { i as isArray, a as isArguments } from './_Map-5d7abd2f.js';
import './max-z-index-7a974719.js';
import './_getNative-e422aac7.js';
import './isObject-f305a0d7.js';

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

/**
 * @param {unknown} el - Element to be checked
 * @returns {boolean} Whether `el` is a `TMarketRowValidControlElement`
 */
function isValidRowControl(el) {
    return isCheckboxElement(el) || isRadioElement(el) || isToggleElement(el);
}

const marketRowCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--transition-duration:0.2s;--row-horizontal-spacing:16px;position:relative;display:block;margin:0 calc(-1 * var(--row-normal-variant-background-horizontal-outset-padding));background-color:var(--row-normal-variant-normal-state-background-color);transition:background-color var(--transition-duration)}:host::before{content:\"\";position:absolute;right:var(--row-normal-variant-background-horizontal-outset-padding);bottom:0;left:var(--row-normal-variant-background-horizontal-outset-padding);display:block;height:var(--row-normal-variant-separator-height);background-color:var(--row-normal-variant-normal-state-separator-color)}:host(:last-of-type)::before{content:none}.container{display:flex;justify-content:space-between;align-items:center;height:100%;padding-right:var(--row-normal-variant-background-horizontal-outset-padding);padding-left:var(--row-normal-variant-background-horizontal-outset-padding);outline:none;text-decoration:none;-moz-column-gap:var(--row-horizontal-spacing);column-gap:var(--row-horizontal-spacing)}.main{display:flex;flex-grow:2;flex-direction:column;min-width:0}.side{display:flex;flex-direction:column;text-align:right}.drill-icon{flex-shrink:0;fill:var(--row-normal-variant-normal-state-drill-color)}.hidden{display:none;}::slotted(*){cursor:inherit}::slotted([slot=\"label\"]){display:block;margin:0;color:var(--row-normal-variant-normal-state-text-color)}::slotted([slot=\"subtext\"]){display:block;margin:0;color:var(--row-normal-variant-normal-state-subtext-color)}::slotted([slot=\"side-label\"]){display:block;margin:0;color:var(--row-normal-variant-normal-state-side-text-primary-color)}::slotted([slot=\"side-subtext\"]){display:block;margin:0;color:var(--row-normal-variant-normal-state-side-text-secondary-color)}::slotted([slot=\"control\"]),::slotted([slot=\"leading-accessory\"]),::slotted([slot=\"trailing-accessory\"]){flex-shrink:0}:host(.market-drag-placeholder)::before{content:\"\" !important;top:0;bottom:0;display:block !important;height:auto;background-color:var(--core-fill-50-color)}:host(.market-drag-placeholder) .market-drag-handle{pointer-events:none}:host(.market-drag-placeholder) *,:host(.market-drag-placeholder) ::slotted(*){opacity:0%;pointer-events:none}:host(.market-drag-clone){--row-dragged-min-width:240px;width:-moz-fit-content;width:fit-content;min-width:var(--row-dragged-min-width);margin:0;border-radius:var(--row-normal-variant-background-radius);background-color:var(--core-surface-20-color);cursor:grabbing;transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:top, width, height}:host(.market-drag-clone)::after{content:\"\";position:absolute;inset:0;display:block;border-radius:var(--row-normal-variant-background-radius);box-shadow:var(--elevation-20-shadow);opacity:var(--market-drag-clone-shadow-opacity, 0%);transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:opacity}:host(.market-drag-clone) .market-drag-handle{cursor:grabbing}:host(.market-drag-clone) ::slotted([slot=\"label\"]){overflow:hidden;max-width:var(--row-dragged-min-width);text-overflow:ellipsis;white-space:nowrap}:host(.market-drag-clone) ::slotted(*:not([slot=\"label\"],[slot=\"leading-accessory\"])){display:none}:host(.market-drag-released){pointer-events:none;transition-property:top, width, height, transform}:host([size=\"small\"]){min-height:var(--row-small-size-min-height, 40px);font-size:var(--row-small-size-text-size);line-height:var(--row-small-size-text-leading);letter-spacing:var(--row-small-size-text-tracking);text-transform:var(--row-small-size-text-case)}:host([size=\"small\"]) .container{padding-top:var(--row-small-size-vertical-padding);padding-bottom:var(--row-small-size-vertical-padding)}:host([size=\"small\"]) .main{gap:var(--row-small-size-text-vertical-spacing)}:host([size=\"small\"]) .side{gap:var(--row-small-size-text-vertical-spacing)}:host([size=\"small\"]) ::slotted([slot=\"label\"]){font-weight:var(--row-small-size-text-weight);font-size:var(--row-small-size-text-size);line-height:var(--row-small-size-text-leading);letter-spacing:var(--row-small-size-text-tracking);text-transform:var(--row-small-size-text-case)}:host([size=\"small\"]) ::slotted([slot=\"subtext\"]){font-weight:var(--row-small-size-subtext-weight);font-size:var(--row-small-size-subtext-size);line-height:var(--row-small-size-subtext-leading);letter-spacing:var(--row-small-size-subtext-tracking);text-transform:var(--row-small-size-subtext-case)}:host([size=\"small\"]) ::slotted([slot=\"side-label\"]){font-weight:var(--row-small-size-side-text-primary-weight);font-size:var(--row-small-size-side-text-primary-size);line-height:var(--row-small-size-side-text-primary-leading);letter-spacing:var(--row-small-size-side-text-primary-tracking);text-transform:var(--row-small-size-side-text-primary-case)}:host([size=\"small\"]) ::slotted([slot=\"side-subtext\"]){font-weight:var(--row-small-size-side-text-secondary-weight);font-size:var(--row-small-size-side-text-secondary-size);line-height:var(--row-small-size-side-text-secondary-leading);letter-spacing:var(--row-small-size-side-text-secondary-tracking);text-transform:var(--row-small-size-side-text-secondary-case)}:host([size=\"medium\"]){min-height:var(--row-medium-size-min-height, 56px);font-size:var(--row-medium-size-text-size);line-height:var(--row-medium-size-text-leading);letter-spacing:var(--row-medium-size-text-tracking);text-transform:var(--row-medium-size-text-case)}:host([size=\"medium\"]) .container{padding-top:var(--row-medium-size-vertical-padding);padding-bottom:var(--row-medium-size-vertical-padding)}:host([size=\"medium\"]) .main{gap:var(--row-medium-size-text-vertical-spacing)}:host([size=\"medium\"]) .side{gap:var(--row-medium-size-text-vertical-spacing)}:host([size=\"medium\"]) ::slotted([slot=\"label\"]){font-weight:var(--row-medium-size-text-weight);font-size:var(--row-medium-size-text-size);line-height:var(--row-medium-size-text-leading);letter-spacing:var(--row-medium-size-text-tracking);text-transform:var(--row-medium-size-text-case)}:host([size=\"medium\"]) ::slotted([slot=\"subtext\"]){font-weight:var(--row-medium-size-subtext-weight);font-size:var(--row-medium-size-subtext-size);line-height:var(--row-medium-size-subtext-leading);letter-spacing:var(--row-medium-size-subtext-tracking);text-transform:var(--row-medium-size-subtext-case)}:host([size=\"medium\"]) ::slotted([slot=\"side-label\"]){font-weight:var(--row-medium-size-side-text-primary-weight);font-size:var(--row-medium-size-side-text-primary-size);line-height:var(--row-medium-size-side-text-primary-leading);letter-spacing:var(--row-medium-size-side-text-primary-tracking);text-transform:var(--row-medium-size-side-text-primary-case)}:host([size=\"medium\"]) ::slotted([slot=\"side-subtext\"]){font-weight:var(--row-medium-size-side-text-secondary-weight);font-size:var(--row-medium-size-side-text-secondary-size);line-height:var(--row-medium-size-side-text-secondary-leading);letter-spacing:var(--row-medium-size-side-text-secondary-tracking);text-transform:var(--row-medium-size-side-text-secondary-case)}:host([interactive]),:host([role=\"option\"]){--focus-ring-color:color-mix(in srgb, var(--row-normal-variant-focus-ring-color) 100%, transparent);border-radius:var(--row-normal-variant-background-radius);outline:none;cursor:pointer}:host([interactive]) .drill-icon,:host([role=\"option\"]) .drill-icon{color:var(--row-normal-variant-normal-state-drill-color)}.container:focus-visible,:host(:focus-visible) .container,:host(.pseudo-focus) .container{border-radius:var(--row-normal-variant-background-radius);outline:var(--row-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:calc(var(--row-focus-ring-border-size) * -1)}:host(.preload) ::slotted([slot=\"control\"]){--row-slotted-control-transition:none}@media (hover: hover){:host([interactive]:hover),:host([role=\"option\"]:hover){background-color:var(--row-normal-variant-hover-state-background-color)}:host([interactive]:hover)::before,:host([role=\"option\"]:hover)::before{background-color:var(--row-normal-variant-hover-state-separator-color)}:host([interactive]:hover) .drill-icon,:host([role=\"option\"]:hover) .drill-icon{color:var(--row-normal-variant-hover-state-drill-color)}:host([interactive]:hover) ::slotted([slot=\"label\"]),:host([role=\"option\"]:hover) ::slotted([slot=\"label\"]){color:var(--row-normal-variant-hover-state-text-color)}:host([interactive]:hover) ::slotted([slot=\"subtext\"]),:host([role=\"option\"]:hover) ::slotted([slot=\"subtext\"]){color:var(--row-normal-variant-hover-state-subtext-color)}:host([interactive]:hover) ::slotted([slot=\"side-label\"]),:host([role=\"option\"]:hover) ::slotted([slot=\"side-label\"]){color:var(--row-normal-variant-hover-state-side-text-primary-color)}:host([interactive]:hover) ::slotted([slot=\"side-subtext\"]),:host([role=\"option\"]:hover) ::slotted([slot=\"side-subtext\"]){color:var(--row-normal-variant-hover-state-side-text-secondary-color)}}:host([interactive][selected]:not(.has-slotted-control)),:host([role=\"option\"][selected]:not(.has-slotted-control)){background-color:var(--row-normal-variant-selected-state-background-color)}:host([interactive][selected]:not(.has-slotted-control))::before,:host([role=\"option\"][selected]:not(.has-slotted-control))::before{background-color:var(--row-normal-variant-selected-state-separator-color)}:host([interactive][selected]:not(.has-slotted-control)) .drill-icon,:host([role=\"option\"][selected]:not(.has-slotted-control)) .drill-icon{color:var(--row-normal-variant-selected-state-drill-color)}:host([interactive][selected]:not(.has-slotted-control)) ::slotted([slot=\"label\"]),:host([role=\"option\"][selected]:not(.has-slotted-control)) ::slotted([slot=\"label\"]){color:var(--row-normal-variant-selected-state-text-color)}:host([interactive][selected]:not(.has-slotted-control)) ::slotted([slot=\"subtext\"]),:host([role=\"option\"][selected]:not(.has-slotted-control)) ::slotted([slot=\"subtext\"]){color:var(--row-normal-variant-selected-state-subtext-color)}:host([interactive][selected]:not(.has-slotted-control)) ::slotted([slot=\"side-label\"]),:host([role=\"option\"][selected]:not(.has-slotted-control)) ::slotted([slot=\"side-label\"]){color:var(--row-normal-variant-selected-state-side-text-primary-color)}:host([interactive][selected]:not(.has-slotted-control)) ::slotted([slot=\"side-subtext\"]),:host([role=\"option\"][selected]:not(.has-slotted-control)) ::slotted([slot=\"side-subtext\"]){color:var(--row-normal-variant-selected-state-side-text-secondary-color)}:host([interactive]:active),:host([role=\"option\"]:active){background-color:var(--row-normal-variant-pressed-state-background-color)}:host([interactive]:active)::before,:host([role=\"option\"]:active)::before{background-color:var(--row-normal-variant-pressed-state-separator-color)}:host([interactive]:active) .drill-icon,:host([role=\"option\"]:active) .drill-icon{color:var(--row-normal-variant-pressed-state-drill-color)}:host([interactive]:active) ::slotted([slot=\"label\"]),:host([role=\"option\"]:active) ::slotted([slot=\"label\"]){color:var(--row-normal-variant-pressed-state-text-color)}:host([interactive]:active) ::slotted([slot=\"subtext\"]),:host([role=\"option\"]:active) ::slotted([slot=\"subtext\"]){color:var(--row-normal-variant-pressed-state-subtext-color)}:host([interactive]:active) ::slotted([slot=\"side-label\"]),:host([role=\"option\"]:active) ::slotted([slot=\"side-label\"]){color:var(--row-normal-variant-pressed-state-side-text-primary-color)}:host([interactive]:active) ::slotted([slot=\"side-subtext\"]),:host([role=\"option\"]:active) ::slotted([slot=\"side-subtext\"]){color:var(--row-normal-variant-pressed-state-side-text-secondary-color)}:host([interactive][disabled]),:host([role=\"option\"][disabled]){background-color:var(--row-normal-variant-disabled-state-background-color);color:var(--row-normal-variant-disabled-state-text-color);pointer-events:none}:host([interactive][disabled])::before,:host([role=\"option\"][disabled])::before{background-color:var(--row-normal-variant-disabled-state-separator-color)}:host([interactive][disabled]) .drill-icon,:host([role=\"option\"][disabled]) .drill-icon{color:var(--row-normal-variant-disabled-state-drill-color)}:host([interactive][disabled]) ::slotted([slot=\"label\"]),:host([role=\"option\"][disabled]) ::slotted([slot=\"label\"]){color:var(--row-normal-variant-disabled-state-text-color)}:host([interactive][disabled]) ::slotted([slot=\"subtext\"]),:host([role=\"option\"][disabled]) ::slotted([slot=\"subtext\"]){color:var(--row-normal-variant-disabled-state-subtext-color)}:host([interactive][disabled]) ::slotted([slot=\"side-label\"]),:host([role=\"option\"][disabled]) ::slotted([slot=\"side-label\"]){color:var(--row-normal-variant-disabled-state-side-text-primary-color)}:host([interactive][disabled]) ::slotted([slot=\"side-subtext\"]),:host([role=\"option\"][disabled]) ::slotted([slot=\"side-subtext\"]){color:var(--row-normal-variant-disabled-state-side-text-secondary-color)}:host([interactive][disabled]) ::slotted(.market-accessory),:host([interactive][disabled]) ::slotted(img[slot*=\"accessory\"]),:host([interactive][disabled]) ::slotted(svg[slot*=\"accessory\"]),:host([interactive][disabled]) ::slotted(div[slot*=\"accessory\"]),:host([role=\"option\"][disabled]) ::slotted(.market-accessory),:host([role=\"option\"][disabled]) ::slotted(img[slot*=\"accessory\"]),:host([role=\"option\"][disabled]) ::slotted(svg[slot*=\"accessory\"]),:host([role=\"option\"][disabled]) ::slotted(div[slot*=\"accessory\"]){opacity:var(--row-disabled-state-leading-accessory-opacity)}:host([interactive][disabled]) ::slotted(.market-tooltip),:host([role=\"option\"][disabled]) ::slotted(.market-tooltip){pointer-events:auto !important;}:host([slot=\"displayed-selection\"]){pointer-events:none}:host([slot=\"displayed-selection\"]) .container{padding:0}:host([slot=\"displayed-selection\"]) .main{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([slot=\"displayed-selection\"]) ::slotted([slot=\"label\"]){overflow:hidden;color:inherit;font-weight:var(--field-input-weight);font-size:inherit;line-height:inherit;text-overflow:ellipsis;white-space:nowrap}:host([slot=\"displayed-selection\"]) .side{display:none}:host([slot=\"displayed-selection\"]) ::slotted([slot=\"subtext\"]),:host([slot=\"displayed-selection\"]) ::slotted([slot=\"side-label\"]),:host([slot=\"displayed-selection\"]) ::slotted([slot=\"side-subtext\"]),:host([slot=\"displayed-selection\"]) ::slotted([slot=\"leading-accessory\"]),:host([slot=\"displayed-selection\"]) ::slotted([slot=\"trailing-accessory\"]),:host([slot=\"displayed-selection\"]) ::slotted([slot=\"control\"]){display:none}:host([destructive]) ::slotted([slot=\"label\"]){color:var(--row-destructive-variant-normal-state-text-color)}:host([destructive]) ::slotted([slot=\"subtext\"]){color:var(--row-destructive-variant-normal-state-subtext-color)}:host([destructive]) ::slotted([slot=\"side-label\"]){color:var(--row-destructive-variant-normal-state-side-text-primary-color)}:host([destructive]) ::slotted([slot=\"side-subtext\"]){color:var(--row-destructive-variant-normal-state-side-text-secondary-color)}:host([destructive][role=\"option\"]){border-radius:var(--row-destructive-variant-background-radius)}@media (hover: hover){:host([destructive][role=\"option\"]:hover){background-color:var(--row-destructive-variant-hover-state-background-color)}:host([destructive][role=\"option\"]:hover)::before{background-color:var(--row-destructive-variant-hover-state-separator-color)}:host([destructive][role=\"option\"]:hover) .drill-icon{fill:var(--row-destructive-variant-hover-state-drill-color)}:host([destructive][role=\"option\"]:hover) ::slotted([slot=\"label\"]){color:var(--row-destructive-variant-hover-state-text-color)}:host([destructive][role=\"option\"]:hover) ::slotted([slot=\"subtext\"]){color:var(--row-destructive-variant-hover-state-subtext-color)}:host([destructive][role=\"option\"]:hover) ::slotted([slot=\"side-label\"]){color:var(--row-destructive-variant-hover-state-side-text-primary-color)}:host([destructive][role=\"option\"]:hover) ::slotted([slot=\"side-subtext\"]){color:var(--row-destructive-variant-hover-state-side-text-secondary-color)}}:host([destructive][role=\"option\"]:focus){background-color:var(--row-destructive-variant-focus-state-background-color)}:host([destructive][role=\"option\"]:focus)::before{background-color:var(--row-destructive-variant-focus-state-separator-color)}:host([destructive][role=\"option\"]:focus) .drill-icon{fill:var(--row-destructive-variant-focus-state-drill-color)}:host([destructive][role=\"option\"]:focus) ::slotted([slot=\"label\"]){color:var(--row-destructive-variant-focus-state-text-color)}:host([destructive][role=\"option\"]:focus) ::slotted([slot=\"subtext\"]){color:var(--row-destructive-variant-focus-state-subtext-color)}:host([destructive][role=\"option\"]:focus) ::slotted([slot=\"side-label\"]){color:var(--row-destructive-variant-focus-state-side-text-primary-color)}:host([destructive][role=\"option\"]:focus) ::slotted([slot=\"side-subtext\"]){color:var(--row-destructive-variant-focus-state-side-text-secondary-color)}:host([destructive][role=\"option\"][selected]:not(.has-slotted-control)){background-color:var(--row-destructive-variant-selected-state-background-color)}:host([destructive][role=\"option\"][selected]:not(.has-slotted-control))::before{background-color:var(--row-destructive-variant-selected-state-separator-color)}:host([destructive][role=\"option\"][selected]:not(.has-slotted-control)) .drill-icon{fill:var(--row-destructive-variant-selected-state-drill-color)}:host([destructive][role=\"option\"][selected]:not(.has-slotted-control)) ::slotted([slot=\"label\"]){color:var(--row-destructive-variant-selected-state-text-color)}:host([destructive][role=\"option\"][selected]:not(.has-slotted-control)) ::slotted([slot=\"subtext\"]){color:var(--row-destructive-variant-selected-state-subtext-color)}:host([destructive][role=\"option\"][selected]:not(.has-slotted-control)) ::slotted([slot=\"side-label\"]){color:var(--row-destructive-variant-selected-state-side-text-primary-color)}:host([destructive][role=\"option\"][selected]:not(.has-slotted-control)) ::slotted([slot=\"side-subtext\"]){color:var(--row-destructive-variant-selected-state-side-text-secondary-color)}:host([destructive][role=\"option\"]:active){background-color:var(--row-destructive-variant-pressed-state-background-color)}:host([destructive][role=\"option\"]:active)::before{background-color:var(--row-destructive-variant-pressed-state-separator-color)}:host([destructive][role=\"option\"]:active) .drill-icon{fill:var(--row-destructive-variant-pressed-state-drill-color)}:host([destructive][role=\"option\"]:active) ::slotted([slot=\"label\"]){color:var(--row-destructive-variant-pressed-state-text-color)}:host([destructive][role=\"option\"]:active) ::slotted([slot=\"subtext\"]){color:var(--row-destructive-variant-pressed-state-subtext-color)}:host([destructive][role=\"option\"]:active) ::slotted([slot=\"side-label\"]){color:var(--row-destructive-variant-pressed-state-side-text-primary-color)}:host([destructive][role=\"option\"]:active) ::slotted([slot=\"side-subtext\"]){color:var(--row-destructive-variant-pressed-state-side-text-secondary-color)}:host([destructive][role=\"option\"][disabled]){background-color:var(--row-destructive-variant-disabled-state-background-color);color:var(--row-destructive-variant-disabled-state-text-color);pointer-events:none}:host([destructive][role=\"option\"][disabled])::before{background-color:var(--row-destructive-variant-disabled-state-separator-color)}:host([destructive][role=\"option\"][disabled]) .drill-icon{fill:var(--row-destructive-variant-disabled-state-drill-color)}:host([destructive][role=\"option\"][disabled]) ::slotted([slot=\"label\"]){color:var(--row-destructive-variant-disabled-state-text-color)}:host([destructive][role=\"option\"][disabled]) ::slotted([slot=\"subtext\"]){color:var(--row-destructive-variant-disabled-state-subtext-color)}:host([destructive][role=\"option\"][disabled]) ::slotted([slot=\"side-label\"]){color:var(--row-destructive-variant-disabled-state-side-text-primary-color)}:host([destructive][role=\"option\"][disabled]) ::slotted([slot=\"side-subtext\"]){color:var(--row-destructive-variant-disabled-state-side-text-secondary-color)}";
const MarketRowStyle0 = marketRowCss;

const MarketRow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketRowSelected = createEvent(this, "marketRowSelected", 7);
        this.marketRowDeselected = createEvent(this, "marketRowDeselected", 7);
        this.slottedControlEl = undefined;
        this.selected = false;
        this.value = undefined;
        this.disabled = false;
        this.size = 'medium';
        this.interactive = false;
        this.transient = false;
        this.togglable = true;
        this.variant = 'regular';
        this.destructive = false;
        this.controlPosition = 'trailing';
        this.href = undefined;
        this.target = undefined;
        this.dragEnabled = false;
        this.dragHandlePosition = 'trailing';
        this.hasSideText = false;
    }
    /**
     * If a control gets slotted in, set the value to match that of the row
     */
    selectedWatcher(newValue) {
        var _a;
        // prevent the row from being selected if it is transient
        const selected = newValue && this.transient ? false : newValue;
        this.selected = selected;
        (_a = this.slottedControlEl) === null || _a === void 0 ? void 0 : _a.setSelection(selected);
    }
    /**
     * If a control gets slotted in, set the value to match that of the row
     */
    disabledWatcher(newValue) {
        var _a;
        (_a = this.slottedControlEl) === null || _a === void 0 ? void 0 : _a.setDisabled(newValue);
    }
    /**
     * Link rows should not be selectable
     */
    hrefWatcher(newValue) {
        if (!isEmpty(newValue)) {
            this.transient = true;
        }
    }
    /**
     * Drill rows are interactive and transient
     */
    variantWatcher(newValue) {
        if (newValue === 'drill') {
            this.interactive = true;
            this.transient = true;
        }
    }
    /**
     * @internal
     * @private
     *
     * Used for setting the selection state to true without emiting the `marketRowSelected` event.
     */
    async silentlySelect() {
        this.selected = true;
        return Promise.resolve();
    }
    /**
     * @internal
     * @private
     *
     * Used for setting the selection state to false without emiting the `marketRowDeselected` event.
     */
    async silentlyDeselect() {
        this.selected = false;
        return Promise.resolve();
    }
    /**
     * @internal
     * @private
     *
     * Used for manually setting `selected` to true. Generally speaking, it
     * is preferable to avoid using this method and allow `market-row` to
     * manage its own selection state based on user interaction. It should only
     * be used for parent components that need to manage a group of rows, such as
     * `market-list`.
     */
    select() {
        this.selected = true;
        const { defaultPrevented } = this.marketRowSelected.emit({ value: this.value });
        if (defaultPrevented) {
            this.selected = false;
        }
        return Promise.resolve();
    }
    /**
     * @internal
     * @private
     *
     * Used for manually setting `selected` to false. Generally speaking, it
     * is preferable to avoid using this method and allow `market-row` to
     * manage its own selection state based on user interaction. It should only
     * be used for parent components that need to manage a group of rows, such as
     * `market-list`.
     */
    deselect() {
        this.selected = false;
        const { defaultPrevented } = this.marketRowDeselected.emit({ value: this.value });
        if (defaultPrevented) {
            this.selected = true;
        }
        return Promise.resolve();
    }
    /**
     * @internal
     * @private
     *
     * Used for toggling the row's selected state.
     */
    toggle() {
        return !this.selected ? this.select() : this.deselect();
    }
    handleControlSlotChange() {
        var _a;
        this.querySlots();
        if (this.slottedControlEl) {
            this.interactive = true;
            this.selectedWatcher(this.selected);
            this.disabledWatcher(this.disabled);
            const slottedControlLabel = (_a = this.el.querySelector('[slot="label"]')) === null || _a === void 0 ? void 0 : _a.textContent;
            this.slottedControlEl.setAttribute('aria-label', slottedControlLabel);
        }
    }
    setControlActive(value) {
        var _a, _b;
        (_b = (_a = this.slottedControlEl) === null || _a === void 0 ? void 0 : _a.setActive) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    }
    setControlHover(value) {
        var _a, _b;
        (_b = (_a = this.slottedControlEl) === null || _a === void 0 ? void 0 : _a.setHover) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    }
    async handleClick(e) {
        // clicks on links inside row content shouldn't select the row itself
        if (this.disabled ||
            this.transient ||
            !this.interactive ||
            e.target.tagName === 'A' ||
            e.target.tagName === 'BUTTON' ||
            e.target.tagName === getNamespacedTagFor('market-button').toUpperCase() ||
            e.target.tagName === getNamespacedTagFor('market-link').toUpperCase()) {
            return;
        }
        if (this.togglable) {
            await this.toggle();
        }
        else if (!this.selected) {
            await this.select();
        }
        // fixes a weird UI bug where the row keeps its focus when clicked using a mouse
        if (e.type === 'click' && e.pointerType === 'mouse') {
            this.el.blur();
        }
    }
    handleKeydown(e) {
        // don't intercept keydown of descendant elements
        // e.g. when typing into nested input fields (gross)
        if (e.target !== this.el) {
            return;
        }
        if (e.key === ' ') {
            e.preventDefault(); // spacebar should not scroll page
            this.el.click();
        }
        if (e.key === 'Enter') {
            this.el.click();
        }
    }
    async onDragStart(e) {
        e.stopPropagation();
        const { el, dragHandlePosition } = this;
        const coords = e.detail;
        const anchor = dragHandlePosition === 'leading' ? 'left' : 'right';
        const drag = new Draggable(el, { anchor });
        this.drag = drag;
        await drag.start(coords);
    }
    onDragMove(e) {
        e.stopPropagation();
        const coords = e.detail;
        this.drag.move(coords);
    }
    async onDragEnd(e) {
        e.stopPropagation();
        const coords = e.detail;
        await this.drag.end(coords);
        this.drag.destroy();
    }
    checkIfSideTextIsPresent() {
        const sideTextEl = this.el.querySelector('[slot="side-label"], [slot="side-subtext"]');
        this.hasSideText = Boolean(sideTextEl);
    }
    querySlots() {
        this.slottedControlEl = [...this.el.querySelectorAll('[slot="control"]')].find(isValidRowControl);
        this.checkIfSideTextIsPresent();
    }
    determineRowRole() {
        // Should only apply an a11y role if the row acts as a button.
        // Links are covered with the anchor tag, and option roles are handled by market-list.
        if (this.interactive && this.transient && !this.href) {
            return 'button';
        }
        return undefined;
    }
    connectedCallback() {
        this.querySlots();
        this.selectedWatcher(this.selected);
        this.disabledWatcher(this.disabled);
        this.hrefWatcher(this.href);
        this.variantWatcher(this.variant);
    }
    componentWillLoad() {
        this.checkIfSideTextIsPresent();
    }
    async componentDidUpdate() {
        // remove preload class (used to manage slotted control transitions)
        if (this.el.classList.contains('preload')) {
            await asyncRequestAnimationFrame();
            this.el.classList.remove('preload');
        }
    }
    render() {
        const { controlPosition, disabled, href, interactive, selected, slottedControlEl, target, variant, hasSideText, dragEnabled, dragHandlePosition, size, el, } = this;
        /*
         * a11y: If the row has a slotted control, we want to tab directly to the inner control element.
         * Doing this ensures we don't violate the "no nested interactive" rule:
         * https://dequeuniversity.com/rules/axe/html/4.3/nested-interactive
         */
        const tabindex = interactive && !disabled && !slottedControlEl ? '0' : null;
        const ContainerTag = href === undefined ? 'div' : 'a';
        const ContainerTagAttrs = ContainerTag === 'a' ? { href, target } : {};
        ContainerTagAttrs['role'] = this.determineRowRole();
        const leadingControl = controlPosition === 'leading';
        const MarketDragHandleTagName = getNamespacedTagFor('market-drag-handle');
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        const drillIconName = size === 'small' ? cjs.ROW_SMALL_SIZE_CARET_ICON_ASSET : cjs.ROW_MEDIUM_SIZE_CARET_ICON_ASSET;
        return (h(Host, { key: 'e0af5fb30f2569971d64057d871af60405d80b75', tabindex: tabindex, "aria-selected": el.role === 'option' ? Boolean(selected).toString() : undefined, class: classNames('market-row', 'preload', {
                'has-slotted-control': typeof slottedControlEl !== 'undefined',
                'has-leading-control': leadingControl,
            }), onMouseDown: () => this.setControlActive(true), onMouseUp: () => this.setControlActive(false), onMouseEnter: () => this.setControlHover(true), onMouseLeave: () => this.setControlHover(false), onClick: (e) => this.handleClick(e), onKeydown: (e) => this.handleKeydown(e), onMarketDragHandleDragStart: (e) => this.onDragStart(e), onMarketDragHandleDragMove: (e) => this.onDragMove(e), onMarketDragHandleDragEnd: (e) => this.onDragEnd(e) }, h(ContainerTag, Object.assign({ key: '0147448e4008da14a2597f43676707e1f6276f2a', part: "container", class: "container", tabindex: tabindex }, ContainerTagAttrs), dragEnabled && dragHandlePosition === 'leading' && (h(MarketDragHandleTagName, { key: '8845f82742506140a6cd2b252f1b44ca2581f71b', part: "drag-handle" })), leadingControl && h("slot", { key: 'b29f3a7673646aab9e2fa1d7698e793bce4f7854', name: "control", onSlotchange: () => this.handleControlSlotChange() }), h("slot", { key: '38f2988c383126c852a3a92ba0eaaa0c0754039c', name: "leading-accessory" }), h("div", { key: '7e4e81d29f8c9cb9af9dc0980cb73d5d1e60541e', class: "main", part: "main" }, h("slot", { key: '251e758e1ad0c07de7713a7b608314bd17fcbf6e', name: "label" }), h("slot", { key: '090c451be4b114a61dc79c2a256ac6dbda53efbd', name: "subtext" }), h("slot", { key: '144000d524652a21de2f011bae7534356c20d288' })), h("div", { key: 'd99b67c24f5ce1c4628414ebbb376926f2d58ef9', part: "side", class: classNames('side', { hidden: !hasSideText }) }, h("slot", { key: '4dd0e0f24441e84871a0ecedca2330caf2a8595b', name: "side-label", onSlotchange: () => this.checkIfSideTextIsPresent() }), h("slot", { key: '075ef3d3278322018477a0704b5f96a9cfab043c', name: "side-subtext", onSlotchange: () => this.checkIfSideTextIsPresent() })), h("slot", { key: '3ca9095e427e5326ccb54ed1dd1cd7d7a97c28eb', name: "trailing-accessory" }), variant === 'regular' && !leadingControl && (h("slot", { key: '41155201ba966c0ef66a0424302f0b3361fd9a10', name: "control", onSlotchange: () => this.handleControlSlotChange() })), variant === 'drill' && h(MarketIconTagName, { key: '85e1065ce85fa95d5588811629c2cb1d64271e0d', class: "drill-icon", name: drillIconName }), dragEnabled && dragHandlePosition === 'trailing' && (h(MarketDragHandleTagName, { key: '60ca3ae6e23bfe53caefc31806c69f96e456f940', part: "drag-handle" })))));
    }
    static get delegatesFocus() { return true; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selected": ["selectedWatcher"],
        "disabled": ["disabledWatcher"],
        "href": ["hrefWatcher"],
        "variant": ["variantWatcher"]
    }; }
};
MarketRow.style = MarketRowStyle0;

export { MarketRow as market_row };

//# sourceMappingURL=market-row.entry.js.map