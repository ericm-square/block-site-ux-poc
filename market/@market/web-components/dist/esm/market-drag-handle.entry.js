import { r as registerInstance, c as createEvent, h, H as Host } from './index-e03cb5c3.js';
import { i as isTouchEvent, g as getCoordsFromEvent } from './utils-b57f24f5.js';

const marketDragHandleCss = ":host{cursor:grab}:host(:active){cursor:grabbing}svg{display:block;fill:var(--drag-handle-normal-state-color, var(--core-fill-20-color))}:host(:hover) svg{fill:var(--drag-handle-hover-state-color, var(--core-fill-10-color))}";
const MarketDragHandleStyle0 = marketDragHandleCss;

const MarketDragHandle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketDragHandleDragStart = createEvent(this, "marketDragHandleDragStart", 7);
        this.marketDragHandleDragMove = createEvent(this, "marketDragHandleDragMove", 7);
        this.marketDragHandleDragEnd = createEvent(this, "marketDragHandleDragEnd", 7);
        // These bound func refs are so we can remove them later
        this.boundOnDragMove = this.onDragMove.bind(this);
        this.boundOnDragEnd = this.onDragEnd.bind(this);
    }
    onDragStart(e) {
        e.preventDefault();
        e.stopPropagation();
        // only start drag on touch events or left mouse clicks
        if (!isTouchEvent(e) && e.button !== 0)
            return;
        const { marketDragHandleDragStart, boundOnDragMove, boundOnDragEnd } = this;
        const coords = getCoordsFromEvent(e);
        const { defaultPrevented } = marketDragHandleDragStart.emit(coords);
        if (defaultPrevented)
            return;
        document.addEventListener('mousemove', boundOnDragMove);
        document.addEventListener('mouseup', boundOnDragEnd);
        // don't use passive touch event listeners so we can call preventDefault()
        document.addEventListener('touchmove', boundOnDragMove, { passive: false });
        document.addEventListener('touchend', boundOnDragEnd, { passive: false });
    }
    onDragMove(e) {
        e.preventDefault();
        const { marketDragHandleDragMove, boundOnDragMove, boundOnDragEnd } = this;
        const coords = getCoordsFromEvent(e);
        const { defaultPrevented } = marketDragHandleDragMove.emit(coords);
        if (defaultPrevented) {
            // cancel the drag
            document.removeEventListener('mousemove', boundOnDragMove);
            document.removeEventListener('mouseup', boundOnDragEnd);
            document.removeEventListener('touchmove', boundOnDragMove);
            document.removeEventListener('touchend', boundOnDragEnd);
        }
    }
    onDragEnd(e) {
        e.preventDefault();
        const { marketDragHandleDragEnd, boundOnDragMove, boundOnDragEnd } = this;
        const coords = getCoordsFromEvent(e);
        const { defaultPrevented } = marketDragHandleDragEnd.emit(coords);
        if (defaultPrevented)
            return;
        document.removeEventListener('mousemove', boundOnDragMove);
        document.removeEventListener('mouseup', boundOnDragEnd);
        document.removeEventListener('touchmove', boundOnDragMove);
        document.removeEventListener('touchend', boundOnDragEnd);
    }
    render() {
        return (h(Host, { key: 'dda02c9d494ab1adf9b5304fe869186c88edec39', class: "market-drag-handle", onMouseDown: (e) => this.onDragStart(e), onTouchStart: (e) => this.onDragStart(e), "aria-hidden": "true" }, h("svg", { key: 'f9f774fcfd26b698663a8b6cb00762ddc223021d', width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '970919adbe5cac235679d2a74d2320f0016dd1d0', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15 8C16.1046 8 17 7.10457 17 6C17 4.89543 16.1046 4 15 4C13.8954 4 13 4.89543 13 6C13 7.10457 13.8954 8 15 8ZM15 14C16.1046 14 17 13.1046 17 12C17 10.8954 16.1046 10 15 10C13.8954 10 13 10.8954 13 12C13 13.1046 13.8954 14 15 14ZM11 18C11 19.1046 10.1046 20 9 20C7.89543 20 7 19.1046 7 18C7 16.8954 7.89543 16 9 16C10.1046 16 11 16.8954 11 18ZM17 18C17 19.1046 16.1046 20 15 20C13.8954 20 13 19.1046 13 18C13 16.8954 13.8954 16 15 16C16.1046 16 17 16.8954 17 18ZM11 12C11 13.1046 10.1046 14 9 14C7.89543 14 7 13.1046 7 12C7 10.8954 7.89543 10 9 10C10.1046 10 11 10.8954 11 12ZM11 6C11 7.10457 10.1046 8 9 8C7.89543 8 7 7.10457 7 6C7 4.89543 7.89543 4 9 4C10.1046 4 11 4.89543 11 6Z" }))));
    }
};
MarketDragHandle.style = MarketDragHandleStyle0;

export { MarketDragHandle as market_drag_handle };

//# sourceMappingURL=market-drag-handle.entry.js.map