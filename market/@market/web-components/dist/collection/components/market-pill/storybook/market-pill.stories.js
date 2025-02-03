import { MarketPillTemplate, MarketPillTableTemplate } from "./market-pill.templates";
import "./market-pill.stories.css";
export default {
    title: 'Components/Pill/API',
    component: 'market-pill',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo controls
        text: { table: { category: 'Demo' }, control: { type: 'text' } },
        icon: { table: { category: 'Demo' }, control: { type: 'boolean' } },
    },
    args: {
        // demo
        icon: false,
        text: 'Pill',
        // props
        indicator: false,
        interactive: false,
        size: 'medium',
        variant: 'normal',
    },
};
export const API = {
    render: (args) => MarketPillTemplate(args),
};
const MarketPillTable = {
    render: (args) => MarketPillTableTemplate(args),
};
export const MediumRegular = Object.assign(Object.assign({}, MarketPillTable), { args: {
        size: 'medium',
        interactive: false,
    } });
export const MediumInteractive = Object.assign(Object.assign({}, MarketPillTable), { args: {
        size: 'medium',
        interactive: true,
    } });
export const SmallRegular = Object.assign(Object.assign({}, MarketPillTable), { args: {
        size: 'small',
        interactive: false,
    } });
export const SmallInteractive = Object.assign(Object.assign({}, MarketPillTable), { args: {
        size: 'small',
        interactive: true,
    } });
//# sourceMappingURL=market-pill.stories.js.map
