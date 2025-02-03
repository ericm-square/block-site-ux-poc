function isMarketElement(node) {
    var _a;
    return (((_a = node === null || node === void 0 ? void 0 : node.tagName) === null || _a === void 0 ? void 0 : _a.includes('MARKET-')) &&
        typeof node.componentOnReady === 'function');
}
export async function waitForMarketHydration(rootElement) {
    const promises = [];
    const waitForDidLoad = (promises, el) => {
        if (el !== null && el.nodeType === 1) {
            for (let i = 0; i < el.children.length; i++) {
                const childElm = el.children[i];
                if (isMarketElement(childElm)) {
                    promises.push(childElm.componentOnReady());
                }
                waitForDidLoad(promises, childElm);
            }
        }
    };
    waitForDidLoad(promises, rootElement);
    await Promise.all(promises).catch((e) => console.error(e)); // eslint-disable-line no-console
}
//# sourceMappingURL=wait-for-market-hydration.js.map
