import { SlottedAccessoryTypes } from "../../../../../../docs/helpers/slotted-accessory";
import { MarketTableV2RowTemplate } from "./market-table-v2-row.templates";
export default {
    title: 'Components/Table/v2/API/Row',
    component: 'market-table-v2-row',
    subcomponents: {
        MarketTableV2Cell: 'market-table-v2-cell',
    },
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set markup controls
        content: {
            table: { category: 'Demo' },
            name: 'Cell content',
            description: 'The cell text content rendered, in the form of a comma separated list.',
            type: 'string',
        },
        control: {
            table: { category: 'Demo' },
            name: 'Control cell',
            description: 'Slot a form control into the first cell of the row.',
            control: { type: 'select' },
            options: ['none', 'checkbox', 'toggle'],
        },
        leadingAccessory: {
            table: { category: 'Demo' },
            name: 'Leading accessory',
            description: 'Slot a leading accessory into the first cell of the row.',
            control: { type: 'select' },
            options: SlottedAccessoryTypes,
        },
        stickyLeft: {
            table: { category: 'Demo' },
            name: 'Sticky left',
            description: 'Make the first cell in the row sticky',
            type: 'boolean',
        },
        stickyRight: {
            table: { category: 'Demo' },
            name: 'Sticky right',
            description: 'Make the last cell in the row sticky',
            type: 'boolean',
        },
    },
    args: {
        content: 'This,is,a,table,row',
    },
};
export const API = {
    render: (args) => MarketTableV2RowTemplate(args),
};
//# sourceMappingURL=market-table-v2-row.stories.js.map
