export type TMarketTileTemplateArgs = Partial<HTMLMarketTileElement> & {
    backgroundColor?: string;
    backgroundImage?: boolean;
    color?: string;
    hint?: string;
    indicator?: string;
    label?: string;
    leadingAccessory?: boolean;
    subtext?: string;
};
export declare const MarketTileTemplate: ({ backgroundColor, backgroundImage, color, hint, indicator, label, leadingAccessory, subtext, disabled, showActions, size, interactive, selected, }: TMarketTileTemplateArgs) => import("lit").TemplateResult<1>;
