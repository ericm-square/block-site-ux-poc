import type { Components, JSX } from "../types/components";

interface MarketActivityIndicator extends Components.MarketActivityIndicator, HTMLElement {}
export const MarketActivityIndicator: {
    prototype: MarketActivityIndicator;
    new (): MarketActivityIndicator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
