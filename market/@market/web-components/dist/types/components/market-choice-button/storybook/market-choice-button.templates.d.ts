export type TMarketChoiceButtonTemplateArgs = Partial<HTMLMarketChoiceButtonElement> & {
    text?: string;
    secondaryText?: string;
};
export type TMarketChoiceButtonTableTemplateArgs = {
    size?: 'small' | 'medium' | 'large';
};
export declare const MarketChoiceButtonTemplate: ({ text, secondaryText, disabled, selected, size, }: TMarketChoiceButtonTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketChoiceButtonTableTemplate: ({ size }: TMarketChoiceButtonTableTemplateArgs) => import("lit").TemplateResult<1>;
