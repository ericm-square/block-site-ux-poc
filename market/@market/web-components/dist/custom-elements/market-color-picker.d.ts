import type { Components, JSX } from "../types/components";

interface MarketColorPicker extends Components.MarketColorPicker, HTMLElement {}
export const MarketColorPicker: {
    prototype: MarketColorPicker;
    new (): MarketColorPicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
