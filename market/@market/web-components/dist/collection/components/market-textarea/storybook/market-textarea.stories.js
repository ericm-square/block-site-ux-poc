import { MarketTextareaTemplate } from "./market-textarea.templates";
export default {
    title: 'Components/Textarea/API',
    component: 'market-textarea',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        label: {
            name: 'Label',
            description: "The textarea's slotted label",
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        slottedTextarea: {
            name: 'Slotted textarea',
            description: 'Slot a native textarea element',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        focused: { table: { disable: true } },
    },
    args: {
        // demo
        label: 'Label',
        slottedTextarea: false,
    },
};
export const API = {
    render: (args) => MarketTextareaTemplate(args),
};
export const WithValue = Object.assign(Object.assign({}, API), { args: {
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula, eros eu facilisis accumsan, tortor nunc blandit lacus, quis mattis est ante id mauris.',
    } });
export const WithPlaceholder = Object.assign(Object.assign({}, API), { args: { placeholder: 'Hint...' } });
export const WithLongLabel = Object.assign(Object.assign({}, API), { args: {
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula, eros eu facilisis accumsan, tortor nunc blandit lacus, quis mattis est ante id mauris.',
    } });
export const WithSlottedTextarea = Object.assign(Object.assign({}, API), { args: { slottedTextarea: true } });
//# sourceMappingURL=market-textarea.stories.js.map
