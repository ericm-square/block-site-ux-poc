export type TMarketFieldTemplateArgs = Partial<HTMLMarketFieldElement> & {
    action?: boolean;
    bottomAccessory?: boolean;
    error?: boolean;
};
export declare const MarketFieldTemplate: ({ action, bottomAccessory, error, disabled, invalid, name, readonly, }: TMarketFieldTemplateArgs) => import("lit").TemplateResult<1>;
