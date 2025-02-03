export type TMarketInputSearchTemplateArgs = Partial<HTMLMarketInputSearchElement> & {
    leadingAccessory?: 'icon' | 'none';
    slottedInput?: boolean;
    trailingAccessory?: 'icon' | 'none';
};
export declare const MarketInputSearchTemplate: ({ leadingAccessory, slottedInput, trailingAccessory, autocomplete, autofocus, clearButtonAriaLabel, compact, disabled, inputAriaLabel, maxlength, name, placeholder, searchIconButtonAriaLabel, size, value, }: TMarketInputSearchTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketInputSearchFormTemplate: () => import("lit").TemplateResult<1>;
