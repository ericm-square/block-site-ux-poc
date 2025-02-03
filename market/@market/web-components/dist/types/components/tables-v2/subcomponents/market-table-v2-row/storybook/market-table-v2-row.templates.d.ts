import { TSlottedAccessoryTypes } from '../../../../../../docs/helpers/slotted-accessory';
export type TMarketTableV2RowTemplateArgs = Partial<HTMLMarketTableV2RowElement> & {
    actions?: boolean;
    content?: string;
    control?: 'none' | 'checkbox' | 'toggle';
    leadingAccessory?: TSlottedAccessoryTypes;
    nowrap?: boolean;
    slot?: string;
    sortable?: boolean;
    stickyLeft?: boolean;
    stickyRight?: boolean;
};
export declare const MarketTableV2RowTemplate: ({ actions, content, control, leadingAccessory, nowrap, slot, sortable, stickyLeft, stickyRight, active, align, caret, disabled, dragEnabled, dragHandlePosition, dragHandleVisibility, footer, header, indent, interactive, selected, sticky, valign, }: TMarketTableV2RowTemplateArgs) => import("lit").TemplateResult<1>;
