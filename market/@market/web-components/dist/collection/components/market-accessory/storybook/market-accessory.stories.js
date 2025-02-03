import { MarketAccessoryTemplate } from "./market-accessory.templates";
export default {
    title: 'Components/Accessory/API',
    component: 'market-accessory',
    tags: ['autodocs', '!dev'],
    args: {
        size: 'icon',
    },
};
export const API = {
    render: (args) => MarketAccessoryTemplate(args),
};
export const Icon = {
    render: (args) => MarketAccessoryTemplate(args),
    args: { size: 'icon' },
};
export const Image = {
    render: (args) => MarketAccessoryTemplate(args),
    args: { size: 'image' },
};
//# sourceMappingURL=market-accessory.stories.js.map
