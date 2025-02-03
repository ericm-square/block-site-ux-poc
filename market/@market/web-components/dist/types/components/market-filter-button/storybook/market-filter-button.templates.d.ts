import { TemplateResult } from 'lit';
export type TFilterButtonTemplateArgs = Partial<HTMLMarketFilterButtonElement> & {
    feedbackText?: string | TemplateResult;
    labelText?: string | TemplateResult;
};
export declare const FilterButtonTemplate: ({ disabled, feedbackText, iconOnly, labelText, size, }: TFilterButtonTemplateArgs) => TemplateResult<1>;
