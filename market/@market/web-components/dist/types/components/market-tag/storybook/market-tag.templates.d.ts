export type TMarketTagTemplateArgs = Partial<HTMLMarketTagElement> & {
    icon?: boolean;
    text?: string;
};
export type TMarketTagTableTemplateArgs = {
    text?: string;
    size?: 'small' | 'medium';
};
export declare const MarketTagTemplate: ({ icon, text, disabled, focused, size, }: TMarketTagTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketTagTableTemplate: ({ text, size }: TMarketTagTableTemplateArgs) => import("lit").TemplateResult<1>;
