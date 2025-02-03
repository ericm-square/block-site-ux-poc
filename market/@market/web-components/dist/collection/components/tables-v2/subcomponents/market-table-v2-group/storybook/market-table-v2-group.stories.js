import { AppleGroupTemplate } from "./market-table-v2-group.templates";
export default {
    title: 'Components/Table/v2/API/Group',
    component: 'market-table-v2-group',
    subcomponents: {
        MarketTableV2Row: 'market-table-v2-row',
    },
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        control: {
            table: { category: 'Demo' },
            name: 'Control cell',
            description: 'Slot a form control into the first cell of each row.',
            control: { type: 'select' },
            options: ['none', 'checkbox', 'toggle'],
        },
        images: {
            table: { category: 'Demo' },
            name: 'Images',
            description: 'Slot an image into the first cell of each row.',
            control: { type: 'boolean' },
        },
    },
    args: {
        images: false,
    },
};
export const API = {
    render: (args) => AppleGroupTemplate(args),
};
//# sourceMappingURL=market-table-v2-group.stories.js.map
