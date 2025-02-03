import { MarketButtonGroupTemplate } from "./market-button-group.templates";
import "./market-button-group.stories.css";
export default {
    title: 'Components/Button Group/API',
    component: 'market-button-group',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set markup controls
        buttonText: { table: { category: 'Demo' } },
        buttonCount: { table: { category: 'Demo' }, control: { type: 'number' } },
    },
    args: {
        buttonText: 'Button',
        buttonCount: 2,
    },
};
export const API = {
    render: (args) => MarketButtonGroupTemplate(args),
};
// ------------------------------
// Alignment
// ------------------------------
export const AlignFill = Object.assign(Object.assign({}, API), { args: { alignment: 'fill' } });
export const AlignLeft = Object.assign(Object.assign({}, API), { args: { alignment: 'left' } });
export const AlignRight = Object.assign(Object.assign({}, API), { args: { alignment: 'right' } });
export const AlignSplit = Object.assign(Object.assign({}, API), { args: { alignment: 'split' } });
export const AlignStack = Object.assign(Object.assign({}, API), { args: { alignment: 'stack' } });
// ------------------------------
// Overflow
// ------------------------------
export const OverflowFill = Object.assign(Object.assign({}, API), { args: { alignment: 'fill', buttonCount: 5 } });
export const OverflowLeft = Object.assign(Object.assign({}, API), { args: { alignment: 'left', buttonCount: 5 } });
export const OverflowRight = Object.assign(Object.assign({}, API), { args: { alignment: 'right', buttonCount: 5 } });
export const OverflowSplit = Object.assign(Object.assign({}, API), { args: { alignment: 'split', buttonCount: 5 } });
export const OverflowStack = Object.assign(Object.assign({}, API), { args: { alignment: 'stack', buttonCount: 5 } });
//# sourceMappingURL=market-button-group.stories.js.map
