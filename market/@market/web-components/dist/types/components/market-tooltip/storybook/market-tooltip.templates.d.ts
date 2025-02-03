export type TMarketTooltipTemplateArgs = Partial<HTMLMarketTooltipElement> & {
    link?: boolean;
    popoverText?: string;
    triggerText?: string;
};
export declare const MarketTooltipTemplate: ({ link, popoverText, triggerText, disabled, expanded, interaction, popoverDistance, popoverPlacement, popoverSkidding, popoverStrategy, }: TMarketTooltipTemplateArgs) => import("lit").TemplateResult<1>;
