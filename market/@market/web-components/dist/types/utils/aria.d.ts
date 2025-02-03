export type AriaAttributes = {
    [key: string]: string;
};
/**
 * Watch for aria attribute changes on host element.
 */
export declare const observeAriaAttributes: (el: HTMLElement, onMutationObserved: (ariaAttributes: AriaAttributes) => void) => MutationObserver;
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
export declare const getTextInputAriaLabel: (inputEl: HTMLElement) => string;
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
export declare const getControlInputAriaLabel: (controlEl: HTMLElement) => string;
export declare const applyExpandableAriaControls: (controlEl: HTMLElement, { expanded, popoverId }: {
    expanded: string;
    popoverId: string;
}) => void;
