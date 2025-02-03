/**
 * [PR 29510](https://github.com/Microsoft/TypeScript/pull/29510), available in
 * TypeScript 3.4+, enables us to define the literal string union type
 * `DialogType` based on a readonly array of all possible values (`as const`
 * makes `ALL_DIALOG_TYPES` readonly). This is required to support refactoring
 * from enum to union type while also allowing us to enumerate all possible
 * values (see references of `ALL_DIALOG_TYPES` for use cases).
 *
 * Motivation for the refactor from enum to union type can be found in the
 * description for [PR 1554](https://github.com/squareup/market/pull/1554).
 */
import { getNamespacedTagFor } from "./namespace";
export const ALL_DIALOG_TYPES = ['modal-full', 'modal-partial', 'blade', 'dialog', 'sheet'];
export const DIALOGS_META = {
    'modal-full': { veil: true },
    'modal-partial': { veil: true },
    blade: { veil: false },
    dialog: { veil: true },
    sheet: { veil: true },
};
export const getDialogSelector = () => ALL_DIALOG_TYPES.map((type) => {
    return getNamespacedTagFor(`market-${type}`);
}).join(',');
export function setupDialogCompactHandler(modal) {
    const main = modal.querySelector('main, .main');
    const header = modal.querySelector(getNamespacedTagFor('market-header'));
    // Manage compact header on scroll unless it's already explicitly set
    if (main && header && !header.compact) {
        main.addEventListener('scroll', () => {
            if (main.scrollTop > 0) {
                if (!header.compact) {
                    const headingDiv = header.shadowRoot.querySelector('.heading');
                    const headingDivStyles = getComputedStyle(headingDiv);
                    const paddingTop = Number.parseInt(headingDivStyles.height, 10) + Number.parseInt(headingDivStyles.marginTop, 10);
                    main.style.paddingTop = `${paddingTop}px`;
                    header.compact = true;
                }
            }
            else {
                if (header.compact) {
                    main.style.paddingTop = '';
                    header.compact = false;
                }
            }
        });
    }
}
//# sourceMappingURL=dialog.js.map
