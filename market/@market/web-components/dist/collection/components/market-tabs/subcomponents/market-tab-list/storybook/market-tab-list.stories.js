import { TabListTemplate } from "./market-tab-list.templates";
export default {
    title: 'Components/Tabs/Tab List/API',
    component: 'market-tab-list',
    tags: ['autodocs', '!dev'],
    subcomponents: {
        MarketTab: 'market-tab',
    },
    argTypes: {
        disabledTabIndices: {
            control: { type: 'text' },
            description: 'Comma-separated indices of disabled tabs, e.g. `"0,1,3"`',
            name: 'Disabled tab indices',
            table: { category: 'Demo' },
        },
        numberOfTabs: {
            control: { type: 'number' },
            name: 'Number of tabs',
            table: { category: 'Demo' },
        },
        tabLabels: {
            control: { type: 'text' },
            description: 'Comma-separated tab labels, e.g. `"Tab 1,Tab 2,Tab 3"`',
            name: 'Tab labels',
            table: { category: 'Demo' },
        },
    },
    args: {
        numberOfTabs: 5,
    },
};
export const API = {
    render: (args) => TabListTemplate(args),
};
export const DisabledFirstTab = Object.assign(Object.assign({}, API), { args: {
        disabledTabIndices: '0',
    } });
export const AllTabsDisabled = Object.assign(Object.assign({}, API), { args: {
        disabledTabIndices: '0,1,2,3,4',
    } });
export const OneTab = Object.assign(Object.assign({}, API), { args: {
        numberOfTabs: 1,
    } });
export const Small = Object.assign(Object.assign({}, API), { args: {
        size: 'small',
    } });
export const SmallDisabledFirstTab = Object.assign(Object.assign({}, Small), { args: Object.assign(Object.assign({}, Small.args), { disabledTabIndices: '0' }) });
export const SmallAllTabsDisabled = Object.assign(Object.assign({}, Small), { args: Object.assign(Object.assign({}, Small.args), { disabledTabIndices: '0,1,2,3,4' }) });
export const SmallOneTab = Object.assign(Object.assign({}, Small), { args: Object.assign(Object.assign({}, Small.args), { numberOfTabs: 1 }) });
export const Large = Object.assign(Object.assign({}, API), { args: {
        size: 'large',
    } });
export const LargeDisabledFirstTab = Object.assign(Object.assign({}, Large), { args: Object.assign(Object.assign({}, Large.args), { disabledTabIndices: '0' }) });
export const LargeAllTabsDisabled = Object.assign(Object.assign({}, Large), { args: Object.assign(Object.assign({}, Large.args), { disabledTabIndices: '0,1,2,3,4' }) });
export const LargeOneTab = Object.assign(Object.assign({}, Large), { args: Object.assign(Object.assign({}, Large.args), { numberOfTabs: 1 }) });
//# sourceMappingURL=market-tab-list.stories.js.map
