import { html } from "lit";
export const SlottedControlTypes = ['none', 'checkbox', 'radio', 'toggle'];
export const SlottedControl = ({ type }) => {
    switch (type) {
        case 'checkbox':
            return html `<market-checkbox slot="control"></market-checkbox>`;
        case 'radio':
            return html `<market-radio slot="control"></market-radio>`;
        case 'toggle':
            return html `<market-toggle slot="control"></market-toggle>`;
        default:
            return '';
    }
};
//# sourceMappingURL=slotted-control.js.map
