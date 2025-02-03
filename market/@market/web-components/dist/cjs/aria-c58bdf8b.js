'use strict';

const getAriaAttributes = (el) => {
    // create an object with all aria-* attributes on host element
    return el
        .getAttributeNames()
        .filter((attr) => attr.startsWith('aria-'))
        .reduce((acc, attr) => {
        const value = el.getAttribute(attr);
        if (value !== null)
            acc[attr] = value;
        return acc;
    }, {});
};
/**
 * Watch for aria attribute changes on host element.
 */
const observeAriaAttributes = (el, onMutationObserved) => {
    const mutationObserver = new MutationObserver(() => {
        const ariaAttributes = getAriaAttributes(el);
        return onMutationObserved(ariaAttributes);
    });
    mutationObserver.observe(el, { attributes: true });
    return mutationObserver;
};
/**
 * ARIA LABELS
 *
 * It's currently not possible to make label/input associations across the
 * shadow DOM boundary. These helpers are intended to act as a lightweight a11y
 * solution by allowing our input and control components to set their own
 * aria-label attributes based on what is being used to label them.
 *
 * https://developer.salesforce.com/blogs/2020/01/accessibility-for-web-components.html
 * https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria
 * https://github.com/whatwg/html/issues/3219
 */
/**
 * Returns the the aria-label attribute to set on text input components:
 *   <market-input-text>
 *   <market-select>
 *   <market-textarea>
 *   <market-input-password> (via its internal market-input-text)
 *
 * These components expect a <label> element in the default slot to use as the
 * floating input label. Falls back to the component's `name` attribute if no
 * label can be found.
 *
 * @param inputEl The input element that needs an aria-label
 */
const getTextInputAriaLabel = (inputEl) => {
    var _a;
    const slottedLabel = 
    // label slotted directly into input component
    inputEl.querySelector('label:not([slot])') ||
        (
        // label slotted into a higher-level component (market-input-password)
        (_a = inputEl.getRootNode().host) === null || _a === void 0 ? void 0 : _a.querySelector('label:not([slot])'));
    return (slottedLabel === null || slottedLabel === void 0 ? void 0 : slottedLabel.innerHTML) || inputEl.getAttribute('name') || undefined;
};
/**
 * Returns the aria-label attribute to set on control components:
 *   <market-checkbox>
 *   <market-radio>
 *   <market-toggle>
 *
 * When used as a slotted control in <market-row>, the row handles setting the
 * aria-label of the control to match its own slotted label element. Otherwise,
 * if a consumer sets the aria-labelledby or aria-label attribute on the Market
 * component, the correct label text will be reflected in the shadow DOM.
 *
 * Adapted from Ionic Framework's getAriaLabel() helper:
 * https://github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts#L275-L332
 *
 * @param controlEl The control element that needs an aria-label
 */
const getControlInputAriaLabel = (controlEl) => {
    var _a;
    const attrIsValid = (attr) => attr !== null && attr.trim() !== '';
    let controlAriaLabel;
    // aria-labelledby takes precedence
    const ariaLabelledBy = controlEl.getAttribute('aria-labelledby');
    if (attrIsValid(ariaLabelledBy)) {
        const labelledByText = (_a = document.getElementById(ariaLabelledBy)) === null || _a === void 0 ? void 0 : _a.textContent;
        controlAriaLabel = controlAriaLabel || labelledByText;
    }
    // aria-label
    const ariaLabel = controlEl.getAttribute('aria-label');
    if (attrIsValid(ariaLabel)) {
        controlAriaLabel = controlAriaLabel || ariaLabel;
    }
    return controlAriaLabel || controlEl.getAttribute('name') || undefined;
};
const applyExpandableAriaControls = (controlEl, { expanded, popoverId }) => {
    // Screen reader announces the expanded state of the control on focus
    controlEl.setAttribute('aria-expanded', expanded);
    // Connect control to the popover content
    controlEl.setAttribute('aria-controls', popoverId);
};

exports.applyExpandableAriaControls = applyExpandableAriaControls;
exports.getControlInputAriaLabel = getControlInputAriaLabel;
exports.getTextInputAriaLabel = getTextInputAriaLabel;
exports.observeAriaAttributes = observeAriaAttributes;

//# sourceMappingURL=aria-c58bdf8b.js.map