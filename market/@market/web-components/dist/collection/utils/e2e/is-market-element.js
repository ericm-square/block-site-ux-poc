export default function (node) {
    var _a;
    const node_ = node;
    return ((_a = node_ === null || node_ === void 0 ? void 0 : node_.tagName) === null || _a === void 0 ? void 0 : _a.includes('MARKET-')) && typeof node_.componentOnReady === 'function';
}
//# sourceMappingURL=is-market-element.js.map
