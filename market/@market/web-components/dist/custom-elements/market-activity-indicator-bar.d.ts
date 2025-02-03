import type { Components, JSX } from "../types/components";

interface MarketActivityIndicatorBar extends Components.MarketActivityIndicatorBar, HTMLElement {}
export const MarketActivityIndicatorBar: {
    prototype: MarketActivityIndicatorBar;
    new (): MarketActivityIndicatorBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
