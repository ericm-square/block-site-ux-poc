import { html } from "lit";
import { MarketInputSearchTemplate, MarketInputSearchFormTemplate } from "./market-input-search.templates";
export default {
    title: 'Components/Search Input/API',
    component: 'market-input-search',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        leadingAccessory: {
            name: 'Leading accessory',
            description: 'Slot in a leading accessory',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: ['icon', 'none'],
        },
        slottedInput: {
            name: 'Slotted input',
            description: 'Slot a native input element',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        trailingAccessory: {
            name: 'Trailing accessory',
            description: 'Slot in a trailing accessory',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: ['icon', 'none'],
        },
        autocomplete: { control: { type: 'text' } },
        autofilled: { table: { disable: true } },
        compact: { table: { disable: true } },
        focused: { table: { disable: true } },
        variant: { table: { disable: true } },
    },
    args: {
        // demo
        slottedInput: false,
    },
};
export const API = {
    render: (args) => MarketInputSearchTemplate(args),
};
export const LeadingAccessory = {
    render: (args) => MarketInputSearchTemplate(args),
    args: { leadingAccessory: 'icon' },
};
export const TrailingAccessory = {
    render: (args) => MarketInputSearchTemplate(args),
    args: { trailingAccessory: 'icon' },
};
export const SlottedInput = {
    render: (args) => MarketInputSearchTemplate(args),
    args: { slottedInput: true },
};
export const Compact = {
    render: (args) => MarketInputSearchTemplate(args),
    args: { compact: true },
    decorators: [(story) => html `<div style="display: flex">${story()}</div>`],
};
export const InsideAForm = {
    render: () => MarketInputSearchFormTemplate(),
};
//# sourceMappingURL=market-input-search.stories.js.map
