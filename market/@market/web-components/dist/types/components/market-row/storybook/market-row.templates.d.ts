import { TemplateResult } from 'lit';
import { TSlottedAccessoryTypes } from '../../../../docs/helpers/slotted-accessory';
import { TSlottedControlTypes } from '../../../../docs/helpers/slotted-control';
export type TMarketRowTemplateArgs = Partial<HTMLMarketRowElement> & {
    label?: string | TemplateResult;
    subtext?: string;
    sideLabel?: string;
    sideSubtext?: string;
    control?: TSlottedControlTypes;
    leadingAccessory?: TSlottedAccessoryTypes;
    trailingAccessory?: TSlottedAccessoryTypes;
    slot?: string;
};
export type TMarketRowExamplesTemplateArgs = {
    size?: 'small' | 'medium';
    destructive?: boolean;
};
export declare const MarketRowTemplate: ({ label, subtext, sideLabel, sideSubtext, control, leadingAccessory, trailingAccessory, slot, controlPosition, destructive, disabled, dragEnabled, dragHandlePosition, href, interactive, selected, size, target, togglable, transient, value, variant, }: TMarketRowTemplateArgs) => TemplateResult<1>;
export declare const MarketRowExamplesTemplate: ({ size, destructive }: TMarketRowExamplesTemplateArgs) => TemplateResult<1>;
export declare const MarketRowInteractiveExamplesTemplate: ({ size, destructive }: TMarketRowExamplesTemplateArgs) => TemplateResult<1>;
