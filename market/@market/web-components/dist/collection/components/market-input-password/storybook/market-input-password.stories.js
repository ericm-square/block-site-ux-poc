import { MarketInputPasswordTemplate, MarketInputPasswordFormTemplate } from "./market-input-password.templates";
export default {
    title: 'Components/Password Input/API',
    component: 'market-input-password',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        label: {
            name: 'Label',
            description: "The input's slotted label",
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        slottedInput: {
            name: 'Slotted input',
            description: 'Slot a native input element',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        autocomplete: { control: { type: 'text' } },
        focused: { table: { disable: true } },
    },
    args: {
        // demo
        label: 'Password',
        slottedInput: false,
    },
};
export const API = {
    render: (args) => MarketInputPasswordTemplate(args),
};
export const Medium = Object.assign(Object.assign({}, API), { args: { size: 'medium' } });
export const Small = Object.assign(Object.assign({}, API), { args: { size: 'small' } });
export const WithValue = Object.assign(Object.assign({}, API), { args: {
        value: 'Password123',
    } });
export const WithPlaceholder = Object.assign(Object.assign({}, API), { args: { placeholder: 'Hint...' } });
export const Disabled = Object.assign(Object.assign({}, API), { args: { disabled: true } });
export const Invalid = Object.assign(Object.assign({}, API), { args: { invalid: true } });
export const SlottedInput = Object.assign(Object.assign({}, API), { args: { slottedInput: true } });
export const Form = {
    render: () => MarketInputPasswordFormTemplate(),
};
//# sourceMappingURL=market-input-password.stories.js.map
