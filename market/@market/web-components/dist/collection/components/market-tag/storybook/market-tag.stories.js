import { MarketTagTemplate, MarketTagTableTemplate } from "./market-tag.templates";
import "./market-tag.stories.css";
export default {
    title: 'Components/Tag/API',
    component: 'market-tag',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo controls
        text: { table: { category: 'Demo' }, control: { type: 'text' } },
        icon: { table: { category: 'Demo' }, control: { type: 'boolean' } },
    },
    args: {
        // demo
        icon: false,
        text: 'Tag',
    },
};
export const API = {
    render: (args) => MarketTagTemplate(args),
};
const MarketTagTable = {
    render: (args) => MarketTagTableTemplate(args),
};
export const Medium = Object.assign(Object.assign({}, MarketTagTable), { args: {
        size: 'medium',
        interactive: false,
    } });
export const Small = Object.assign(Object.assign({}, MarketTagTable), { args: {
        size: 'small',
        interactive: false,
    } });
//# sourceMappingURL=market-tag.stories.js.map
