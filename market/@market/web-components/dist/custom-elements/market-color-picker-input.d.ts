import type { Components, JSX } from "../types/components";

interface MarketColorPickerInput extends Components.MarketColorPickerInput, HTMLElement {}
export const MarketColorPickerInput: {
    prototype: MarketColorPickerInput;
    new (): MarketColorPickerInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
