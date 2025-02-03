export type TMarketBladeTemplateArgs = Partial<HTMLMarketBladeElement> & {
    actions?: boolean;
    apiMessage?: boolean;
    footer?: boolean;
    header?: boolean;
    paragraphs?: number;
};
export declare const MarketBladeTemplate: ({ actions, apiMessage, paragraphs, footer, header, trapFocus, }: TMarketBladeTemplateArgs) => import("lit").TemplateResult<1>;
