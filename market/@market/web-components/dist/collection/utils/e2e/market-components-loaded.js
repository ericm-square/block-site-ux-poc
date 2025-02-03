import isMarketElement from "./is-market-element";
/**
 * Returns a promise which does not resolve until all Market components in the
 * root element have loaded. Use before running your React tests to make sure
 * Market elements are ready to be interacted with.
 * Takes an Element as a param, which should represent a root node which holds all the Market components you need to test.
 * You can grab this by getting the baseElement property from the render results used with @testing-library/react.
 *
 * Adapted from prior art here:
 * https://github.com/ionic-team/stencil/blob/45388e95edb46ef357eb9ae37cd32bbb5bc1ed23/test/karma/test-app/util.ts#L88-L106
 *
 * @param {Element} domNode
 * @returns {Promise<void>}
 */
const marketComponentsLoaded = async (elm) => {
    var _a, _b, _c;
    if (!elm) {
        return;
    }
    if (isMarketElement(elm)) {
        await new Promise((resolve) => {
            var _a;
            (_a = elm.componentOnReady) === null || _a === void 0 ? void 0 : _a.call(elm).then((value) => {
                resolve(value);
            });
            // Sometimes elements get destroyed before they resolve componentOnReady and then tests will timeout.
            setTimeout(() => {
                resolve(null);
            }, 200);
        });
    }
    const children = [...((_a = elm.children) !== null && _a !== void 0 ? _a : [])];
    const shadowRootChildren = [...((_c = (_b = elm.shadowRoot) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : [])];
    const childElements = [...children, ...shadowRootChildren].filter((el) => ![
        // Market doesn't render inside of SVGs
        'svg',
        // Text nodes have an undefined tagName.
        undefined,
    ].includes(el.tagName));
    await Promise.all(childElements.map((el) => marketComponentsLoaded(el)));
};
export default marketComponentsLoaded;
//# sourceMappingURL=market-components-loaded.js.map
