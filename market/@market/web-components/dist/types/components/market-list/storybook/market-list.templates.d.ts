import { TMarketRowTemplateArgs } from '../../market-row/storybook/market-row.templates';
import { TSlottedControlTypes } from '../../../../docs/helpers/slotted-control';
export type TMarketListTemplateArgs = Omit<Partial<HTMLMarketListElement>, 'style'> & {
    className?: string;
    control?: TSlottedControlTypes;
    customEmptyState?: unknown;
    disabledItemsIndices?: string;
    hasSearch?: boolean;
    hasSelectAll?: boolean;
    hasSubtext?: boolean;
    hasValue?: boolean;
    inputSearchValue?: string;
    itemCount?: number;
    itemType?: 'market-row' | 'market-action-card';
    rowArgMap?: {
        [value: string]: Partial<TMarketRowTemplateArgs>;
    };
    searchEmptyStatePrimaryText?: string;
    searchEmptyStateSecondaryText?: string;
    slot?: string;
    style?: string;
    tooltipItemsIndices?: string;
};
export declare const MarketListTemplate: ({ filterStrategy, hideSelectableCount, interactive, multiselect, name, reorderable, reorderMode, transient, value, className, control, customEmptyState, disabledItemsIndices, hasSearch, hasSelectAll, hasSubtext, hasValue, inputSearchValue, itemCount, itemType, rowArgMap, searchEmptyStatePrimaryText, searchEmptyStateSecondaryText, slot, style, tooltipItemsIndices, }: TMarketListTemplateArgs) => import("lit-html").TemplateResult<1>;
export declare function buildItems({ control, disabledItemsIndices, hasSubtext, hasValue, itemCount: _itemCount, itemType, rowArgMap, tooltipItemsIndices, }: Partial<TMarketListTemplateArgs>): import("lit").TemplateResult<1>[];
