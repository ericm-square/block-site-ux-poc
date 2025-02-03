import type { Components, JSX } from "../types/components";

interface MarketPaginationNav extends Components.MarketPaginationNav, HTMLElement {}
export const MarketPaginationNav: {
    prototype: MarketPaginationNav;
    new (): MarketPaginationNav;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
