import { g as getMaxZIndex } from './max-z-index.js';
import { a as asyncRequestAnimationFrame } from './raf.js';
import { g as getNamespacedTagFor } from './index2.js';

// This function sets CSS styles on an element and returns a promise.
// The promise is resolved after any CSS transitions complete on the changed styles.
// It's smart enough to resolve immediately if there is no transition on the style.
// However, this is intended to be used with transitions that are set in CSS files.
//
// Example usage:
// await transitionToPromise(element, {
//   top: '100px',
//   height: '100px',
//   transform: 'scale(2)',
// });
//
// adapted from https://gist.github.com/davej/44e3bbec414ed4665220
async function transitionToPromise(el, styles) {
    const computedStyle = getComputedStyle(el);
    const { transitionProperty } = computedStyle;
    const properties = transitionProperty.split(', ');
    return Promise.all(Object.keys(styles).map((property) => {
        const value = styles[property];
        return new Promise((resolve) => {
            // if no value to set, resolve
            if (!value)
                resolve();
            // if same value, resolve
            if (value === el.style[property])
                resolve();
            // if no transition on this property, set it and resolve
            if (!properties.includes(property)) {
                el.style[property] = value;
                resolve();
            }
            // otherwise, set up a listener for transitionend
            const transitionEnded = (e) => {
                if (e.propertyName !== property)
                    return;
                el.removeEventListener('transitionend', transitionEnded);
                resolve();
            };
            el.addEventListener('transitionend', transitionEnded);
            el.style[property] = value;
        });
    }));
}

function isMarketTableV2Row(value) {
    const tagName = value === null || value === void 0 ? void 0 : value.tagName.toLowerCase();
    return Boolean(value && tagName === getNamespacedTagFor('market-table-v2-row'));
}

function isMarketTableV2Group(value) {
    const tagName = value === null || value === void 0 ? void 0 : value.tagName.toLowerCase();
    return Boolean(value && tagName === getNamespacedTagFor('market-table-v2-group'));
}

function isDraggable(value) {
    return Boolean(value && value.dragEnabled !== undefined);
}
const SCROLL_DELAY = Math.min(1000 / 60); // shoot for ~60 fps
const SCROLL_STEP_MAX = 24; // max scroll 24px at a time
const MarketTableV2GroupTag = getNamespacedTagFor('market-table-v2-group');
/*
  This util class abstracts & encapsulates drag & drop functionality for a component.

  When wired up to a component, it does the following:
  - adds a .market-drag-placeholder class to the original dragged element
  - clones the dragged element with a class of .market-drag-clone
  - visually tracks the drag move with the cloned element via CSS transform
  - fires custom events on the dragged element:
    - marketDragStart: fires on drag start
    - marketDragEnd: fires on drag end
    - marketDragComplete: fires when the dragged element's transition completes
  - fires custom events on the drag target:
    - marketDragEnter: fires when the dragged element enters a new target
    - marketDragMove: fires when the dragged element moves over a target
    - marketDragLeave: fires when the dragged element leaves a target
    - marketDragDrop: fires when the dragged element is dropped on a target
  - adds a .market-drag-released class to transition the clone back to the placeholder

  Intended to be wired up via events fired by <market-drag-handle> like so:

  ```html
  <Host
    onMarketDragHandleDragStart={(e: CustomEvent<TMarketDragCoords>) => this.onDragStart(e)}
    onMarketDragHandleDragMove={(e: CustomEvent<TMarketDragCoords>) => this.onDragMove(e)}
    onMarketDragHandleDragEnd={(e: CustomEvent<TMarketDragCoords> => this.onDragEnd(e)}
  >
    <market-drag-handle></market-drag-handle>
  </Host>
  ```

  ```js
  async onDragStart(e: CustomEvent<TMarketDragCoords>) {
    const coords: TMarketDragCoords = e.detail;
    this.drag = new Draggable(this.el, { anchor: 'right' });
    await this.drag.start(coords);
  }
  onDragMove(e: CustomEvent<TMarketDragCoords>) {
    const coords: TMarketDragCoords = e.detail;
    this.drag.move(coords);
  }
  async onDragEnd(e: CustomEvent<TMarketDragCoords>) {
    const coords: TMarketDragCoords = e.detail;
    await this.drag.end(coords);
    this.drag.destroy();
  }
  ```

  ```css
  // the original element stays in place and gets this class.
  // use it to add placeholder styles, e.g. a grayed out row, etc.
  :host(.market-drag-placeholder) {
    color: gray;
    background: gray;
  }

  // the cloned element follows the drag via CSS transform and gets this class.
  // to add styles for the dragged element, do it here. for example:
  // - you want to size the dragged element with a width and/or height
  // - you want to transition from the starting size & position
  // - you want to transition in a drop-shadow (see below)
  :host(.market-drag-clone) {
    min-width: 200px;
    transition-timing-function: ease;
    transition-duration: 200ms;
    transition-property: top, width, height;

    // pro tip: transitioning the opacity of a pseudo with a
    // box-shadow is hardware accelerated and more performant
    // than transitioning the box-shadow property directly
    &::after {
      box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
      opacity: var(--market-drag-clone-shadow-opacity, 0); // set by draggable
      transition: 200ns opacity ease;
    }
  }

  // the cloned element gets this class when released.
  // use it to transition clone back to the placeholder.
  :host(.market-drag-released) {
    transition-timing-function: ease;
    transition-duration: 200ms;
    transition-property: top, width, height, transform;
  }
  ```
*/
class Draggable {
    // Init the class with the element to be dragged
    constructor(el, opts) {
        this.el = el;
        this.anchor = (opts === null || opts === void 0 ? void 0 : opts.anchor) || 'none';
    }
    // Start a drag movement on the element:
    // - adds a .market-drag-placeholder class to the dragged element
    // - clones the dragged element with a class of .market-drag-clone
    // - fires marketDragStart custom event on the dragged element
    async start(coords) {
        this.canceled = false;
        const { x, y } = coords;
        this.startCoords = this.previousCoords = coords;
        const { el, anchor } = this;
        // find and measure a reference element
        // special case: if el is a table group, reference its parent row
        const referenceElement = isMarketTableV2Group(el) ? el.querySelector('[slot="parent"]') : el;
        const { top: startTop, right: startRight, left: startLeft, width: startWidth, height: startHeight, } = measureElement(referenceElement);
        // get the drag source
        const source = el.parentElement;
        // get the drag target
        const target = document.elementsFromPoint(x, y)[0];
        // clone the reference element to visually track the drag movement
        const clone = referenceElement.cloneNode(true);
        clone.classList.add('market-drag-clone', 'market-drag-transitioning');
        // save references
        this.source = source;
        this.target = target;
        this.clone = clone;
        // fire start event
        const defaultPrevented = !el.dispatchEvent(new CustomEvent('marketDragStart', {
            bubbles: true,
            cancelable: true,
            detail: Object.assign(Object.assign({}, coords), { el,
                source,
                target,
                clone }),
        }));
        if (defaultPrevented) {
            this.canceled = true;
            return;
        }
        // get nearest scrollable parent
        this.scrollParent = getScrollParent(el);
        // the original element becomes a placeholder when it's dragged
        el.classList.add('market-drag-placeholder');
        // append and measure the clone's final size
        // - if desired, dragged dimensions should be specified in CSS
        Object.assign(clone.style, {
            position: 'fixed',
            opacity: 0, // hidden while we measure it
            transitionProperty: 'none', // turn transitions off
        });
        document.body.append(clone);
        await asyncRequestAnimationFrame();
        const { width: finalWidth, height: finalHeight } = measureElement(clone);
        // set the clone's initial position to match the reference element
        Object.assign(clone.style, {
            opacity: '', // visible now that we've measured it
            width: `${startWidth}px`,
            height: `${startHeight}px`,
            top: `${startTop}px`,
            left: anchor !== 'right' ? `${startLeft}px` : 'auto',
            right: anchor !== 'left' ? `${window.innerWidth - startRight}px` : 'auto',
            zIndex: `${getMaxZIndex(document.body) + 1}`,
        });
        await asyncRequestAnimationFrame();
        // eslint-disable-next-line require-atomic-updates
        clone.style.transitionProperty = ''; // turn transitions back on
        // special case: if clone is a table row, add class to style the first cell
        if (isMarketTableV2Row(clone)) {
            clone.querySelector('market-table-v2-cell').classList.add('market-drag-clone-first-cell');
        }
        // add optional drop shadow opacity (custom CSS property)
        clone.style.setProperty('--market-drag-clone-shadow-opacity', '1');
        // transition clone to dragged size and position
        transitionToPromise(clone, {
            top: `${startTop + (startHeight - finalHeight) / 2}px`,
            height: `${finalHeight}px`,
            width: anchor === 'none' ? `${startWidth}px` : `${finalWidth}px`,
        }).then(() => {
            clone.classList.remove('market-drag-transitioning');
        });
    }
    // Continues a drag movement on the element:
    // - visually tracks the drag move with the cloned element via CSS transform
    // - fires marketDragEnter, marketDragMove, & marketDragLeave custom events on drag targets
    move(coords) {
        const { el, clone, source, target, startCoords, previousCoords, canceled } = this;
        const { x, y } = coords;
        // if the drag has already been canceled, return early
        if (canceled)
            return;
        // if for some reason we have no clone, return early
        if (!clone)
            return;
        // if the drag coords haven't changed, return early
        if (x === previousCoords.x && y === previousCoords.y)
            return;
        // save the current coords
        this.previousCoords = coords;
        // get the first drag target that is not the clone or its descendants
        const newTarget = [...document.elementsFromPoint(x, y)].find((target) => {
            return !clone.contains(target);
        });
        // if drag target is new
        if (newTarget !== target) {
            // fire leave on current target
            target === null || target === void 0 ? void 0 : target.dispatchEvent(new CustomEvent('marketDragLeave', {
                bubbles: true,
                detail: {
                    x,
                    y,
                    el,
                    source,
                    target,
                    clone,
                },
            }));
            // fire enter on new target
            newTarget === null || newTarget === void 0 ? void 0 : newTarget.dispatchEvent(new CustomEvent('marketDragEnter', {
                bubbles: true,
                detail: {
                    x,
                    y,
                    el,
                    source,
                    target: newTarget,
                    clone,
                },
            }));
            // update current drag target
            this.target = newTarget;
        }
        // fire drag move on new target
        newTarget === null || newTarget === void 0 ? void 0 : newTarget.dispatchEvent(new CustomEvent('marketDragMove', {
            bubbles: true,
            detail: {
                x,
                y,
                el,
                source,
                target: newTarget,
                clone,
            },
        }));
        // move the clone with the drag move
        const deltaX = x - startCoords.x;
        const deltaY = y - startCoords.y;
        Object.assign(clone.style, {
            transform: `translate(${deltaX}px, ${deltaY}px)`,
        });
        // scroll the scrollParent if need be
        this.scroll();
    }
    // Ends a drag movement on the element:
    // - fires marketDragEnd custom event on the dragged element
    // - fires marketDragDrop custom event on drag target
    // - removes the cloned element after transitioning it back to the placeholder
    // - removes the .market-drag-placeholder class from the dragged element
    async end(coords) {
        if (this.canceled)
            return;
        const { el, source, clone, anchor, scrollInterval } = this;
        const { x, y } = coords;
        // stop any current scrolling
        clearInterval(scrollInterval);
        // if for some reason we have no clone, return early
        if (!clone)
            return;
        // get the first drag target that is not the clone or its descendants
        const target = [...document.elementsFromPoint(x, y)].find((target) => {
            return !clone.contains(target);
        });
        // fire end event on dragged element
        const defaultPrevented = !el.dispatchEvent(new CustomEvent('marketDragEnd', {
            bubbles: true,
            cancelable: true,
            detail: {
                x,
                y,
                el,
                source,
                target,
                clone,
            },
        }));
        // fire drop event on target
        if (!defaultPrevented) {
            target === null || target === void 0 ? void 0 : target.dispatchEvent(new CustomEvent('marketDragDrop', {
                bubbles: true,
                cancelable: false,
                detail: {
                    x,
                    y,
                    el,
                    source,
                    target,
                    clone,
                },
            }));
        }
        // find the reference element, w/ some special logic for table groups
        const collapsedTableGroup = farthest(el, `${MarketTableV2GroupTag}[collapsed]`);
        const draggedIntoCollapsedGroup = collapsedTableGroup && collapsedTableGroup !== el;
        const referenceElement = draggedIntoCollapsedGroup
            ? collapsedTableGroup.querySelector('[slot="parent"]')
            : isMarketTableV2Group(el)
                ? el.querySelector('[slot="parent"]')
                : el;
        // measure the elements
        await asyncRequestAnimationFrame();
        const { top: finalTop, right: finalRight, left: finalLeft, width: finalWidth, height: finalHeight, } = measureElement(referenceElement);
        const { top: startTop, right: startRight, left: startLeft, width: startWidth, height: startHeight, } = measureElement(clone);
        const deltaX = anchor === 'left' ? startLeft - finalLeft : startRight - finalRight;
        const deltaY = startTop - finalTop;
        // update the clone position so that its top & left origin
        // is the same as the dragged element (which may have been moved!)
        // delta transform will result in the clone appearing in the same spot
        Object.assign(clone.style, {
            pointerEvents: 'none', // disable mouse events
            transitionProperty: 'none', // turn transitions off
            top: `${finalTop}px`,
            left: anchor !== 'right' ? `${finalLeft}px` : 'auto',
            right: anchor !== 'left' ? `${window.innerWidth - finalRight}px` : 'auto',
            width: `${startWidth}px`,
            height: `${startHeight}px`,
            transform: `translate(${deltaX}px, ${deltaY}px)`,
        });
        await asyncRequestAnimationFrame();
        // eslint-disable-next-line require-atomic-updates
        clone.style.transitionProperty = ''; // turn transitions back on
        // special case: if clone is a table row, remove styling from the first cell
        if (isMarketTableV2Row(clone) && isMarketTableV2Row(referenceElement)) {
            clone.querySelector('market-table-v2-cell').classList.remove('market-drag-clone-first-cell');
        }
        // remove the transform to transition clone back to the placeholder.
        clone.classList.add('market-drag-released', 'market-drag-transitioning');
        if (draggedIntoCollapsedGroup)
            clone.classList.add('market-drag-into-collapsed-group');
        clone.style.removeProperty('--market-drag-clone-shadow-opacity');
        await asyncRequestAnimationFrame();
        await transitionToPromise(clone, {
            width: `${finalWidth}px`,
            height: `${finalHeight}px`,
            transform: deltaX || deltaY ? 'translate(0, 0)' : null,
        });
        // cleanup
        el.classList.remove('market-drag-placeholder');
        clone.remove();
        // fire event on dragged element when its transition completes
        el === null || el === void 0 ? void 0 : el.dispatchEvent(new CustomEvent('marketDragComplete', {
            bubbles: true,
            cancelable: false,
            detail: {
                x,
                y,
                el,
                source,
                target,
                clone,
            },
        }));
    }
    scroll() {
        const { clone, scrollParent, scrollInterval } = this;
        // stop any current scrolling
        clearInterval(scrollInterval);
        // measure the clone position
        const { bottom: cloneBottom, top: cloneTop, right: cloneRight, left: cloneLeft } = measureElement(clone);
        // measure the scroll parent position
        const { bottom: scrollParentBottom, top: scrollParentTop, right: scrollParentRight, left: scrollParentLeft, } = getScrollParentRect(scrollParent);
        // scroll vertically if clone is over a vertical edge
        const deltaBottom = cloneBottom - scrollParentBottom;
        const deltaTop = cloneTop - scrollParentTop;
        const top = deltaBottom > 0
            ? Math.min(deltaBottom / 4, SCROLL_STEP_MAX)
            : deltaTop < 0
                ? Math.max(deltaTop / 4, -SCROLL_STEP_MAX)
                : 0;
        // scroll horizontally if clone is over a horizontal edge
        const deltaRight = cloneRight - scrollParentRight;
        const deltaLeft = cloneLeft - scrollParentLeft;
        const left = deltaRight > 0
            ? Math.min(deltaRight / 4, SCROLL_STEP_MAX)
            : deltaLeft < 0
                ? Math.max(deltaLeft / 4, -SCROLL_STEP_MAX)
                : 0;
        if (top !== 0 || left !== 0) {
            this.scrollInterval = setInterval(() => {
                scrollParent.scrollBy({ top, left });
            }, SCROLL_DELAY);
        }
    }
    // clean up var refs
    destroy() {
        this.el = null;
        this.clone = null;
        this.source = null;
        this.target = null;
        this.startCoords = null;
        this.canceled = null;
        this.scrollParent = null;
        this.scrollInterval = null;
        this.anchor = null;
    }
}
// Finds the nearest scrollable ancestor element.
// Looks for scrolling in both X and Y directions. Returns the document if no element is found.
// Works for now for our purposes, but may eventually need to take into account other display/position types.
function getScrollParent(element) {
    let parent = element.parentElement;
    while (parent !== document.documentElement) {
        const { overflowY, overflowX } = getComputedStyle(parent);
        const scrollableY = /(auto|scroll)/.test(overflowY) && parent.scrollHeight > parent.offsetHeight;
        const scrollableX = /(auto|scroll)/.test(overflowX) && parent.scrollWidth > parent.offsetWidth;
        if (scrollableY || scrollableX)
            return parent;
        parent = parent.parentElement;
    }
    return document.documentElement;
}
// Basically getBoundingClientRect() but handles an edge case
// where the scrollable parent could be the document itself
function getScrollParentRect(element) {
    const { top, right, bottom, left } = measureElement(element);
    if (element === document.documentElement) {
        // we actually want the window size in this case
        const top = 0;
        const right = window.innerWidth;
        const bottom = window.innerHeight;
        const left = 0;
        return { top, right, bottom, left };
    }
    return { top, right, bottom, left };
}
// This does the opposite of element.closest(selector).
// That is, it finds the outermost ancestor element that matches the selector.
function farthest(el, selector) {
    let farthest;
    let pointer = el;
    while (pointer !== document.body) {
        const nextClosest = pointer.closest(selector);
        if (nextClosest)
            farthest = nextClosest;
        pointer = pointer.parentElement;
    }
    return farthest;
}
// Basically getBoundingClientRect() but rounded
function measureElement(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: Math.round(rect.top),
        right: Math.round(rect.right),
        bottom: Math.round(rect.bottom),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
    };
}

export { Draggable as D, isMarketTableV2Group as a, isMarketTableV2Row as b, isDraggable as i };

//# sourceMappingURL=draggable.js.map