import { TMarketTableV2RowTemplateArgs } from '../subcomponents/market-table-v2-row/storybook/market-table-v2-row.templates';
import { TMarketTableV2GroupTemplateArgs } from '../subcomponents/market-table-v2-group/storybook/market-table-v2-group.templates';
export type TMarketTableV2TemplateArgs = Partial<HTMLMarketTableV2Element>;
export declare const MarketTableV2Template: ({ align, collapsible, layout, reorderable, reorderMode, selected, valign, }: TMarketTableV2TemplateArgs) => import("lit").TemplateResult<1>;
export type TMarketTableV2ReorderableTemplateArgs = Pick<TMarketTableV2TemplateArgs, 'reorderable' | 'reorderMode'> & Pick<TMarketTableV2RowTemplateArgs, 'header' | 'footer' | 'dragHandlePosition' | 'dragHandleVisibility'> & {
    style?: string;
};
export declare const MarketTableV2ReorderableTemplate: ({ dragHandlePosition, dragHandleVisibility, footer, header, reorderable, reorderMode, style, }: TMarketTableV2ReorderableTemplateArgs) => import("lit").TemplateResult<1>;
export type TMarketTableV2CatalogTemplateArgs = Pick<TMarketTableV2TemplateArgs, 'reorderable'> & Pick<TMarketTableV2GroupTemplateArgs, 'collapsed' | 'images'> & Pick<TMarketTableV2RowTemplateArgs, 'actions' | 'control'>;
export declare const MarketTableV2CatalogTemplate: ({ actions, collapsed, control, images, reorderable, }: TMarketTableV2CatalogTemplateArgs) => import("lit").TemplateResult<1>;
export declare const MarketTableV2BulkEditTemplate: () => import("lit").TemplateResult<1>;
