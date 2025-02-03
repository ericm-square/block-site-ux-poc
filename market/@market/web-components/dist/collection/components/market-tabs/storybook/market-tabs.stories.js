import TabListMeta from "../subcomponents/market-tab-list/storybook/market-tab-list.stories";
import { ContainerlessTabsDecorator, ContainerlessTabsTemplate, TabsTemplate, } from "./market-tabs.templates";
export default {
    title: 'Components/Tabs/API',
    component: 'market-tabs',
    tags: ['autodocs', '!dev'],
    subcomponents: {
        MarketTab: 'market-tab',
        MarketTabList: 'market-tab-list',
        MarketTabPanel: 'market-tab-panel',
    },
    argTypes: Object.assign({}, TabListMeta.argTypes),
    args: Object.assign({}, TabListMeta.args),
};
export const API = {
    render: (args) => TabsTemplate(args),
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
export const Containerless = {
    render: () => ContainerlessTabsTemplate(),
    decorators: ContainerlessTabsDecorator,
};
//# sourceMappingURL=market-tabs.stories.js.map
