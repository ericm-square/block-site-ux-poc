import { MarketActionCardTemplate } from "./market-action-card.templates";
export default {
    title: 'Components/Action Card/API',
    component: 'market-action-card',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set demo controls
        content: {
            name: 'Content',
            description: 'The text content of the card',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        rowArgs: { table: { disable: true } },
    },
    args: {
        // demo
        content: 'Click me to select!',
        // props
        selected: false,
        disabled: false,
        transient: false,
        value: 'string',
        rowArgs: undefined,
    },
};
export const API = {
    render: (args) => MarketActionCardTemplate(args),
};
export const MarketActionCardRow = {
    render: (args) => MarketActionCardTemplate(args),
    args: { rowArgs: { label: 'This is a nested row' } },
};
export const MarketActionCardRowDrill = {
    render: (args) => MarketActionCardTemplate(args),
    args: {
        content: 'Click to drill',
        rowArgs: {
            variant: 'drill',
            subtext: 'Drill baby drill',
        },
    },
};
export const MarketActionCardRowCheckbox = {
    render: (args) => MarketActionCardTemplate(args),
    args: { rowArgs: { control: 'checkbox' } },
};
export const MarketActionCardRowRadio = {
    render: (args) => MarketActionCardTemplate(args),
    args: { rowArgs: { control: 'radio' } },
};
//# sourceMappingURL=market-action-card.stories.js.map
