import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { c as cjs } from './index-0ae5b082.js';
import { i as isTouchEvent, g as getCoordsFromEvent } from './utils-b57f24f5.js';
import { c as createAndActivateFocusTrap } from './focus-trap-a29c2e91.js';
import { a as toNumber, t as throttle } from './throttle-552e88ff.js';
import { i as identity } from './identity-db011338.js';
import { s as setToString, o as overRest } from './_overRest-cac964a9.js';
import './isObject-f305a0d7.js';
import './isSymbol-385885b1.js';
import './_getNative-e422aac7.js';

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The base implementation of `_.delay` and `_.defer` which accepts `args`
 * to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Array} args The arguments to provide to `func`.
 * @returns {number|Object} Returns the timer id or timeout object.
 */
function baseDelay(func, wait, args) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, args); }, wait);
}

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.delay(function(text) {
 *   console.log(text);
 * }, 1000, 'later');
 * // => Logs 'later' after one second.
 */
var delay = baseRest(function(func, wait, args) {
  return baseDelay(func, toNumber(wait) || 0, args);
});

const delay$1 = delay;

const compressDefaults = { threshold: 0, linearRatio: 1, quadraticRatio: 1, invert: false };
/**
 * Compress a given input value as it exceeds a given threshhold.
 * Both quadratic and linear compression is supported.
 * the output grows by an increasingly diminishing amount.
 * @param {number} input - The value to be compressed.
 * @param {CompressOptions} options - Override defaults for the compression.
 * @param {number} options.threshhold - The value where compression starts. Input values that exceed the threshhold will be compressed. Default of 0.
 * @param {number} options.linearRatio - (0-1) The ratio to which the input exceeding the threshhold will be reduced. 0.33 creates a ~3-to-1 compression. Default of 1 (no compression).
 * @param {number} options.quadraticRatio - (0-1) The ratio of quadratic compression to which the input exceeding the threshhold will be reduced. 0.33 creates a ~cube-root compression. Default of 1 (no compression).
 * @param {boolean} options.invert - If true, the compression instead comrpesses values below the threshhold.
 */
function compress(input, options = {}) {
    const { quadraticRatio, linearRatio, threshold, invert } = Object.assign({}, compressDefaults, options);
    const inverter = invert ? -1 : 1;
    if (input * inverter < threshold * inverter) {
        return input;
    }
    const inputDelta = (input - threshold) * inverter;
    // note we offset by 1 to avoid values 0-1 being adjusted in the opposite direction when exponentialized.
    // this means that a provided quadratic ration of 0.5 does not result in a perfect square root.
    let outputDelta = (inputDelta + 1) ** quadraticRatio - 1;
    outputDelta = outputDelta * linearRatio;
    return threshold + outputDelta * inverter;
}
function lerp(a, b, alpha) {
    return a + alpha * (b - a);
}
function getDelta(startCoords, endCoords) {
    return {
        x: endCoords.x - startCoords.x,
        y: endCoords.y - startCoords.y,
    };
}
function magnitude(delta) {
    return (delta.x ** 2 + delta.y ** 2) ** 0.5;
}

const marketSheetCss = "@keyframes market-popup{from{opacity:0%;transform:scale(0.9, 0.9)}to{opacity:100%;transform:scale(1, 1)}}@keyframes market-popdown{from{opacity:100%;transform:scale(1, 1)}to{opacity:0%;transform:scale(0.9, 0.9)}}@keyframes market-slideup{from{opacity:0%;transform:translateY(80vh)}to{opacity:100%;transform:translateY(0)}}@keyframes market-slidedown{from{opacity:100%;transform:translateY(0)}to{opacity:0%;transform:translateY(80vh)}}@keyframes market-slide-left-enter{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes market-slide-left-exit{from{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes market-fade-in{from{opacity:0%}to{opacity:100%}}@keyframes market-fade-out{from{opacity:100%}to{opacity:0%}}@keyframes market-input-autofill-start{from{}to{}}@keyframes market-input-autofill-cancel{from{}to{}}@keyframes market-input-search-compact-enter{from{}to{}}@keyframes market-input-search-compact-exit{from{}to{}}:host{display:flex;flex-direction:column;justify-content:stretch;overflow:hidden}:host ::slotted(main),:host ::slotted(.main){flex:0 1 100%;overflow-y:auto;height:100%}:host ::slotted(.market-header){margin-bottom:var(--core-metrics-spacing-300);padding-top:0}:host ::slotted(.market-footer){padding-bottom:0}:host{--handle-whitespace:calc(var(--modal-sheet-handle-padding-top-size) + var(--modal-sheet-handle-padding-bottom-size));--handle-area-height:calc(var(--handle-whitespace) + var(--modal-sheet-handle-height));--max-width-padding:var(--modal-sheet-regular-horizontal-size-class-horizontal-padding);--min-width-padding:var(--modal-sheet-compact-horizontal-size-class-horizontal-padding);--padding-width:clamp(var(--min-width-padding), calc(50% - 200px), var(--max-width-padding));--padding-height:var(--modal-sheet-regular-vertical-size-class-vertical-padding);position:fixed;top:calc(100vh + var(--handle-area-height));bottom:auto;left:50%;overflow:visible;box-sizing:border-box;width:100%;max-width:calc(400px + calc(var(--max-width-padding) + var(--max-width-padding)));max-height:calc(100% - var(--handle-area-height));padding-top:var(--padding-height);border-radius:var(--modal-sheet-border-radius) var(--modal-sheet-border-radius) 0 0;background-color:var(--modal-sheet-background-color);opacity:0%;-webkit-user-select:none;-moz-user-select:none;user-select:none;transition:top var(--core-animation-enter-transition-moderate-speed-duration),\n    opacity var(--core-animation-enter-transition-moderate-speed-duration);transform:translate(-50%, 0)}:host([state=\"closed\"]){top:calc(100vh + var(--handle-area-height));opacity:0%;transition:top var(--core-animation-exit-transition-moderate-speed-duration),\n      opacity var(--core-animation-exit-transition-moderate-speed-duration)}:host([state=\"partial-open\"]){opacity:100%}:host([state=\"full-open\"]){opacity:100%}:host([dragging]){transition:opacity var(--core-animation-enter-transition-moderate-speed-duration)}:host([tapdisabled]){pointer-events:none}:host ::slotted([slot=\"header\"]){padding-right:var(--padding-width);padding-left:var(--padding-width)}:host::after{content:\"\";position:absolute;top:100%;display:block;width:inherit;max-width:inherit;height:100vh;background-color:inherit}.handle{position:fixed;bottom:calc(100% + var(--modal-sheet-handle-padding-bottom-size));left:50%;display:block;width:var(--modal-sheet-handle-width);height:var(--modal-sheet-handle-height);border:none;border-radius:var(--modal-sheet-border-radius);background-color:var(--modal-sheet-handle-background-color);-webkit-user-select:none;-moz-user-select:none;user-select:none;transform:translate(-50%, 0)}.handle::before{content:\"\";position:absolute;inset:calc(var(--modal-sheet-handle-padding-bottom-size) * -1)}.handle:focus{outline:var(--button-focus-ring-border-size) solid var(--button-focus-ring-color)}.main{overflow-x:hidden;overflow-y:auto;padding-right:var(--padding-width);padding-bottom:var(--padding-height);padding-left:var(--padding-width);overscroll-behavior:contain}.main[dragging]{overflow-y:hidden}";
const MarketSheetStyle0 = marketSheetCss;

const TOP_GAP = cjs.MODAL_SHEET_HANDLE_HEIGHT + cjs.MODAL_SHEET_HANDLE_PADDING_BOTTOM_SIZE + cjs.MODAL_SHEET_HANDLE_PADDING_TOP_SIZE;
const SWIPE_DISTANCE = 0.12; // ratio of screen height before drag registers as a gesture
const SWIPE_WINDOW = 250; // time in milliseconds to consider for gesture recognition
const TAP_DISABLE_DISTANCE = 0.01; // ratio of screen height before drag disables tapping child elements
const MIN_DRAG_COMPRESSION_RATIO = 0.8; // (0-1) how much the sheet allows itself to be dragged past its natural boundaries
const MAX_DRAG_COMPRESSION_RATIO = 0.55; // (0-1) how much the sheet allows itself to be dragged past its natural boundaries
const RESIZE_DEBOUNCE_DURATION = 16; // 60fps
const MarketSheet = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketDialogLoaded = createEvent(this, "marketDialogLoaded", 7);
        this.marketDialogDismissed = createEvent(this, "marketDialogDismissed", 7);
        this.marketDialogDidDismiss = createEvent(this, "marketDialogDidDismiss", 7);
        this.type = 'sheet';
        // These bound func refs are so we can remove them later
        this.boundOnDragMove = this.onDragMove.bind(this);
        this.boundOnDragEnd = this.onDragEnd.bind(this);
        this.boundOnScrollDrag = this.onScrollDrag.bind(this);
        this.hidden = false;
        this.dialogID = undefined;
        this.openMode = 'partial';
        this.animationEnterDuration = cjs.CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;
        this.animationExitDuration = cjs.CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION;
        this.disableFocus = false;
        this.closeHandleAriaLabel = 'Close';
    }
    /* eslint-disable @typescript-eslint/require-await */
    /**
     * Activates the focus trap
     * @param {Object} [options] [focus-trap `.createFocusTrap` options](https://github.com/focus-trap/focus-trap#createoptions)
     * @param {Object} [activateOptions] [focus-trap `.activate` options](https://github.com/focus-trap/focus-trap#trapactivate)
     */
    async activateFocusTrap(options, activateOptions) {
        if (this.focusTrap) {
            this.focusTrap.activate(activateOptions);
            if (this.disableFocus) {
                this.disableFocus = false;
            }
        }
        else {
            this.focusTrap = createAndActivateFocusTrap({
                activateOptions,
                el: this.el,
                options: Object.assign(Object.assign({}, options), { initialFocus: false }),
            });
        }
        this.focusTrapActivateOptions = activateOptions;
    }
    /**
     * Deactivates the focus trap
     * @param {Object} [deactivateOptions] [focus-trap `.deactivate` options](https://github.com/focus-trap/focus-trap#trapdeactivate)
     */
    async deactivateFocusTrap(deactivateOptions) {
        if (this.focusTrap) {
            this.focusTrap.deactivate(deactivateOptions);
            this.focusTrap = undefined;
        }
    }
    /**
     * Emits the dismiss event
     * The parent context will handle actually removing elements from the DOM,
     * All the sheet needs to do it emit an event so actually closing it can be
     * some other elements problem
     */
    async dismiss(options) {
        const { defaultPrevented } = this.marketDialogDismissed.emit({
            dialog: this.el,
            type: this.type,
            origin: (options === null || options === void 0 ? void 0 : options.origin) || this.el,
        });
        if (!defaultPrevented) {
            this.hidden = true;
            await new Promise((resolve) => setTimeout(resolve, cjs.CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION));
            this.marketDialogDidDismiss.emit({
                dialog: this.el,
                type: this.type,
                origin: this.el,
            });
        }
    }
    /* eslint-enable @typescript-eslint/require-await */
    // Given a desired state, we update our actual state according to the open mode.
    // e.g. "fully opening" a sheet in partial open mode will result in a partial-open state.
    setState(state) {
        let targetState = state;
        if (targetState !== 'closed' && this.openMode !== 'dynamic') {
            // override open state according to open mode
            targetState = `${this.openMode}-open`;
        }
        this.el.setAttribute('state', targetState);
        this.resetTopByState();
    }
    // Calculate the `top` value for the sheet according to the state.
    resetTopByState() {
        this.calculateTopBoundary();
        const state = this.el.getAttribute('state');
        // For some incredibly arcane reason, if you do not read the clientHeight property
        // then the second time a context manager opens the sheet it will not animate open correctly.
        // So we set this variable to ensure that the clientHeight gets read regardless of state.
        const clientHeight = this.el.clientHeight;
        if (state === 'closed') {
            this.el.style.removeProperty('top');
        }
        else if (clientHeight + TOP_GAP >= window.innerHeight || state === 'full-open') {
            // Stick to the top of the screen even if the window resizes.
            this.el.style.top = `${TOP_GAP + window.visualViewport.offsetTop}px`;
        }
        else {
            // partial-open
            // We essentially recreate `top: auto` here. This is necessary
            // because `top: auto` breaks css transitions.
            // It's important to use % rather than vh here so that the
            // address bar is accounted for.
            this.el.style.top = `calc(100% - ${clientHeight}px)`;
        }
        // when virtual keyboard is open, add padding to bottom of sheet to allow space for content to scroll
        this.el.style.paddingBottom = window.visualViewport.offsetTop ? `${window.visualViewport.offsetTop}px` : '0';
    }
    // Calculate the highest top value allowed by the open mode.
    // Dragging past this boundary will experience resitance.
    // The closer the top boundary is to the top of the screen, the more resistance.
    calculateTopBoundary() {
        this.topBoundary = this.openMode === 'partial' ? window.innerHeight - this.el.clientHeight : TOP_GAP;
        this.compressionRatio = lerp(MAX_DRAG_COMPRESSION_RATIO, MIN_DRAG_COMPRESSION_RATIO, this.topBoundary / window.innerHeight);
    }
    setTop(top) {
        // Add some 'springiness' that resists sheet being dragged past its topBoundary
        // by compressing movement past that threshhold.
        const newTop = compress(top, { threshold: this.topBoundary, quadraticRatio: this.compressionRatio, invert: true });
        this.el.style.top = `${newTop}px`;
        return newTop;
    }
    onDragStart(e) {
        // only start drag on touch events or left mouse clicks
        if (!isTouchEvent(e) && e.button !== 0) {
            return;
        }
        // special cases if virtual keyboard is open
        if (window.visualViewport.offsetTop) {
            // if clicking an already-focused element, do nothing
            if (e.target === document.activeElement) {
                return;
            }
            // blur currently-focused element (dismisses virtual keyboard)
            document.activeElement.blur();
            // click event target (element will get focus if focusable)
            e.target.click();
            return;
        }
        const { top } = this.el.getBoundingClientRect();
        this.dragStartTop = top;
        this.el.setAttribute('dragging', '');
        this.calculateTopBoundary();
        const newTop = this.setTop(top);
        const eventCoords = getCoordsFromEvent(e);
        this.dragEventStack = [[e.timeStamp, newTop]];
        this.touchStartCoords = eventCoords;
        this.dragDelta = { x: 0, y: 0 };
        const { boundOnDragMove, boundOnDragEnd } = this;
        document.addEventListener('mousemove', boundOnDragMove);
        document.addEventListener('mouseup', boundOnDragEnd);
        document.addEventListener('touchmove', boundOnDragMove);
        document.addEventListener('touchend', boundOnDragEnd);
    }
    onDragMove(e) {
        const eventCoords = getCoordsFromEvent(e);
        this.dragDelta = getDelta(this.touchStartCoords, eventCoords);
        if (!this.el.hasAttribute('tapdisabled') && magnitude(this.dragDelta) / window.innerHeight > TAP_DISABLE_DISTANCE) {
            this.el.setAttribute('tapdisabled', '');
        }
        const newTop = this.setTop(this.dragStartTop + this.dragDelta.y);
        this.dragEventStack.push([e.timeStamp, newTop]);
        this.pruneStack(e.timeStamp);
    }
    // When we end drag we need to calculate what gesture was performed and update the state accordingly.
    // There are two categories of gesture: 'swipe' and 'drop'. If the gesture ends with movement that exceeds
    // the SWIPE_DISTANCE within the SWIPE_WINDOW, then the gesture is a 'swipe', otherwise it is a 'drop.'
    // A 'swipe' up always sets the sheet to its maximally open mode, while a swipe down closes it.
    // A 'drop' sets the state according to where on the page the sheet was released (e.g) releasing the sheet
    // near the bottom of the screen will close it.
    onDragEnd(e) {
        const eventCoords = getCoordsFromEvent(e);
        this.dragDelta = getDelta(this.touchStartCoords, eventCoords);
        const finalTop = this.dragStartTop + this.dragDelta.y;
        const newTop = this.setTop(finalTop);
        // this differs from the 'topBoundary' for sheets in dynamic mode
        const naturalTop = this.openMode === 'full' ? TOP_GAP : window.innerHeight - this.el.clientHeight;
        const halfwayBreakpoint = window.innerHeight / 2;
        const bottomDropBreakpoint = lerp(window.innerHeight, naturalTop, 0.6);
        const topDropBreakpoint = lerp(TOP_GAP, naturalTop, 0.6);
        const minSwipeDistance = SWIPE_DISTANCE * window.innerHeight;
        this.dragEventStack.push([e.timeStamp, newTop]);
        const gestureDelta = this.getGestureDelta(e, minSwipeDistance);
        if (gestureDelta > minSwipeDistance) {
            // we have finished the drag by swiping downward,
            // so dismiss regardless of final position
            this.dismiss();
        }
        else if (gestureDelta < -minSwipeDistance) {
            // we have finished the drag by swiping upward,
            // so open the sheet regardless of final position
            this.setState('full-open');
        }
        else if (finalTop > halfwayBreakpoint && finalTop > bottomDropBreakpoint) {
            // we have dragged down to within the bottom drop distance
            this.dismiss();
        }
        else if (finalTop < topDropBreakpoint) {
            // we have dragged up to within the top drop distance
            this.setState('full-open');
        }
        else {
            // we have dragged to a middle position
            this.setState('partial-open');
        }
        this.cleanupDragging();
    }
    // When we start a touch within the scrollable part of the sheet we set up a listener
    // to track this move.
    onScrollStart() {
        this.scrollStart = this.mainContent.scrollTop;
        document.addEventListener('touchmove', this.boundOnScrollDrag, { passive: true });
    }
    // When we get our first touch move event (after touching within the scrollable area)
    // we calculate whether this move will result in scrolling within the sheet. If so we disable
    // the drag event handling for the rest of the touch move and let the browser handle scrolling.
    // If the move won't result in scrolling (i.e. we've alreadry reached the end of the scrollable area)
    // then instead we disable scrolling until the touch move completes, allowing the drag event
    // handlers to operate as normal.
    onScrollDrag(e) {
        const maxScroll = this.mainContent.scrollHeight - this.mainContent.clientHeight;
        const dragCoords = getCoordsFromEvent(e);
        const scrollDelta = getDelta(this.touchStartCoords, dragCoords);
        const scrollTarget = this.scrollStart - scrollDelta.y;
        const { boundOnScrollDrag, mainContent } = this;
        // If the calculated scroll is within the scrollable area, scroll instead of dragging the sheet.
        if (scrollTarget >= 0 && scrollTarget <= maxScroll) {
            // We are scrolling, so we stop all of our drag handling and let the browser handle things from here
            e.stopImmediatePropagation();
            this.cleanupDragging();
        }
        else {
            // this disables scrolling on the scrollable area while the drag is in progress.
            mainContent.setAttribute('dragging', '');
        }
        document.removeEventListener('touchmove', boundOnScrollDrag);
    }
    // Remove expired events from the gesutre tracking stack.
    pruneStack(timeStamp) {
        while (this.dragEventStack.length > 0 && this.dragEventStack[0][0] < timeStamp - SWIPE_WINDOW) {
            this.dragEventStack.shift();
        }
    }
    // 'Replay' events from our gesture tracking stack until we reach total movement
    // that exceeds the minSwipeDistance threshhold (indicating a 'swipe' rather than a 'drop').
    // This means the most recent movement will be considered first, and so if the gesture ends in a
    // swipe this will be detected regardless of the total delta of the gesture.
    // (e.g. the sheet is dragged downward before ending with a swipe up will register as a swipe up
    // even if the released position of the sheet is below its starting position.
    getGestureDelta(e, minSwipeDistance) {
        let gestureDelta = 0;
        let currentTop = this.dragEventStack.pop()[1];
        this.pruneStack(e.timeStamp);
        while (this.dragEventStack.length > 0) {
            const previousTop = this.dragEventStack.pop()[1];
            const updateDelta = currentTop - previousTop;
            gestureDelta += updateDelta;
            currentTop = previousTop;
            if (Math.abs(gestureDelta) > minSwipeDistance)
                break;
        }
        return gestureDelta;
    }
    cleanupDragging() {
        const { boundOnDragMove, boundOnDragEnd, el, mainContent } = this;
        el.removeAttribute('dragging');
        mainContent.removeAttribute('dragging');
        el.removeAttribute('tapdisabled');
        document.removeEventListener('mousemove', boundOnDragMove);
        document.removeEventListener('mouseup', boundOnDragEnd);
        document.removeEventListener('touchmove', boundOnDragMove);
        document.removeEventListener('touchend', boundOnDragEnd);
    }
    onKeyDown(e) {
        switch (e.key) {
            case 'Enter':
                this.dismiss();
                break;
            case ' ':
                this.dismiss(e);
                e.preventDefault(); // spacebar should not scroll page
                break;
        }
    }
    connectedCallback() {
        /**
         * Emit a dialogLoaded event when the component connects. Need this so
         * the context manager isn't rummaging around it's DOM to try and find the
         * dialog that was just appended
         */
        setTimeout(() => {
            this.marketDialogLoaded.emit({
                dialog: this.el,
                type: this.type,
            });
            if (!this.disableFocus) {
                this.activateFocusTrap();
            }
        }, this.hidden ? 0 : cjs.CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION);
    }
    hiddenHandler() {
        this.setState(this.hidden ? 'closed' : 'partial-open');
    }
    componentDidLoad() {
        this.hiddenHandler();
        // when element is resized
        this.heightObserver = new ResizeObserver(throttle(() => {
            this.resetTopByState();
        }, RESIZE_DEBOUNCE_DURATION));
        this.heightObserver.observe(this.el);
        // when visual viewport is resized (aka when virtual keyboard is opened or closed)
        window.visualViewport.addEventListener('resize', throttle(() => {
            this.resetTopByState();
        }, RESIZE_DEBOUNCE_DURATION));
        // when child elements get focus (via click/touch event, keyboard, or browser form assistant)
        this.mainContent.addEventListener('focusin', (e) => {
            this.resetTopByState();
            // wait for any related resetTopByState style changes to settle
            delay$1(() => {
                var _a, _b;
                // if virtual keyboard is open (mobile only), programmatically scroll to focused input
                if (window.visualViewport.offsetTop) {
                    const prevOffsetTop = (_a = e.relatedTarget) === null || _a === void 0 ? void 0 : _a.offsetTop;
                    const currOffsetTop = (_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.offsetTop;
                    // scrollIntoView needs to use different block (vertical alignment) behavior depending on
                    // how the focus was set, otherwise mobile Safari Form Assistant can't reliably move
                    // between all inputs (clicking an input or moving to the previous input uses "center",
                    // moving to the next input uses "start")
                    document.activeElement.scrollIntoView({
                        behavior: 'smooth',
                        block: prevOffsetTop < currOffsetTop ? 'start' : 'center',
                        inline: 'start',
                    });
                }
            }, 250);
        });
    }
    disconnectedCallback() {
        var _a;
        (_a = this.heightObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    render() {
        return (h(Host, { key: '0141e61e23a2b16ef9768c130296e7664c99ddcd', role: "dialog", onMouseDown: (e) => this.onDragStart(e), onTouchStart: (e) => this.onDragStart(e) }, h("button", { key: '08b465eb785a4f2055d448f3db5b062228458f40', "aria-label": this.closeHandleAriaLabel, class: "handle", onClick: this.dismiss.bind(this), onKeyDown: this.onKeyDown.bind(this) }), h("slot", { key: '7d87505923bbd66b5c0ee95c4c8f79f544fda8f6', name: "header" }), h("div", { key: 'c643d8f2e58a18035ca76cbc034bd50922114fe9', class: "main", ref: (el) => (this.mainContent = el), onTouchStart: () => this.onScrollStart() }, h("slot", { key: 'ce2087b1d85f22c5b2edc78b8f6cf9dd687a54e3' }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "hidden": ["hiddenHandler"]
    }; }
};
MarketSheet.style = MarketSheetStyle0;

export { MarketSheet as market_sheet };

//# sourceMappingURL=market-sheet.entry.js.map