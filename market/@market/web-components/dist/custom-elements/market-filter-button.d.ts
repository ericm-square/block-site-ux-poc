import type { Components, JSX } from "../types/components";

interface MarketFilterButton extends Components.MarketFilterButton, HTMLElement {}
export const MarketFilterButton: {
    prototype: MarketFilterButton;
    new (): MarketFilterButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
