export type TMarketTabListTemplateArgs = Partial<HTMLMarketTabListElement> & {
    disabledTabIndices?: string;
    numberOfTabs?: number;
    tabLabels?: string;
};
export declare const TabListTemplate: ({ disabledTabIndices, numberOfTabs, selectedTab, size, tabLabels, }: TMarketTabListTemplateArgs) => import("lit").TemplateResult<1>;
