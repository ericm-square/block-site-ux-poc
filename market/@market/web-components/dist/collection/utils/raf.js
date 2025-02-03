/**
 * Promisified `window.requestAnimationFrame`
 */
export function asyncRequestAnimationFrame() {
    return new Promise((resolve) => {
        var _a;
        ((_a = window === null || window === void 0 ? void 0 : window.requestAnimationFrame) === null || _a === void 0 ? void 0 : _a.call(window, () => resolve())) || resolve();
    });
}
//# sourceMappingURL=raf.js.map
