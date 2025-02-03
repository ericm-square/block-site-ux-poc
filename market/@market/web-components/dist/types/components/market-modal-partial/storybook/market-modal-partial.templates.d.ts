export type TMarketModalPartialTemplateArgs = Partial<HTMLMarketModalPartialElement> & {
    actions?: boolean;
    apiMessage?: boolean;
    footer?: boolean;
    header?: boolean;
    paragraphs?: number;
};
export declare const MarketModalPartialTemplate: ({ actions, apiMessage, paragraphs, footer, header, trapFocus, }: TMarketModalPartialTemplateArgs) => import("lit").TemplateResult<1>;
