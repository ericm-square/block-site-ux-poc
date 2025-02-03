export type TMarketHeaderTemplateArgs = Partial<HTMLMarketHeaderElement> & {
    actions?: boolean;
    customNav?: boolean;
    heading?: string;
    subheading?: string;
    wayfinding?: string;
};
export declare const MarketHeaderTemplate: ({ actions, customNav, heading, subheading, wayfinding, closeButtonAriaLabel, compact, disableCloseButton, showNavigation, }: TMarketHeaderTemplateArgs) => import("lit").TemplateResult<1>;
