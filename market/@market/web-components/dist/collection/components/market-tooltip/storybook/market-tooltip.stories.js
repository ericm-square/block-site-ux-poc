import { MarketTooltipTemplate } from "./market-tooltip.templates";
import "./market-tooltip.stories.css";
export default {
    title: 'Components/Tooltip/API',
    component: 'market-tooltip',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        link: {
            control: { type: 'boolean' },
            description: 'Include a link in the popover text',
            name: 'Link',
            table: { category: 'Demo' },
        },
        popoverText: {
            control: { type: 'text' },
            description: 'The text inside the popover',
            name: 'Popover text',
            table: { category: 'Demo' },
        },
        triggerText: {
            control: { type: 'text' },
            description: 'Slot text for the trigger',
            name: 'Trigger text',
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        link: true,
        popoverText: 'This is a tooltip.',
        triggerText: '',
    },
};
export const API = {
    render: (args) => MarketTooltipTemplate(args),
};
export const DefaultOpen = {
    render: (args) => MarketTooltipTemplate(args),
    args: { expanded: true },
};
export const TriggerText = {
    render: (args) => MarketTooltipTemplate(args),
    args: { triggerText: 'Trigger text' },
};
export const LongTriggerText = {
    render: (args) => MarketTooltipTemplate(args),
    args: {
        triggerText: 'Longer trigger text that will wrap on small viewports',
    },
};
//# sourceMappingURL=market-tooltip.stories.js.map
