import { HTMLMarketTableV2ChildElement, TMarketTableV2SortOrder, TMarketTableV2SortStrategy } from './types';
export declare const sortItems: ({ items, order, column, strategy, format, }: {
    items: Array<HTMLMarketTableV2ChildElement>;
    order: TMarketTableV2SortOrder;
    column: number;
    strategy: TMarketTableV2SortStrategy;
    format: string;
}) => Array<HTMLMarketTableV2ChildElement>;
