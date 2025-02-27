/**
 * Check if the event is a TouchEvent
 * @param {TMouseOrTouchEvent} event
 */
function isTouchEvent(event) {
    return Boolean(event === null || event === void 0 ? void 0 : event.changedTouches);
}
// gets coords depending on touch vs mouse event
function getCoordsFromEvent(e) {
    const x = isTouchEvent(e) ? e.changedTouches[0].clientX : e.clientX;
    const y = isTouchEvent(e) ? e.changedTouches[0].clientY : e.clientY;
    return { x, y };
}

export { getCoordsFromEvent as g, isTouchEvent as i };

//# sourceMappingURL=utils.js.map