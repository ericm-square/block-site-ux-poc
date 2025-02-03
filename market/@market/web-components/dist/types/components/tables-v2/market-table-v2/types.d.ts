export type MarketTableV2SelectionChangeEventDetail = {
    current: TMarketTableV2Selection;
    previous: TMarketTableV2Selection;
};
export type HTMLMarketTableV2ChildElement = HTMLMarketTableV2RowElement | HTMLMarketTableV2GroupElement;
export type TMarketTableV2Selection = 'true' | 'false' | 'indeterminate';
export type TMarketTableV2SortOrder = 'ascending' | 'descending' | 'none';
export type TMarketTableV2SortStrategy = 'string' | 'number' | 'datetime' | TMarketTableV2SortStrategyCallback;
export type TMarketTableV2SortStrategyCallback = (attrs: {
    rowA: HTMLMarketTableV2RowElement;
    rowB: HTMLMarketTableV2RowElement;
    order: TMarketTableV2SortOrder;
    column: number;
    format?: string;
}) => number;
export type MarketTableV2SortOrderChangeDetail = {
    current: TMarketTableV2SortOrder;
    previous: TMarketTableV2SortOrder;
};
