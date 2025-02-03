export type TMarketPillTemplateArgs = Partial<HTMLMarketPillElement> & {
    icon?: boolean;
    text?: string;
};
export type TMarketPillTableTemplateArgs = {
    interactive?: boolean;
    size?: 'small' | 'medium';
};
export declare const MarketPillTemplate: ({ icon, text, indicator, interactive, size, variant, }: TMarketPillTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketPillTableTemplate: ({ interactive, size }: TMarketPillTableTemplateArgs) => import("lit").TemplateResult<1>;
