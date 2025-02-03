export type TMarketTabTemplateArgs = Partial<HTMLMarketTabElement> & {
    ariaControls?: string;
    text?: string;
};
export declare const TabTemplate: ({ ariaControls, disabled, id, selected, size, text }: TMarketTabTemplateArgs) => import("lit").TemplateResult<1>;
