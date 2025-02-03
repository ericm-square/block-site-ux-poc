import type { Components, JSX } from "../types/components";

interface MarketDatePicker extends Components.MarketDatePicker, HTMLElement {}
export const MarketDatePicker: {
    prototype: MarketDatePicker;
    new (): MarketDatePicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
