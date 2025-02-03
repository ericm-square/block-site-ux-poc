import type { Components, JSX } from "../types/components";

interface MarketField extends Components.MarketField, HTMLElement {}
export const MarketField: {
    prototype: MarketField;
    new (): MarketField;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
