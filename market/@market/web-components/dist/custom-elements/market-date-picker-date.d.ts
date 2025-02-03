import type { Components, JSX } from "../types/components";

interface MarketDatePickerDate extends Components.MarketDatePickerDate, HTMLElement {}
export const MarketDatePickerDate: {
    prototype: MarketDatePickerDate;
    new (): MarketDatePickerDate;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
