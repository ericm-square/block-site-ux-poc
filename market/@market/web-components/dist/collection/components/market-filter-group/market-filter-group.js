import { Host, h } from "@stencil/core";
import { CORE_ANIMATION_EXIT_TRANSITION_FAST_SPEED_DURATION, CORE_BREAKPOINT_NARROW_MAX_WIDTH, CORE_TYPE_PARAGRAPH_20_FONT_FAMILY, CORE_TYPE_PARAGRAPH_20_SIZE, CORE_TYPE_PARAGRAPH_30_FONT_FAMILY, CORE_TYPE_PARAGRAPH_30_SIZE, } from "@market/market-theme/js/cjs/index.js";
import { throttle } from "lodash-es";
import { getNamespacedTagFor, isElementWithTagName } from "../../utils/namespace";
import { asyncRequestAnimationFrame } from "../../utils/raf";
const MAX_VISIBLE_FILTERS = 3;
const FILTER_GROUP_GAP = 8;
const FILTER_BUTTON_WIDTH = 50;
const FILTER_BUTTON_FEEDBACK_GAP = 8;
const RESIZE_DEBOUNCE_DURATION = 16; // 60fps
/**
 * @slot search - Search input, using `<market-input-search>`
 * @slot filters - Filters, using `<market-filter>`
 */
export class MarketFilterGroup {
    constructor() {
        /**
         * Used to hide filters when on compact mode
         */
        this._isSearchActive = false;
        /**
         * Used to focus on the first filter when 'Tab' is pressed on the input search
         */
        this._willFocusOnFirstFilter = false;
        /**
         * Used to delay the overflow dropdown menu from opening
         */
        this._willDelayDropdownOpen = false;
        /**
         * Observers
         */
        this._observers = {};
        this.throttledHandleResize = throttle(this.handleResize.bind(this), RESIZE_DEBOUNCE_DURATION);
        this.maxVisibleFilters = 3;
        this._sortedFilterEls = {
            overflow: [],
            visible: [],
        };
    }
    maxVisibleFiltersWatcher() {
        this.handleResize();
    }
    /**
     * Search is active when it's focused
     */
    marketInputSearchFocusHandler({ detail }) {
        this._isSearchActive = detail;
    }
    /**
     * For every search animation event, we either show or hide filters
     */
    async marketInternalInputSearchCompactAnimationHandler(e) {
        e.stopPropagation();
        await this.handleResize();
        await asyncRequestAnimationFrame();
        /**
         * 'animationstart' means that search is expanded from its compact state.
         * So when the dropdown menu is clicked, we defer the popover from opening
         * right away to prevent jittery animations while elements are getting settled.
         * (See `marketDropdownOpenedHandler` for the delay logic)
         */
        this._willDelayDropdownOpen = e.detail === 'animationstart';
    }
    /**
     * Handle dropdown menu's `marketDropdownOpened` event
     * TODO: There is no `market-dropdown` in this template below.
     * This event is bubbling up from `market-filter-dropdown-menu`.
     * We should refactor this to use a custom event from that instead,
     * but that component does not yet emit custom open/close events.
     */
    marketDropdownOpenedHandler(e) {
        if (!this._willDelayDropdownOpen) {
            return;
        }
        this._willDelayDropdownOpen = false;
        e.preventDefault();
        /**
         * Delay `marketDropdownOpened` and manually open the dropdown later.
         * A little extra time (1.25x) has to be added in case the browser rendering
         * is a bit slow. FAST x 1.25 looks like the sweet spot for now.
         */
        setTimeout(async () => {
            var _a, _b, _c, _d, _e, _f;
            await asyncRequestAnimationFrame();
            await ((_c = (_b = (_a = this._dropdownMenuEl) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(getNamespacedTagFor('market-dropdown'))) === null || _c === void 0 ? void 0 : _c.updateDropdownPosition());
            (_f = (_e = (_d = this._dropdownMenuEl) === null || _d === void 0 ? void 0 : _d.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector(getNamespacedTagFor('market-dropdown'))) === null || _f === void 0 ? void 0 : _f.openDropdown();
        }, CORE_ANIMATION_EXIT_TRANSITION_FAST_SPEED_DURATION * 1.25);
    }
    /**
     * The overflow feedback's text length is based on filters that have value.
     * Basically, the button's structure is: `[ <icon> <gap> <feedback> ]`
     */
    calculateOverflowButtonWidth(filterEls) {
        // if there are no filters, the overflow button will be hidden
        if (!(filterEls === null || filterEls === void 0 ? void 0 : filterEls.length)) {
            return 0;
        }
        const hasValueCount = filterEls.reduce((result, filterEl) => {
            const listEl = filterEl.querySelector(getNamespacedTagFor('market-list'));
            if (listEl === null || listEl === void 0 ? void 0 : listEl.value) {
                return result + 1;
            }
            const datePickerEl = filterEl.querySelector(getNamespacedTagFor('market-date-picker'));
            if (datePickerEl === null || datePickerEl === void 0 ? void 0 : datePickerEl.selectedStartDate) {
                return result + 1;
            }
            return result;
        }, 0);
        // feedback omitted when there's no selection
        if (hasValueCount === 0) {
            return FILTER_BUTTON_WIDTH;
        }
        // render the text in some canvas and calculate its width
        const canvasEl = document.createElement('canvas');
        const context = canvasEl.getContext('2d');
        // assume that the first filter's size is the same size as the rest
        if (filterEls[0].size === 'small') {
            context.font = `${CORE_TYPE_PARAGRAPH_20_SIZE}px ${CORE_TYPE_PARAGRAPH_20_FONT_FAMILY}`;
        }
        else {
            context.font = `${CORE_TYPE_PARAGRAPH_30_SIZE}px ${CORE_TYPE_PARAGRAPH_30_FONT_FAMILY}`;
        }
        const feedbackTextWidth = context.measureText(`${hasValueCount}`).width;
        canvasEl.remove(); // cleanup
        return FILTER_BUTTON_WIDTH + FILTER_BUTTON_FEEDBACK_GAP + feedbackTextWidth;
    }
    getComputedWidth(el) {
        return Number.parseFloat(window.getComputedStyle(el).width);
    }
    /**
     * Find out where the cutoff will happen.
     * Main chunk of the overflow logic happens here
     */
    async findFilterCutoffIndex() {
        var _a, _b;
        if (((_a = this.maxVisibleFilters) !== null && _a !== void 0 ? _a : MAX_VISIBLE_FILTERS) <= 0) {
            return 0;
        }
        const isNarrowBreakpoint = (window === null || window === void 0 ? void 0 : window.innerWidth) <= CORE_BREAKPOINT_NARROW_MAX_WIDTH;
        if (isNarrowBreakpoint && !this._isSearchActive) {
            return 1; // show 1 filter max on narrow breakpoints
        }
        else if (this._isSearchActive) {
            return 0; // search is active so no filters should be shown
        }
        /**
         * Get the widths of all the other components (group, search)
         * where `FILTER_GROUP_GAP` is the gap between elements
         */
        const filterGroupWidth = this.getComputedWidth(this.el);
        const searchWidth = this._slottedInputSearchEl
            ? this.getComputedWidth(this._slottedInputSearchEl) + FILTER_GROUP_GAP
            : 0;
        /**
         * Temporary container where we can measure filter widths
         * https://dev.to/sstraatemans/calculate-html-element-width-before-render-4ii7
         */
        const tempEl = document.createElement('div');
        tempEl.style.width = 'auto';
        tempEl.style.position = 'absolute';
        tempEl.style.visibility = 'hidden';
        this.el.shadowRoot.appendChild(tempEl);
        let index = 0;
        let filterWidths = 0;
        for (const filterEl of this._filterEls) {
            if (index === ((_b = this.maxVisibleFilters) !== null && _b !== void 0 ? _b : MAX_VISIBLE_FILTERS)) {
                break;
            }
            /**
             * Presuming that all the remaining filters (**excluding** the current one, i.e. `filterEl`)
             * will be overflowed, calculate the potential dropdown menu button width.
             * If this is the last filter, it will not be followed by a `market-filter-dropdown-menu`.
             */
            const dropdownMenuButtonWidth = index + 1 === this._filterEls.length // is this the last one?
                ? 0
                : FILTER_GROUP_GAP + this.calculateOverflowButtonWidth(this._filterEls.slice(index));
            // measure the filter's width in the temporary container
            const clonedFilterEl = filterEl.cloneNode(true);
            clonedFilterEl.style.display = 'block';
            tempEl.appendChild(clonedFilterEl);
            // let the shadow DOM render within the temp container first before measuring its width
            await asyncRequestAnimationFrame();
            const filterElWidth = this.getComputedWidth(tempEl);
            tempEl.removeChild(clonedFilterEl);
            // width of all the filters so far; gap is only added for filters after the first
            filterWidths += (index > 0 ? FILTER_GROUP_GAP : 0) + filterElWidth;
            // check if filter can fit
            const potentialWidth = searchWidth + filterWidths + dropdownMenuButtonWidth;
            if (potentialWidth >= filterGroupWidth) {
                // it won't fit; breaking the loop sets the cutoff
                break;
            }
            ++index;
        }
        // cleanup
        this.el.shadowRoot.removeChild(tempEl);
        tempEl.remove();
        return index;
    }
    /**
     * Sort filters:
     * - split by `this._filterCutoffIndex`
     * - visible filters: set attr `[slot="filters"]`; remove `display: none;`
     * - overflow filters: set attr `[slot="overflow-filters"]`; add `display: none;`
     */
    sortVisibleAndOverflowFilters() {
        this._sortedFilterEls = {
            visible: this._filterEls.slice(0, this._filterCutoffIndex),
            overflow: this._filterEls.slice(this._filterCutoffIndex),
        };
        this._sortedFilterEls.visible.forEach((filterEl) => {
            if (filterEl.style.display) {
                filterEl.style.removeProperty('display');
            }
            if (filterEl.getAttribute('slot') !== 'filters') {
                filterEl.setAttribute('slot', 'filters');
            }
        });
        this._sortedFilterEls.overflow.forEach((filterEl) => {
            if (filterEl.style.display !== 'none') {
                filterEl.style.display = 'none';
            }
            if (filterEl.getAttribute('slot') !== 'overflow-filters') {
                filterEl.setAttribute('slot', 'overflow-filters');
            }
        });
    }
    /**
     * Handle screen / component resize
     */
    async handleResize() {
        if (!this.getComputedWidth(this.el)) {
            // element isn't fully rendered yet
            return;
        }
        const index = await this.findFilterCutoffIndex();
        const isFilterCutoffUpdated = index !== this._filterCutoffIndex;
        if (isFilterCutoffUpdated) {
            this._filterCutoffIndex = index;
            await asyncRequestAnimationFrame();
            this.sortVisibleAndOverflowFilters();
            // collapse dropdown if it's expanded
            if (this._dropdownMenuEl) {
                const dropdownEl = this._dropdownMenuEl.querySelector(getNamespacedTagFor('market-dropdown'));
                if (dropdownEl === null || dropdownEl === void 0 ? void 0 : dropdownEl.expanded) {
                    dropdownEl === null || dropdownEl === void 0 ? void 0 : dropdownEl.closeDropdown();
                }
            }
        }
        this.checkIfSearchShouldBeCompact();
    }
    /**
     * Toggle search's compact mode, if present and not focused
     */
    async checkIfSearchShouldBeCompact() {
        var _a, _b;
        if (!this._slottedInputSearchEl || this._slottedInputSearchEl.hasAttribute('focused')) {
            return;
        }
        const isNarrowBreakpoint = (window === null || window === void 0 ? void 0 : window.innerWidth) <= CORE_BREAKPOINT_NARROW_MAX_WIDTH;
        const hasFilters = Boolean((_a = this._filterEls) === null || _a === void 0 ? void 0 : _a.length);
        const hasMoreThanMaxFilters = this._filterEls.length > ((_b = this.maxVisibleFilters) !== null && _b !== void 0 ? _b : MAX_VISIBLE_FILTERS);
        const searchShouldBeCompact = hasFilters && (isNarrowBreakpoint || hasMoreThanMaxFilters);
        // only toggle `compact` when value is new
        if (searchShouldBeCompact !== this._slottedInputSearchEl.hasAttribute('compact')) {
            if (this._slottedInputSearchEl.getAttribute('focused')) {
                await this._slottedInputSearchEl.setFocus(false);
            }
            if (searchShouldBeCompact) {
                this._slottedInputSearchEl.setAttribute('compact', '');
            }
            else {
                this._slottedInputSearchEl.removeAttribute('compact');
            }
        }
    }
    /**
     * When tabbing from the search input and into the first filter,
     */
    handleInputSearchTabKeydown(e) {
        var _a;
        if (e.key === 'Tab' && !e.shiftKey && ((_a = this._filterEls) === null || _a === void 0 ? void 0 : _a.length)) {
            e.preventDefault();
            this._slottedInputSearchEl.blur();
            this._willFocusOnFirstFilter = true;
        }
    }
    /**
     * When input search is focused, make sure that dropdown menu is closed
     */
    handleInputSearchFocus() {
        var _a, _b;
        const dropdownEl = (_b = (_a = this._dropdownMenuEl) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(getNamespacedTagFor('market-dropdown'));
        if (dropdownEl === null || dropdownEl === void 0 ? void 0 : dropdownEl.hasAttribute('expanded')) {
            dropdownEl.closeDropdown();
        }
    }
    registerSlottedInputSearch() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_b = (_a = this._slottedInputSearchEl) === null || _a === void 0 ? void 0 : _a.removeEventListener) === null || _b === void 0 ? void 0 : _b.call(_a, 'keydown', this.handleInputSearchTabKeydown);
        (_d = (_c = this._slottedInputSearchEl) === null || _c === void 0 ? void 0 : _c.removeEventListener) === null || _d === void 0 ? void 0 : _d.call(_c, 'focus', this.handleInputSearchFocus);
        this._slottedInputSearchEl = this.el.querySelector('[slot="search"]');
        (_f = (_e = this._slottedInputSearchEl) === null || _e === void 0 ? void 0 : _e.addEventListener) === null || _f === void 0 ? void 0 : _f.call(_e, 'keydown', this.handleInputSearchTabKeydown.bind(this));
        (_h = (_g = this._slottedInputSearchEl) === null || _g === void 0 ? void 0 : _g.addEventListener) === null || _h === void 0 ? void 0 : _h.call(_g, 'focus', this.handleInputSearchFocus.bind(this));
        this.checkIfSearchShouldBeCompact();
    }
    registerSlottedFilters() {
        this._filterEls = [...this.el.children].filter((el) => isElementWithTagName(el, 'market-filter'));
    }
    observeContent(el) {
        if (!this._observers.content) {
            this._observers.content = new ResizeObserver(this.throttledHandleResize);
            this._observers.content.observe(el);
        }
    }
    filtersOnSlotChangeHandler() {
        this.registerSlottedFilters();
        this.handleResize();
    }
    connectedCallback() {
        if (!this._observers.host) {
            this._observers.host = new ResizeObserver(this.throttledHandleResize);
            this._observers.host.observe(this.el);
        }
    }
    componentWillLoad() {
        this.registerSlottedFilters();
        this.registerSlottedInputSearch();
        this.handleResize();
    }
    componentWillRender() {
        var _a, _b, _c;
        // if 'Tab' was pressed (see `handleInputSearchTabKeydown`), attempt to focus on the first filter
        if (this._willFocusOnFirstFilter) {
            (_c = (_b = (_a = this._filterEls) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.setFocus) === null || _c === void 0 ? void 0 : _c.call(_b);
            this._willFocusOnFirstFilter = false;
        }
    }
    disconnectedCallback() {
        Object.entries(this._observers).forEach(([key, observer]) => {
            if (observer) {
                observer.disconnect();
                this._observers[key] = undefined;
            }
        });
    }
    render() {
        var _a, _b;
        /**
         * The dropdown menu button will follow the size of the first filter;
         * basically assuming that the rest of the filters follow the same size.
         */
        const dropdownMenuButtonSize = (_b = (_a = this._filterEls) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.size;
        const MarketFilterDropdownMenuTagName = getNamespacedTagFor('market-filter-dropdown-menu');
        return (h(Host, { key: 'bcebdf2c66d61a3bdf5b7e68b049ae8aef8d592b', class: "market-filter-group" }, h("div", { key: '54f3edb35faf0ebabc85d5564f15d144aa8405d2', class: "content", ref: (el) => this.observeContent(el) }, h("slot", { key: '0f0f1052cf9714fbf3dd9d134fb509979bd8f03a', name: "search", onSlotchange: () => this.registerSlottedInputSearch() }), h("slot", { key: '30813cd9185d3cf5728e7fe20e90e3cda4bb3388', name: "filters", onSlotchange: () => this.filtersOnSlotChangeHandler() }), this._sortedFilterEls.overflow.length > 0 && (h(MarketFilterDropdownMenuTagName, { key: '7db61ce101fcd40d802ccfb58f238c61312b857a', class: "dropdown-menu", size: dropdownMenuButtonSize, ref: (el) => (this._dropdownMenuEl = el) }, h("slot", { key: '6f0d43ea458edc1181a046ab7d261aabd4f0b5f8', name: "overflow-filters", slot: "overflow-filters" }))))));
    }
    static get is() { return "market-filter-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-filter-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-filter-group.css"]
        };
    }
    static get properties() {
        return {
            "maxVisibleFilters": {
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
                    "tags": [{
                            "name": "default",
                            "text": "3"
                        }],
                    "text": "Maximum number of visible filters before they are truncated and moved into the overflow menu.\nHowever, filters may be truncated anyway if there is not enough space."
                },
                "attribute": "max-visible-filters",
                "reflect": false,
                "defaultValue": "3"
            }
        };
    }
    static get states() {
        return {
            "_sortedFilterEls": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "maxVisibleFilters",
                "methodName": "maxVisibleFiltersWatcher"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketInputSearchFocus",
                "method": "marketInputSearchFocusHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketInternalInputSearchCompactAnimation",
                "method": "marketInternalInputSearchCompactAnimationHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDropdownOpened",
                "method": "marketDropdownOpenedHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-filter-group.js.map
