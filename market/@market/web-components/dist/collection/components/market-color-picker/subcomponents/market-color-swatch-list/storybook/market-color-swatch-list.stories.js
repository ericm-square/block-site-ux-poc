import { ColorSwatchListTemplate } from "./market-color-swatch-list.templates";
export default {
    title: 'Components/Color Picker (BETA)/Color Swatch List/API',
    component: 'market-color-swatch-list',
    tags: ['autodocs', '!dev'],
    argTypes: {
        customSwatches: {
            control: { type: 'text' },
            description: 'Comma-separated hex values, e.g. `"#333,#666,#999"`',
            name: 'Custom swatches',
            table: { category: 'Demo' },
        },
    },
    args: {
        customSwatches: '',
    },
};
export const Default = {
    render: (args) => ColorSwatchListTemplate(args),
};
//# sourceMappingURL=market-color-swatch-list.stories.js.map
