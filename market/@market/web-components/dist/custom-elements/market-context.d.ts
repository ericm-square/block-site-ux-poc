import type { Components, JSX } from "../types/components";

interface MarketContext extends Components.MarketContext, HTMLElement {}
export const MarketContext: {
    prototype: MarketContext;
    new (): MarketContext;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
