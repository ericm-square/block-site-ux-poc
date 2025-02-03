import type { Components, JSX } from "../types/components";

interface MarketPagination extends Components.MarketPagination, HTMLElement {}
export const MarketPagination: {
    prototype: MarketPagination;
    new (): MarketPagination;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
