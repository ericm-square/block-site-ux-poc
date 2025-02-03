import { MarketChoiceButtonTemplate, MarketChoiceButtonTableTemplate } from "./market-choice-button.templates";
import "./market-choice-button.stories.css";
export default {
    title: 'Components/Choice Button/API',
    component: 'market-choice-button',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set markup controls
        text: {
            name: 'Text content',
            description: 'Text content in the default slot',
            table: { category: 'Demo' },
            control: { type: 'text' },
        },
        secondaryText: {
            name: 'Secondary content',
            description: 'Text content in the `secondary-text` slot',
            table: { category: 'Demo' },
            control: { type: 'text' },
        },
    },
    args: {
        text: 'Choice',
    },
};
export const API = {
    render: (args) => MarketChoiceButtonTemplate(args),
};
export const MarketChoiceButtonTable = {
    render: (args) => MarketChoiceButtonTableTemplate(args),
};
export const Large = Object.assign(Object.assign({}, MarketChoiceButtonTable), { args: { size: 'large' } });
export const Medium = Object.assign(Object.assign({}, MarketChoiceButtonTable), { args: { size: 'medium' } });
export const Small = Object.assign(Object.assign({}, MarketChoiceButtonTable), { args: { size: 'small' } });
//# sourceMappingURL=market-choice-button.stories.js.map
