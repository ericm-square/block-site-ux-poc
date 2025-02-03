declare const ALL_BANNER_VARIANTS: readonly ["info", "success", "warning", "critical", "insight"];
export type TBannerVariantTypes = (typeof ALL_BANNER_VARIANTS)[number];
export type TMarketBannerTemplateArgs = Partial<HTMLMarketBannerElement> & {
    text?: string;
    title?: string;
    inlineLink?: boolean;
    inlineButton?: boolean;
    customIcon?: boolean;
    actionLinks?: number;
    actionButtons?: number;
};
export declare const defaultBannerArgs: {
    text: string;
    title: string;
    inlineLink: boolean;
    inlineButton: boolean;
    customIcon: boolean;
    actionLinks: number;
    actionButtons: number;
};
export declare const MarketBannerTemplate: ({ text, title, inlineLink, inlineButton, customIcon, actionLinks, actionButtons, variant, dismissable, dismissButtonAriaLabel, }: TMarketBannerTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketBannerVariantsTemplate: ({ customIcon }: {
    customIcon?: boolean;
}) => import("lit").TemplateResult<1>;
export {};
