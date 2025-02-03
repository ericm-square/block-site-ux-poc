import { MarketInputTextTemplate, MarketInputTextStatesTemplate, MarketInputTextAccessoryTemplate, MarketInputTextLongLabelTemplate, MarketInputTextFormTemplate, MarketInputTextPhoneTemplate, } from "./market-input-text.templates";
import { SlottedAccessoryTypes } from "../../../../docs/helpers/slotted-accessory";
import "./market-input-text.stories.css";
export default {
    title: 'Components/Text Input/API',
    component: 'market-input-text',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        label: {
            name: 'Label',
            description: "The input's slotted label",
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        leadingAccessory: {
            name: 'Leading accessory',
            description: 'Slot in a leading accessory',
            control: { type: 'select' },
            table: { category: 'Demo' },
            options: SlottedAccessoryTypes,
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
            options: SlottedAccessoryTypes,
        },
        autocomplete: { control: { type: 'text' } },
        focused: { table: { disable: true } },
    },
    args: {
        // demo
        label: 'Label',
        slottedInput: false,
    },
};
export const API = {
    render: (args) => MarketInputTextTemplate(args),
};
// Large
export const StatesLarge = {
    render: (args) => MarketInputTextStatesTemplate(args),
    args: { size: 'large' },
};
export const SlottedInputLarge = Object.assign(Object.assign({}, StatesLarge), { args: { slottedInput: true } });
export const AccessoryLarge = {
    render: (args) => MarketInputTextAccessoryTemplate(args),
    args: { size: 'large' },
};
export const LongLabel = {
    render: () => MarketInputTextLongLabelTemplate(),
};
export const Form = {
    render: () => MarketInputTextFormTemplate(),
};
export const Phone = {
    render: () => MarketInputTextPhoneTemplate(),
};
// Medium
export const StatesMedium = {
    render: (args) => MarketInputTextStatesTemplate(args),
    args: { size: 'medium' },
};
export const SlottedInputMedium = Object.assign(Object.assign({}, StatesMedium), { args: Object.assign(Object.assign({}, StatesMedium.args), { slottedInput: true }) });
export const AccessoryMedium = {
    render: (args) => MarketInputTextAccessoryTemplate(args),
    args: { size: 'medium' },
};
// Small
export const StatesSmall = {
    render: (args) => MarketInputTextStatesTemplate(args),
    args: { size: 'small' },
};
export const SlottedInputSmall = Object.assign(Object.assign({}, StatesSmall), { args: Object.assign(Object.assign({}, StatesSmall.args), { slottedInput: true }) });
export const AccessorySmall = {
    render: (args) => MarketInputTextAccessoryTemplate(args),
    args: { size: 'small' },
};
//# sourceMappingURL=market-input-text.stories.js.map
