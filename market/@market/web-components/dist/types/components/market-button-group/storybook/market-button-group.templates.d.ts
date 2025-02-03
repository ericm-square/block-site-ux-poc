export type TMarketButtonGroupTemplateArgs = Partial<HTMLMarketButtonGroupElement> & {
    buttonCount?: number;
    buttonText?: string;
};
export declare const MarketButtonGroupTemplate: ({ buttonCount, buttonText, alignment, popoverStrategy, }: TMarketButtonGroupTemplateArgs) => import("lit").TemplateResult<1>;
