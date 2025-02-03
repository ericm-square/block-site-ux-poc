export type TMarketColorSwatchTemplateArgs = Partial<HTMLMarketColorSwatchElement> & {
    label?: string;
};
export declare const ColorSwatchTemplate: ({ disabled, name, selected, value }: TMarketColorSwatchTemplateArgs) => import("lit").TemplateResult<1>;
