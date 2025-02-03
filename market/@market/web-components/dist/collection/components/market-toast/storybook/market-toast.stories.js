import { defaultToastArgs, MarketToastTemplate, MarketToastVariantsTemplate } from "./market-toast.templates";
export default {
    title: 'Components/Toast & Toaster/Toast/API',
    component: 'market-toast',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo controls
        text: {
            name: 'Text content',
            description: 'Text content in the default slot',
            table: { category: 'Demo' },
        },
        inlineLink: {
            name: 'Inline link',
            description: 'Inline link in the default slot',
            table: { category: 'Demo' },
            control: { type: 'boolean' },
        },
        inlineButton: {
            name: 'Inline button',
            description: 'Inline button in the default slot',
            table: { category: 'Demo' },
            control: { type: 'boolean' },
        },
        actionLinks: {
            name: 'Action links',
            description: 'Number of links in the `action` slot',
            table: { category: 'Demo' },
            control: { type: 'number' },
        },
        actionButtons: {
            name: 'Action buttons',
            description: 'Number of buttons in the `action` slot',
            table: { category: 'Demo' },
            control: { type: 'number' },
        },
    },
    args: defaultToastArgs,
};
export const API = {
    render: (args) => MarketToastTemplate(args),
};
export const Variants = {
    render: () => MarketToastVariantsTemplate(),
};
export const InlineLink = {
    render: (args) => MarketToastTemplate(Object.assign(Object.assign({}, args), { inlineLink: true })),
};
export const InlineButton = {
    render: (args) => MarketToastTemplate(Object.assign(Object.assign({}, args), { inlineButton: true })),
};
export const LongText = {
    render: (args) => MarketToastTemplate(Object.assign(Object.assign({}, args), { text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a euismod metus. Fusce
      cursus justo sit amet nisl cursus ullamcorper. Vestibulum vel imperdiet velit, ut dapibus
      libero.` })),
};
export const LinkActions = {
    render: (args) => MarketToastTemplate(Object.assign(Object.assign({}, args), { actionLinks: 2 })),
};
export const ButtonActions = {
    render: (args) => MarketToastTemplate(Object.assign(Object.assign({}, args), { actionButtons: 2 })),
};
export const ActionsLongText = {
    render: (args) => MarketToastTemplate(Object.assign(Object.assign({}, args), { actionLinks: 2, text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a euismod metus. Fusce
      cursus justo sit amet nisl cursus ullamcorper. Vestibulum vel imperdiet velit, ut dapibus
      libero.` })),
};
//# sourceMappingURL=market-toast.stories.js.map
