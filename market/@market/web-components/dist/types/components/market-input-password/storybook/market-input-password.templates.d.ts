export type TMarketInputPasswordTemplateArgs = Partial<HTMLMarketInputPasswordElement> & {
    label?: string;
    slottedInput?: boolean;
};
export declare const MarketInputPasswordTemplate: ({ label, slottedInput, autocomplete, disabled, inputId, inputmode, invalid, maxlength, minlength, name, placeholder, readonly, required, size, value, }: TMarketInputPasswordTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketInputPasswordFormTemplate: () => import("lit").TemplateResult<1>;
