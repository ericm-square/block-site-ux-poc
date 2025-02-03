import type { Components, JSX } from "../types/components";

interface MarketButton extends Components.MarketButton, HTMLElement {}
export const MarketButton: {
    prototype: MarketButton;
    new (): MarketButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
