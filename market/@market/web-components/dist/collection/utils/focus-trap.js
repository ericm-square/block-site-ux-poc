import * as focusTrap from "focus-trap";
export const createAndActivateFocusTrap = ({ activateOptions, el, options, }) => {
    // Prevent runtime errors when attempting to activate focus trap
    try {
        return focusTrap
            .createFocusTrap(el, Object.assign(Object.assign({ allowOutsideClick: true, document, escapeDeactivates: false }, options), { tabbableOptions: Object.assign({ getShadowRoot: true }, options === null || options === void 0 ? void 0 : options.tabbableOptions) }))
            .activate(activateOptions);
    }
    catch (e) {
        console.warn(e); // eslint-disable-line no-console
    }
    return undefined;
};
//# sourceMappingURL=focus-trap.js.map
