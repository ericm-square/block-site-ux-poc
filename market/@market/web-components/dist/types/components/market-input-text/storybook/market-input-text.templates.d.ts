import { TSlottedAccessoryTypes } from '../../../../docs/helpers/slotted-accessory';
export type TMarketInputTextTemplateArgs = Partial<HTMLMarketInputTextElement> & {
    label?: string;
    leadingAccessory?: TSlottedAccessoryTypes;
    slottedInput?: boolean;
    trailingAccessory?: TSlottedAccessoryTypes;
};
export type TMarketInputTextTableTemplateArgs = Partial<Pick<TMarketInputTextTemplateArgs, 'size' | 'slottedInput'>>;
export declare const MarketInputTextTemplate: ({ label, leadingAccessory, slottedInput, trailingAccessory, autocomplete, autofocus, autovalidate, disabled, inputId, inputmode, invalid, max, maxlength, min, minlength, name, pattern, placeholder, readonly, required, size, step, type, value, }: TMarketInputTextTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketInputTextStatesTemplate: ({ size, slottedInput }: TMarketInputTextTableTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketInputTextAccessoryTemplate: ({ size }: TMarketInputTextTableTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketInputTextLongLabelTemplate: () => import("lit").TemplateResult<1>;
export declare const MarketInputTextFormTemplate: () => import("lit").TemplateResult<1>;
export declare const MarketInputTextPhoneTemplate: () => import("lit").TemplateResult<1>;
