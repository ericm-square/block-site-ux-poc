import { MarketButtonTemplate, MarketButtonTableTemplate } from "./market-button.templates";
import "./market-button.stories.css";
export default {
    title: 'Components/Button/API',
    component: 'market-button',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set markup controls
        text: { table: { category: 'Demo' } },
        icon: { table: { category: 'Demo' }, control: { type: 'boolean' } },
        // disable focused
        focused: { table: { disable: true } },
    },
    args: {
        text: 'Button',
        icon: false,
    },
};
export const API = {
    render: (args) => MarketButtonTemplate(args),
};
// ------------------------------
// Large Buttons
// ------------------------------
export const LargeRegular = {
    render: () => MarketButtonTableTemplate({ size: 'large' }),
};
export const LargeDestructive = {
    render: () => MarketButtonTableTemplate({ size: 'large', variant: 'destructive' }),
};
export const LargeCaretUp = {
    render: () => MarketButtonTableTemplate({ size: 'large', caret: 'up' }),
};
export const LargeCaretDown = {
    render: () => MarketButtonTableTemplate({ size: 'large', caret: 'down' }),
};
export const LargeLoading = {
    render: () => MarketButtonTableTemplate({ size: 'large', isLoading: true }),
    parameters: {
        // setting a higher diff threshold because internal icon is animated
        chromatic: { diffThreshold: 0.9 },
    },
};
// ------------------------------
// Medium Buttons
// ------------------------------
export const MediumRegular = {
    render: () => MarketButtonTableTemplate({ size: 'medium' }),
};
export const MediumDestructive = {
    render: () => MarketButtonTableTemplate({ size: 'medium', variant: 'destructive' }),
};
export const MediumCaretUp = {
    render: () => MarketButtonTableTemplate({ size: 'medium', caret: 'up' }),
};
export const MediumCaretDown = {
    render: () => MarketButtonTableTemplate({ size: 'medium', caret: 'down' }),
};
export const MediumLoading = {
    render: () => MarketButtonTableTemplate({ size: 'medium', isLoading: true }),
    parameters: {
        // setting a higher diff threshold because internal icon is animated
        chromatic: { diffThreshold: 0.9 },
    },
};
// ------------------------------
// Small Buttons
// ------------------------------
export const SmallRegular = {
    render: () => MarketButtonTableTemplate({ size: 'small' }),
};
export const SmallDestructive = {
    render: () => MarketButtonTableTemplate({ size: 'small', variant: 'destructive' }),
};
export const SmallCaretUp = {
    render: () => MarketButtonTableTemplate({ size: 'small', caret: 'up' }),
};
export const SmallCaretDown = {
    render: () => MarketButtonTableTemplate({ size: 'small', caret: 'down' }),
};
export const SmallLoading = {
    render: () => MarketButtonTableTemplate({ size: 'small', isLoading: true }),
    parameters: {
        // setting a higher diff threshold because internal icon is animated
        chromatic: { diffThreshold: 0.9 },
    },
};
//# sourceMappingURL=market-button.stories.js.map
