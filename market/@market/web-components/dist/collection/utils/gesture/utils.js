/**
 * Check if the event is a TouchEvent
 * @param {TMouseOrTouchEvent} event
 */
export function isTouchEvent(event) {
    return Boolean(event === null || event === void 0 ? void 0 : event.changedTouches);
}
// gets coords depending on touch vs mouse event
export function getCoordsFromEvent(e) {
    const x = isTouchEvent(e) ? e.changedTouches[0].clientX : e.clientX;
    const y = isTouchEvent(e) ? e.changedTouches[0].clientY : e.clientY;
    return { x, y };
}
//# sourceMappingURL=utils.js.map
