import { i as isDraggable, a as isMarketTableV2Group, b as isMarketTableV2Row } from './draggable.js';
import { a as asyncRequestAnimationFrame } from './raf.js';

var _a;
function isReorderable(value) {
    return Boolean(value && ['internal', 'external'].includes(value.reorderable));
}
const TABLE_GROUP_EXPAND_TIMEOUT_DURATION = 300;
/*
  This util class abstracts & encapsulates reorderable functionality for a component.

  In the constructor:
  - `el` is the component element to apply reordering functionality to
  - `accepts` is an array of CSS selectors that are valid draggable elements
  - `event` is the stencil EventEmitter to fire when a reorder event occurs

  Intended to be wired up via drag events fired by a dragged object like so:
  
  ```html
  <Host
    onMarketDragMove={(e: CustomEvent<TMarketDragEventDetail>) => this.onDragMove(e)}
    onMarketDragLeave={() => this.onDragLeave()}
    onMarketDragEnd={(e: CustomEvent<TMarketDragEventDetail>) => this.onDragEnd(e)}
    onMarketDragDrop={(e: CustomEvent<TMarketDragEventDetail>) => this.onDragDrop(e)}
  >
    ...
  </Host>
  ```

  ```js
  this.reorder = new Reorderable({
    el: this.el,
    accepts: ['market-row'],
    event: marketListItemsReordered,
  });
  onDragMove(e: CustomEvent<TMarketDragEventDetail>) {
    this.reorder.dragMove(e);
  }
  onDragLeave() {
    this.reorder.dragLeave();
  }
  onDragEnd(e: CustomEvent<TMarketDragEventDetail>) {
    this.reorder.dragEnd(e);
  }
  onDragDrop(e: CustomEvent<TMarketDragEventDetail>) {
    this.reorder.dragDrop(e);
  }
  ```

  ```css
  // the drag cursor inserted to show current drop location
  ::slotted(.market-drag-cursor) { ... }
  ```
*/
class Reorderable {
    static createCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('market-drag-cursor');
        return cursor;
    }
    constructor({ el, accepts, event, mode, }) {
        this.el = el;
        this.accepts = accepts;
        this.event = event;
        this.mode = mode;
    }
    isValidDrag(dragged, source, target) {
        const { el, accepts } = this;
        const reorderableSource = source === null || source === void 0 ? void 0 : source.closest('[reorderable="internal"], [reorderable="external"]');
        const reorderableTarget = target === null || target === void 0 ? void 0 : target.closest('[reorderable="internal"], [reorderable="external"]');
        // begin with type checks...
        if (!isDraggable(dragged))
            return false;
        if (!isReorderable(reorderableSource))
            return false;
        if (!isReorderable(reorderableTarget))
            return false;
        // is this an accepted draggable item?
        if (dragged.closest(accepts.join(',')) !== dragged)
            return false;
        // is this element either the source or destination?
        if (el !== reorderableSource && el !== reorderableTarget)
            return false;
        // if source & destination elements are different...
        if (reorderableSource !== reorderableTarget) {
            // are they both reorderable externally?
            const bothExternal = reorderableSource.reorderable === 'external' && reorderableTarget.reorderable === 'external';
            // or do they have a common reorderable ancestor?
            const closestReorderable = getCommonAncestor(reorderableSource, reorderableTarget).closest('[reorderable="internal"], [reorderable="external"]');
            if (!bothExternal && !closestReorderable)
                return false;
        }
        // looks like we're good!
        return true;
    }
    /**
     * Fired on a target element when an item is dragged over the target.
     */
    dragMove(e) {
        var _b, _c;
        const { el, accepts, tableGroupExpandTimeout } = this;
        const { y, el: dragged, source, target } = e.detail;
        const { cursor } = _a;
        // check drag validity
        if (!this.isValidDrag(dragged, source, target))
            return;
        // clear the table group timeout
        clearTimeout(tableGroupExpandTimeout);
        // remove cursor parent class
        (_b = cursor.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('market-drag-cursor-parent');
        // if this element is the drag target itself (not another child)
        if (target === el) {
            el.append(cursor);
            el.classList.add('market-drag-cursor-parent');
            return;
        }
        // otherwise, find the nearest child item target
        const targetSibling = target.closest(accepts.join(','));
        // do nothing if no target sibling
        if (!targetSibling)
            return;
        // do nothing if the target sibling is the placeholder
        if (targetSibling === dragged)
            return;
        // determine where to insert cursor based on mouse position
        if (isMarketTableV2Group(targetSibling)) {
            // special case for table groups; look at the parent row
            const parent = [...targetSibling.children].find((el) => isMarketTableV2Row(el) && el.slot === 'parent');
            const { top, height } = parent.getBoundingClientRect();
            if (targetSibling.collapsible && targetSibling.collapsed) {
                const oneThird = Math.round(top + height / 3);
                const twoThirds = Math.round(top + (height * 2) / 3);
                if (y < oneThird) {
                    // insert cursor before the group
                    targetSibling.before(cursor);
                }
                else if (y > twoThirds) {
                    // insert cursor after the group
                    targetSibling.after(cursor);
                }
                else {
                    // insert cursor inside the group after the parent
                    parent.after(cursor);
                    const children = [...targetSibling.children].filter((el) => (isMarketTableV2Row(el) || isMarketTableV2Group(el)) && !el.slot);
                    // set a timeout to expand the group if hovered
                    if (children.length > 0) {
                        this.tableGroupExpandTimeout = setTimeout(async () => {
                            await targetSibling.setCollapsed(false);
                            await asyncRequestAnimationFrame();
                            parent.after(cursor);
                        }, TABLE_GROUP_EXPAND_TIMEOUT_DURATION);
                    }
                }
            }
            else {
                const halfway = Math.round(top + height / 2);
                if (y < halfway) {
                    // insert cursor before the group
                    targetSibling.before(cursor);
                }
                else {
                    // insert cursor inside the group after the parent
                    parent.after(cursor);
                }
            }
        }
        else {
            const { top, height } = targetSibling.getBoundingClientRect();
            const halfway = Math.round(top + height / 2);
            if (y < halfway) {
                targetSibling.before(cursor);
            }
            else {
                targetSibling.after(cursor);
            }
        }
        // mark the cursor's parent
        (_c = cursor.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add('market-drag-cursor-parent');
    }
    /**
     * Fired on a target element when a dragged item leaves the target
     */
    dragLeave() {
        var _b;
        const { tableGroupExpandTimeout } = this;
        const { cursor } = _a;
        // remove the cursor and parent class
        (_b = cursor.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('market-drag-cursor-parent');
        cursor.remove();
        // clear the table group timeout
        clearTimeout(tableGroupExpandTimeout);
    }
    /**
     * Fired on a dragged item when it is released.
     * Useful to determine if an item was dropped externally.
     */
    dragEnd(e) {
        const { el, accepts, event, tableGroupExpandTimeout } = this;
        const { el: dragged, source } = e.detail;
        const { cursor } = _a;
        // clear the table group timeout
        clearTimeout(tableGroupExpandTimeout);
        // instead of using target from the event detail, use cursor's parent
        const target = cursor.parentElement;
        // check for drag validity
        if (!this.isValidDrag(dragged, source, target))
            return;
        // do nothing if the source and target are the same reorderable
        const reorderableSource = source === null || source === void 0 ? void 0 : source.closest('[reorderable="internal"], [reorderable="external"]');
        const reorderableTarget = target === null || target === void 0 ? void 0 : target.closest('[reorderable="internal"], [reorderable="external"]');
        if (reorderableSource === reorderableTarget)
            return;
        // we now know the element is being dragged out of its reorderable parent,
        // so we stop propagation on original event so reorder event isn't duped.
        e.stopImmediatePropagation();
        // note: dragging externally means new index = -1
        const items = getReorderableItems(el, accepts);
        const oldIndex = items.indexOf(dragged);
        const newIndex = -1;
        // emit the reorder event and check for prevent default
        const { defaultPrevented } = event.emit({
            item: dragged,
            oldIndex,
            newIndex,
        });
        // if reorder event was prevented, prevent the drop event
        if (defaultPrevented) {
            e.preventDefault();
            cursor.remove();
        }
    }
    /**
     * Fired on a target element when a dragged item is released over the target.
     */
    async dragDrop(e) {
        const { el, accepts, event, mode, tableGroupExpandTimeout } = this;
        const { el: dragged, source } = e.detail;
        const { cursor } = _a;
        // clear the table group timeout
        clearTimeout(tableGroupExpandTimeout);
        // if this is not the cursor's parent, do nothing and let the event bubble up
        const reorderableTarget = cursor.parentElement;
        if (el !== reorderableTarget)
            return;
        // check for drag validity
        if (!this.isValidDrag(dragged, source, reorderableTarget))
            return;
        // prevent the event from further bubbling up
        e.stopImmediatePropagation();
        // remove cursor parent class
        reorderableTarget === null || reorderableTarget === void 0 ? void 0 : reorderableTarget.classList.remove('market-drag-cursor-parent');
        // if the cursor is a sibling of the dragged element, do nothing
        if ([cursor.previousElementSibling, cursor.nextElementSibling].includes(dragged)) {
            cursor.remove();
            return;
        }
        // note: if item is external, then old index is -1
        const items = getReorderableItems(reorderableTarget, accepts);
        const oldIndex = items.indexOf(dragged);
        // find new index
        const itemsWithoutDraggedEl = [...items];
        if (oldIndex >= 0) {
            itemsWithoutDraggedEl.splice(oldIndex, 1);
        }
        const newIndex = itemsWithoutDraggedEl.indexOf(cursor.previousElementSibling) + 1;
        // same index means no reorder event
        if (newIndex === oldIndex) {
            cursor.remove();
            return;
        }
        // create a temp div to hold the element's original position
        const originalPosition = document.createElement('div');
        // insert the dragged element at the cursor's position
        dragged.replaceWith(originalPosition);
        cursor.replaceWith(dragged);
        // await the drop completion event
        await new Promise((resolve) => dragged.addEventListener('marketDragComplete', resolve, { once: true }));
        // in framework mode, restore the original position before firing event
        if (mode === 'framework')
            originalPosition.replaceWith(dragged);
        // fire the reorder event and check for prevent default
        const { defaultPrevented } = event.emit({
            item: dragged,
            oldIndex,
            newIndex,
        });
        // in default mode, restore the original position if event was prevented
        if (defaultPrevented && mode === 'default')
            originalPosition.replaceWith(dragged);
        // cleanup: remove the original position if still in DOM
        originalPosition.remove();
    }
    // clean up var refs
    destroy() {
        _a.cursor.remove();
        clearTimeout(this.tableGroupExpandTimeout);
        this.el = null;
        this.accepts = null;
        this.event = null;
        this.mode = null;
        this.tableGroupExpandTimeout = null;
    }
}
_a = Reorderable;
// static instance var means only one cursor shared across all Reorderable instances
Reorderable.cursor = _a.createCursor();
function getReorderableItems(el, accepts) {
    const items = [];
    const scopedSelectors = accepts.map((selector) => `:scope > ${selector}`);
    el.querySelectorAll(scopedSelectors.join(',')).forEach((item) => {
        if (isDraggable(item))
            items.push(item);
    });
    return items;
}
function getCommonAncestor(node1, node2) {
    let node = node1;
    while (node) {
        if (node.contains(node2)) {
            return node;
        }
        node = node.parentElement;
    }
    return null;
}

export { Reorderable as R };

//# sourceMappingURL=reorderable.js.map