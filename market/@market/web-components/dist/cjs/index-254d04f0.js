'use strict';

let localTransformTagName;
// Allows access to the transformTagName function at runtime to transform nested children.
// Stencil does not currently expose this.
function getNamespacedTagFor(tagName) {
    return new Proxy((tag) => tag, {
        apply(target, thisArg, args) {
            return Reflect.apply(localTransformTagName !== null && localTransformTagName !== void 0 ? localTransformTagName : target, thisArg, args);
        },
    })(tagName);
}
const setTransformTagName = (transform) => {
    localTransformTagName = transform;
};
function isElementWithTagName(el, tagName) {
    var _a, _b;
    return ((_b = (_a = el === null || el === void 0 ? void 0 : el.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === getNamespacedTagFor(tagName);
}

exports.getNamespacedTagFor = getNamespacedTagFor;
exports.isElementWithTagName = isElementWithTagName;
exports.setTransformTagName = setTransformTagName;

//# sourceMappingURL=index-254d04f0.js.map