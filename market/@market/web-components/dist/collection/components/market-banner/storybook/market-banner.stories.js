import { defaultBannerArgs, MarketBannerTemplate, MarketBannerVariantsTemplate } from "./market-banner.templates";
export default {
    title: 'Components/Banner/API',
    component: 'market-banner',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo controls
        text: {
            name: 'Text content',
            description: 'Text content in the default slot',
            table: { category: 'Demo' },
        },
        title: {
            name: 'Title content',
            description: 'Text content in the `title` slot',
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
        customIcon: {
            name: 'Custom icon',
            description: 'Custom icon in the `icon` slot',
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
    args: defaultBannerArgs,
};
export const API = {
    render: (args) => MarketBannerTemplate(args),
};
export const Variants = {
    render: (args) => MarketBannerVariantsTemplate(Object.assign({}, args)),
};
export const Dismissable = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { dismissable: true })),
};
export const InlineLink = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { inlineLink: true })),
};
export const InlineButton = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { inlineButton: true })),
};
export const LongText = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a euismod metus. Fusce
      cursus justo sit amet nisl cursus ullamcorper. Vestibulum vel imperdiet velit, ut dapibus
      libero.` })),
};
export const Title = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { title: 'Title text' })),
};
export const LinkActions = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { actionLinks: 2 })),
};
export const ButtonActions = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { actionButtons: 2 })),
};
export const ActionsDismissable = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { actionLinks: 2, dismissable: true })),
};
export const ActionsTitle = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { actionLinks: 2, title: 'Title text' })),
};
export const ActionsLongText = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { actionLinks: 2, text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a euismod metus. Fusce
      cursus justo sit amet nisl cursus ullamcorper. Vestibulum vel imperdiet velit, ut dapibus
      libero.` })),
};
export const CustomIcon = {
    render: (args) => MarketBannerVariantsTemplate(Object.assign(Object.assign({}, args), { customIcon: true })),
};
export const KitchenSink = {
    render: (args) => MarketBannerTemplate(Object.assign(Object.assign({}, args), { actionButtons: 2, actionLinks: 2, customIcon: true, dismissable: true, text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a euismod metus. Fusce
      cursus justo sit amet nisl cursus ullamcorper. Vestibulum vel imperdiet velit, ut dapibus
      libero.`, title: 'Title text', variant: 'warning', dismissButtonAriaLabel: 'Close' })),
};
//# sourceMappingURL=market-banner.stories.js.map
