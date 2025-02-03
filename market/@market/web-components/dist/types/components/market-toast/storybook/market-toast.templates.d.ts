export declare const ALL_TOAST_VARIANTS: readonly ["info", "success", "warning", "critical", "insight"];
export type TToastVariantTypes = (typeof ALL_TOAST_VARIANTS)[number];
export type TMarketToastTemplateArgs = Partial<HTMLMarketToastElement> & {
    text?: string;
    inlineLink?: boolean;
    inlineButton?: boolean;
    actionLinks?: number;
    actionButtons?: number;
};
export declare const defaultToastArgs: {
    text: string;
    inlineLink: boolean;
    inlineButton: boolean;
    actionLinks: number;
    actionButtons: number;
};
export declare const MarketToastTemplate: ({ text, inlineLink, inlineButton, actionLinks, actionButtons, variant, progress, persistent, dismissButtonAriaLabel, }: TMarketToastTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketToastVariantsTemplate: () => import("lit").TemplateResult<1>;
