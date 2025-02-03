import { MarketTableV2CellTemplate } from "./market-table-v2-cell.templates";
import { SlottedAccessoryTypes } from "../../../../../../docs/helpers/slotted-accessory";
export default {
    title: 'Components/Table/v2/API/Cell',
    component: 'market-table-v2-cell',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        content: {
            table: { category: 'Demo' },
            name: 'Text content',
            description: 'The cell text content rendered.',
            control: { type: 'text' },
        },
        control: {
            table: { category: 'Demo' },
            name: 'Control',
            description: 'Slot a form control into the row.',
            control: { type: 'select' },
            options: ['none', 'checkbox', 'toggle'],
        },
        leadingAccessory: {
            table: { category: 'Demo' },
            name: 'Leading accessory',
            description: 'Slot a leading accessory into the cell.',
            control: { type: 'select' },
            options: SlottedAccessoryTypes,
        },
        trailingAccessory: {
            table: { category: 'Demo' },
            name: 'Trailing accessory',
            description: 'Slot a trailing accessory into the cell.',
            control: { type: 'select' },
            options: SlottedAccessoryTypes,
        },
        formField: {
            table: { category: 'Demo' },
            name: 'Form field',
            description: 'Slot a form field into the cell.',
            control: { type: 'select' },
            options: ['none', 'input', 'select', 'password'],
        },
    },
    args: {
        content: 'Cell',
    },
};
export const API = {
    render: (args) => MarketTableV2CellTemplate(args),
};
//# sourceMappingURL=market-table-v2-cell.stories.js.map
