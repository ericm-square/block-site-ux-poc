export type TMarketTextareaTemplateArgs = Partial<HTMLMarketTextareaElement> & {
    label?: string;
    slottedTextarea?: boolean;
};
export declare const MarketTextareaTemplate: ({ label, slottedTextarea, autofocus, disabled, inputmode, invalid, maxHeight, maxlength, name, placeholder, readonly, value, }: TMarketTextareaTemplateArgs) => import("lit").TemplateResult<1>;
