import { MarketEmptyStateTemplate } from "./market-empty-state.templates";
export default {
    title: 'Components/Empty State/API',
    component: 'market-empty-state',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        actions: {
            name: 'Actions',
            description: 'Slot buttons into the actions slot',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        icon: {
            name: 'Icon',
            description: 'Slot an icon into the media slot',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        image: {
            name: 'Image',
            description: 'Slot an image into the media slot',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        primaryText: {
            name: 'Primary text',
            description: 'The primary text content',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        secondaryText: {
            name: 'Secondary text',
            description: 'The secondary text content of the card',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        actions: false,
        icon: false,
        image: false,
        primaryText: 'What is this? A center for ants?',
        secondaryText: 'How can we be expected to teach children to learn how to read... if they can’t even fit inside the building?',
    },
};
export const API = {
    render: (args) => MarketEmptyStateTemplate(args),
};
export const WithActions = Object.assign(Object.assign({}, API), { args: { actions: true } });
export const WithImage = Object.assign(Object.assign({}, API), { args: { image: true } });
export const WithIcon = Object.assign(Object.assign({}, API), { args: { icon: true } });
//# sourceMappingURL=market-empty-state.stories.js.map
