import { ColorPickerInputTemplate } from "./market-color-picker-input.templates";
export default {
    title: 'Components/Color Picker (BETA)/Color Picker Input/API',
    component: 'market-color-picker-input',
    tags: ['autodocs', '!dev'],
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Label for the input',
            name: 'Label',
            table: { category: 'Demo' },
        },
    },
    args: {
        label: '',
    },
};
export const Default = {
    render: (args) => ColorPickerInputTemplate(args),
};
//# sourceMappingURL=market-color-picker-input.stories.js.map
