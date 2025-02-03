export type TMarketCodeDisplayTemplateArgs = Partial<HTMLMarketCodeDisplayElement> & {
    button?: boolean;
    code?: string;
    copyText?: string;
    link?: boolean;
};
export declare const MarketCodeDisplayTemplate: ({ button, code, copyText, link, disabled, focused, }: TMarketCodeDisplayTemplateArgs) => import("lit").TemplateResult<1>;
