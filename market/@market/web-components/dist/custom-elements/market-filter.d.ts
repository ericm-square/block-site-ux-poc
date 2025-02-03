import type { Components, JSX } from "../types/components";

interface MarketFilter extends Components.MarketFilter, HTMLElement {}
export const MarketFilter: {
    prototype: MarketFilter;
    new (): MarketFilter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
