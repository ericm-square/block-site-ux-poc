export type TFilterGroupTemplateArgs = Partial<HTMLMarketFilterGroupElement> & {
    hasSearch?: boolean;
    size?: HTMLMarketFilterElement['size'];
};
export declare const DefaultTemplate: ({ hasSearch, maxVisibleFilters, size }: TFilterGroupTemplateArgs) => import("lit").TemplateResult<1>;
