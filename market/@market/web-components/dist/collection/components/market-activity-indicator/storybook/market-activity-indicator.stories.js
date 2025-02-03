import { MarketActivityIndicatorTemplate } from "./market-activity-indicator.templates";
export default {
    title: 'Components/Spinner/API',
    component: 'market-activity-indicator',
    tags: ['autodocs', '!dev'],
    args: {
        size: 'large',
    },
};
export const API = {
    render: (args) => MarketActivityIndicatorTemplate(args),
    parameters: {
        // setting a higher diff threshold because internal icon is animated
        chromatic: { diffThreshold: 0.9 },
    },
};
export const Large = {
    render: (args) => MarketActivityIndicatorTemplate(args),
    args: { size: 'large' },
    parameters: {
        // setting a higher diff threshold because internal icon is animated
        chromatic: { diffThreshold: 0.9 },
    },
};
export const Small = {
    render: (args) => MarketActivityIndicatorTemplate(args),
    args: { size: 'small' },
    parameters: {
        // setting a higher diff threshold because internal icon is animated
        chromatic: { diffThreshold: 0.9 },
    },
};
//# sourceMappingURL=market-activity-indicator.stories.js.map
