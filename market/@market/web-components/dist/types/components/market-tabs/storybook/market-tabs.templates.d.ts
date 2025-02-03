import { StoryObj } from '@storybook/web-components';
import { TMarketTabListTemplateArgs } from '../subcomponents/market-tab-list/storybook/market-tab-list.templates';
export type TMarketTabsTemplateArgs = Partial<HTMLMarketTabsElement> & TMarketTabListTemplateArgs;
export declare const TabsTemplate: ({ defaultTab, disabledTabIndices, numberOfTabs, selectedTab, size, }: TMarketTabsTemplateArgs) => import("lit").TemplateResult<1>;
export declare const ContainerlessTabsTemplate: () => import("lit").TemplateResult<1>;
export declare const ContainerlessTabsDecorator: StoryObj['decorators'];
