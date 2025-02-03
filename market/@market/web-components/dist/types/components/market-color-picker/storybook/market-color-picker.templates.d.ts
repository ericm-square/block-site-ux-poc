export type TMarketColorPickerTemplateArgs = Partial<HTMLMarketColorPickerElement> & {
    customSwatches?: string;
    gradient?: boolean;
    input?: boolean;
    swatches?: boolean;
};
export declare const ColorPickerTemplate: ({ customSwatches, gradient, input, swatches, value, }: TMarketColorPickerTemplateArgs) => import("lit").TemplateResult<1>;
