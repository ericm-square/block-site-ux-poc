import type { Components, JSX } from "../types/components";

interface MarketCheckbox extends Components.MarketCheckbox, HTMLElement {}
export const MarketCheckbox: {
    prototype: MarketCheckbox;
    new (): MarketCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
