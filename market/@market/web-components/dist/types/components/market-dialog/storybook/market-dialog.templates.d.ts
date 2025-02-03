export type TMarketDialogTemplateArgs = Partial<HTMLMarketDialogElement> & {
    apiMessage?: boolean;
    bodyText?: string;
    buttonGroup?: boolean;
    buttonGroupAlignment?: Pick<HTMLMarketButtonGroupElement, 'alignment'>;
    headerText?: string;
};
export declare const MarketDialogTemplate: ({ apiMessage, bodyText, buttonGroup, buttonGroupAlignment, headerText, isLoading, persistent, trapFocus, }: TMarketDialogTemplateArgs) => import("lit").TemplateResult<1>;
