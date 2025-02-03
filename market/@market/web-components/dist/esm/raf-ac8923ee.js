/**
 * Promisified `window.requestAnimationFrame`
 */
function asyncRequestAnimationFrame() {
    return new Promise((resolve) => {
        var _a;
        ((_a = window === null || window === void 0 ? void 0 : window.requestAnimationFrame) === null || _a === void 0 ? void 0 : _a.call(window, () => resolve())) || resolve();
    });
}

export { asyncRequestAnimationFrame as a };

//# sourceMappingURL=raf-ac8923ee.js.map