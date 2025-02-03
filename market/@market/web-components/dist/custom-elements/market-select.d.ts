import type { Components, JSX } from "../types/components";

interface MarketSelect extends Components.MarketSelect, HTMLElement {}
export const MarketSelect: {
    prototype: MarketSelect;
    new (): MarketSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
