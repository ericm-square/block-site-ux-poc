export type TMarketModalFullTemplateArgs = Partial<HTMLMarketModalFullElement> & {
    actions?: boolean;
    apiMessage?: boolean;
    footer?: boolean;
    header?: boolean;
    paragraphs?: number;
};
export declare const MarketModalFullTemplate: ({ actions, apiMessage, paragraphs, footer, header, layout, trapFocus, }: TMarketModalFullTemplateArgs) => import("lit").TemplateResult<1>;
