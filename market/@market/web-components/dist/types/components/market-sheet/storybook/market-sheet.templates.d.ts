export type TMarketSheetTemplateArgs = Partial<HTMLMarketSheetElement> & {
    actions?: boolean;
    apiMessage?: boolean;
    footer?: boolean;
    header?: boolean;
    paragraphs?: number;
};
export declare const MarketSheetTemplate: ({ actions, apiMessage, paragraphs, footer, header, closeHandleAriaLabel, disableFocus, openMode, }: TMarketSheetTemplateArgs) => import("lit").TemplateResult<1>;
