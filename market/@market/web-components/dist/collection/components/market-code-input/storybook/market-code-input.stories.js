import { MarketCodeInputTemplate } from "./market-code-input.templates";
export default {
    title: 'Components/Code Input/API',
    component: 'market-code-input',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        button: {
            control: { type: 'boolean' },
            description: 'Slot a button into the trailing accessory slot',
            name: 'Button',
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        button: false,
    },
};
export const API = {
    render: (args) => MarketCodeInputTemplate(args),
};
export const WithValue = {
    render: (args) => MarketCodeInputTemplate(args),
    args: { value: '1234' },
};
export const WithButton = {
    render: (args) => MarketCodeInputTemplate(args),
    args: { button: true },
};
export const Invalid = {
    render: (args) => MarketCodeInputTemplate(args),
    args: { invalid: true },
};
//# sourceMappingURL=market-code-input.stories.js.map
