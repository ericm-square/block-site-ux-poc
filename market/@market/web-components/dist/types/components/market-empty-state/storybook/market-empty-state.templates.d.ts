export type TMarketEmptyStateTemplateArgs = Partial<HTMLMarketEmptyStateElement> & {
    actions?: boolean;
    icon?: boolean;
    image?: boolean;
    primaryText?: string;
    secondaryText?: string;
};
export declare const MarketEmptyStateTemplate: ({ actions, icon, image, primaryText, secondaryText, }: TMarketEmptyStateTemplateArgs) => import("lit").TemplateResult<1>;
