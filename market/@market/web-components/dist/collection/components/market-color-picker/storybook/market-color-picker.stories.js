import { ColorPickerTemplate } from "./market-color-picker.templates";
export default {
    title: 'Components/Color Picker (BETA)/API',
    component: 'market-color-picker',
    tags: ['autodocs', '!dev'],
    argTypes: {
        customSwatches: {
            control: { type: 'text' },
            description: 'Comma-separated hex values, e.g. `"#333,#666,#999"`',
            name: 'Custom swatches',
            table: { category: 'Demo' },
        },
        gradient: {
            control: { type: 'boolean' },
            description: 'Slot a color gradient into the picker',
            name: 'Gradient',
            table: { category: 'Demo' },
        },
        input: {
            control: { type: 'boolean' },
            description: 'Slot an input into the picker',
            name: 'Input',
            table: { category: 'Demo' },
        },
        swatches: {
            control: { type: 'boolean' },
            description: 'Slot a swatch list into the picker',
            name: 'Swatch list',
            table: { category: 'Demo' },
        },
    },
    args: {
        customSwatches: '',
        gradient: true,
        input: true,
        swatches: true,
    },
};
export const API = {
    render: (args) => ColorPickerTemplate(args),
};
export const CustomSwatches = Object.assign(Object.assign({}, API), { args: Object.assign(Object.assign({}, API.args), { value: '#00AAFF', customSwatches: '#334455,#00AAFF,#12AED0' }) });
//# sourceMappingURL=market-color-picker.stories.js.map
