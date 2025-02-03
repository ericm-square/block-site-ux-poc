export type TMarketButtonTemplateArgs = Partial<HTMLMarketButtonElement> & {
    text?: string;
    icon?: boolean;
};
export type TMarketButtonTableRowTemplateArgs = {
    caret?: 'up' | 'down' | 'none';
    isLoading?: boolean;
    rank?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    variant?: 'regular' | 'destructive';
};
export type TMarketButtonTableTemplateArgs = {
    caret?: 'up' | 'down' | 'none';
    isLoading?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'regular' | 'destructive';
};
export declare const MarketButtonTemplate: ({ text, icon, caret, disabled, download, focused, href, iconOnly, innerTabindex, isLoading, rank, rel, size, target, type, variant, }: TMarketButtonTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketButtonTableRowTemplate: ({ caret, isLoading, rank, size, variant, }: TMarketButtonTableRowTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketButtonTableTemplate: ({ caret, isLoading, size, variant, }: TMarketButtonTableTemplateArgs) => import("lit").TemplateResult<1>;
