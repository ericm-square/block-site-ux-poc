import { MarketFieldTemplate } from "./market-field.templates";
export default {
    title: 'Components/Field/API',
    component: 'market-field',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set demo controls
        action: {
            name: 'Action',
            description: 'Slot an action',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        bottomAccessory: {
            name: 'Bottom accessory',
            description: 'Slot a bottom accessory',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        error: {
            name: 'Error',
            description: 'Slot an error',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        action: false,
        bottomAccessory: true,
        error: false,
    },
};
export const API = {
    render: (args) => MarketFieldTemplate(args),
};
export const Action = Object.assign(Object.assign({}, API), { args: { action: true, bottomAccessory: false } });
export const Error = Object.assign(Object.assign({}, API), { args: { error: true, invalid: true, bottomAccessory: false } });
export const All = Object.assign(Object.assign({}, API), { args: { error: true, invalid: true, action: true } });
//# sourceMappingURL=market-field.stories.js.map
