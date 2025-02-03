import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';
import { a as asyncRequestAnimationFrame } from './raf-ac8923ee.js';

const marketContextManagerCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:fixed;top:0;left:0;z-index:-1000;display:block;overflow:hidden;width:100vw;height:100%;opacity:0%}:host([active]){z-index:1000;opacity:100%;pointer-events:none}";
const MarketContextManagerStyle0 = marketContextManagerCss;

const MarketContextManager = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketContextManagerActivated = createEvent(this, "marketContextManagerActivated", 7);
        this.marketContextManagerDeactivated = createEvent(this, "marketContextManagerDeactivated", 7);
        this.active = false;
        this.currentContext = undefined;
        this.stack = [];
    }
    initChildListObserver() {
        if (this.childListObserver)
            return;
        const updateChildList = () => {
            this.stack = [...this.el.children];
            this.currentContext = this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
        };
        updateChildList();
        this.childListObserver = new MutationObserver(updateChildList);
        this.childListObserver.observe(this.el, { childList: true });
    }
    async getCurrentContext() {
        while (!this.currentContext) {
            await asyncRequestAnimationFrame();
        }
        return this.currentContext;
    }
    contextEmptiedEventHandler({ target: emptiedContext }) {
        // Remove the emptied context from the DOM
        emptiedContext.remove();
        // Remove the emptied context from the stack
        this.stack.splice(this.stack.indexOf(emptiedContext), 1);
        // Set the currentContext to the next highest context or null if this was the
        // only context in the stack
        if (this.stack.length === 0) {
            this.deactivate();
        }
    }
    windowKeydown(e) {
        var _a;
        if (e.key === 'Escape' || e.key === 'Esc') {
            (_a = this.currentContext) === null || _a === void 0 ? void 0 : _a.currentDialog.el.dismiss({ origin: this.el });
        }
    }
    /**
     * Adds the passed dialogEl to the DOM and creates a new context if necessary or according to
     * `shouldCreateNewContext` if it is passed
     */
    async open(dialogEl, shouldCreateNewContext) {
        let createNewContext = shouldCreateNewContext;
        if (!this.currentContext || dialogEl) {
            createNewContext = true;
        }
        // If we don't currently have a context, or we're opening certain types of
        // dialogs, then we should create a new context
        if (createNewContext) {
            this.createNewContext();
        }
        await this.currentContext.open(dialogEl);
    }
    /**
     * Closes the dialog with matching ID
     */
    close(dialogID) {
        this.currentContext.close(dialogID);
        return Promise.resolve();
    }
    /**
     * Adds a new market-context to the stack in the DOM and activates it
     */
    createNewContext() {
        this.activate();
        this.el.appendChild(document.createElement(getNamespacedTagFor('market-context')));
        this.currentContext = this.el.lastElementChild;
        return Promise.resolve();
    }
    /**
     * Hides the entire context manager
     */
    deactivate() {
        this.active = false;
        this.marketContextManagerDeactivated.emit();
        return Promise.resolve();
    }
    /**
     * Shows the context manager
     */
    activate() {
        if (!this.active) {
            this.active = true;
            this.marketContextManagerActivated.emit();
        }
        return Promise.resolve();
    }
    handleMouseEvents(e) {
        var _a, _b;
        // checking to make sure the click started and ended on a market-context
        // with a veil before dismissing the current dialog
        // (clicks pass through contexts w/o veil, currently only used w/ market-blade)
        if (e.type === 'mousedown') {
            this.mouseDownEl = e.target.tagName;
        }
        else if (e.type === 'mouseup') {
            const mouseUpEl = e.target.tagName;
            if (this.mouseDownEl === mouseUpEl &&
                e.target.tagName.toLowerCase() === getNamespacedTagFor('market-context') &&
                !e.target.classList.contains('no-veil')) {
                (_b = (_a = this.currentContext) === null || _a === void 0 ? void 0 : _a.currentDialog) === null || _b === void 0 ? void 0 : _b.el.dismiss({ origin: this.el });
            }
        }
    }
    componentDidLoad() {
        this.initChildListObserver();
    }
    render() {
        return (h(Host, { key: '72a7dfd3862281d08036a4d1af846b8203e73893', class: "market-context-manager", onMouseDown: (e) => this.handleMouseEvents(e), onMouseUp: (e) => this.handleMouseEvents(e) }, h("slot", { key: 'b7ef4e0031991376e48a559f2a026174667ff429' })));
    }
    disconnectedCallback() {
        var _a;
        (_a = this.childListObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    get el() { return getElement(this); }
};
MarketContextManager.style = MarketContextManagerStyle0;

export { MarketContextManager as market_context_manager };

//# sourceMappingURL=market-context-manager.entry.js.map