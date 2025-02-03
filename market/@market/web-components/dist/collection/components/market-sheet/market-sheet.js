import { CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION, MODAL_SHEET_HANDLE_HEIGHT, MODAL_SHEET_HANDLE_PADDING_BOTTOM_SIZE, MODAL_SHEET_HANDLE_PADDING_TOP_SIZE, } from "@market/market-theme/js/cjs/index.js";
import { Host, h } from "@stencil/core";
import { delay, throttle } from "lodash-es";
import { getCoordsFromEvent, isTouchEvent } from "../../utils/gesture/utils";
import { compress, getDelta, lerp, magnitude } from "../../utils/math/utils";
import { createAndActivateFocusTrap, } from "../../utils/focus-trap";
const TOP_GAP = MODAL_SHEET_HANDLE_HEIGHT + MODAL_SHEET_HANDLE_PADDING_BOTTOM_SIZE + MODAL_SHEET_HANDLE_PADDING_TOP_SIZE;
const SWIPE_DISTANCE = 0.12; // ratio of screen height before drag registers as a gesture
const SWIPE_WINDOW = 250; // time in milliseconds to consider for gesture recognition
const TAP_DISABLE_DISTANCE = 0.01; // ratio of screen height before drag disables tapping child elements
const MIN_DRAG_COMPRESSION_RATIO = 0.8; // (0-1) how much the sheet allows itself to be dragged past its natural boundaries
const MAX_DRAG_COMPRESSION_RATIO = 0.55; // (0-1) how much the sheet allows itself to be dragged past its natural boundaries
const RESIZE_DEBOUNCE_DURATION = 16; // 60fps
export class MarketSheet {
    constructor() {
        this.type = 'sheet';
        // These bound func refs are so we can remove them later
        this.boundOnDragMove = this.onDragMove.bind(this);
        this.boundOnDragEnd = this.onDragEnd.bind(this);
        this.boundOnScrollDrag = this.onScrollDrag.bind(this);
        this.hidden = false;
        this.dialogID = undefined;
        this.openMode = 'partial';
        this.animationEnterDuration = CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;
        this.animationExitDuration = CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION;
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
            await new Promise((resolve) => setTimeout(resolve, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION));
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
            default:
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
        }, this.hidden ? 0 : CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION);
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
            delay(() => {
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
    static get is() { return "market-sheet"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-sheet.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-sheet.css"]
        };
    }
    static get properties() {
        return {
            "hidden": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Used in CSS to trigger start and stop animations"
                        }],
                    "text": ""
                },
                "attribute": "hidden",
                "reflect": true,
                "defaultValue": "false"
            },
            "dialogID": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Used by the context manager to identify a specific dialog/modal"
                        }],
                    "text": ""
                },
                "attribute": "data-dialog-id",
                "reflect": true
            },
            "openMode": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "'full' | 'dynamic' | 'partial'",
                    "resolved": "\"dynamic\" | \"full\" | \"partial\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Default state sheet opens to when opened from close"
                },
                "attribute": "open-mode",
                "reflect": false,
                "defaultValue": "'partial'"
            },
            "animationEnterDuration": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The duration for the modal enter animation, set from design tokens"
                },
                "attribute": "animation-enter-duration",
                "reflect": false,
                "defaultValue": "CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION"
            },
            "animationExitDuration": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The duration for the modal exit animation, set from design tokens"
                },
                "attribute": "animation-exit-duration",
                "reflect": false,
                "defaultValue": "CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION"
            },
            "disableFocus": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Disable focus trapping on the modal"
                },
                "attribute": "disable-focus",
                "reflect": false,
                "defaultValue": "false"
            },
            "closeHandleAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Translated string to label Close handle"
                },
                "attribute": "close-handle-aria-label",
                "reflect": false,
                "defaultValue": "'Close'"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketDialogLoaded",
                "name": "marketDialogLoaded",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Triggered when the sheet finishes loading"
                },
                "complexType": {
                    "original": "DialogLoadedEvent",
                    "resolved": "DialogLoadedEvent",
                    "references": {
                        "DialogLoadedEvent": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::DialogLoadedEvent"
                        }
                    }
                }
            }, {
                "method": "marketDialogDismissed",
                "name": "marketDialogDismissed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Triggered when the sheet is dismissed, handled by context manager"
                },
                "complexType": {
                    "original": "DialogDismissedEvent",
                    "resolved": "DialogDismissedEvent",
                    "references": {
                        "DialogDismissedEvent": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::DialogDismissedEvent"
                        }
                    }
                }
            }, {
                "method": "marketDialogDidDismiss",
                "name": "marketDialogDidDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Triggered when the dialog is fully dismissed"
                },
                "complexType": {
                    "original": "DialogDismissedEvent",
                    "resolved": "DialogDismissedEvent",
                    "references": {
                        "DialogDismissedEvent": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::DialogDismissedEvent"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "activateFocusTrap": {
                "complexType": {
                    "signature": "(options?: FocusTrapOptions, activateOptions?: FocusTrapActivateOptions) => Promise<void>",
                    "parameters": [{
                            "name": "options",
                            "type": "Options",
                            "docs": "[focus-trap `.createFocusTrap` options](https://github.com/focus-trap/focus-trap#createoptions)"
                        }, {
                            "name": "activateOptions",
                            "type": "{ onActivate?: () => void; onPostActivate?: () => void; checkCanFocusTrap?: (containers: (HTMLElement | SVGElement)[]) => Promise<void>; }",
                            "docs": "[focus-trap `.activate` options](https://github.com/focus-trap/focus-trap#trapactivate)"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "FocusTrapOptions": {
                            "location": "import",
                            "path": "../../utils/focus-trap",
                            "id": "src/utils/focus-trap.ts::FocusTrapOptions"
                        },
                        "FocusTrapActivateOptions": {
                            "location": "import",
                            "path": "../../utils/focus-trap",
                            "id": "src/utils/focus-trap.ts::FocusTrapActivateOptions"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Activates the focus trap",
                    "tags": [{
                            "name": "param",
                            "text": "options [focus-trap `.createFocusTrap` options](https://github.com/focus-trap/focus-trap#createoptions)"
                        }, {
                            "name": "param",
                            "text": "activateOptions [focus-trap `.activate` options](https://github.com/focus-trap/focus-trap#trapactivate)"
                        }]
                }
            },
            "deactivateFocusTrap": {
                "complexType": {
                    "signature": "(deactivateOptions?: FocusTrapDeactivateOptions) => Promise<void>",
                    "parameters": [{
                            "name": "deactivateOptions",
                            "type": "DeactivateOptions",
                            "docs": "[focus-trap `.deactivate` options](https://github.com/focus-trap/focus-trap#trapdeactivate)"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "FocusTrapDeactivateOptions": {
                            "location": "import",
                            "path": "../../utils/focus-trap",
                            "id": "src/utils/focus-trap.ts::FocusTrapDeactivateOptions"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Deactivates the focus trap",
                    "tags": [{
                            "name": "param",
                            "text": "deactivateOptions [focus-trap `.deactivate` options](https://github.com/focus-trap/focus-trap#trapdeactivate)"
                        }]
                }
            },
            "dismiss": {
                "complexType": {
                    "signature": "(options?: any) => Promise<void>",
                    "parameters": [{
                            "name": "options",
                            "type": "any",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Emits the dismiss event\nThe parent context will handle actually removing elements from the DOM,\nAll the sheet needs to do it emit an event so actually closing it can be\nsome other elements problem",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "hidden",
                "methodName": "hiddenHandler"
            }];
    }
}
//# sourceMappingURL=market-sheet.js.map
