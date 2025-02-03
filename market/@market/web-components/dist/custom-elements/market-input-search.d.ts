import type { Components, JSX } from "../types/components";

interface MarketInputSearch extends Components.MarketInputSearch, HTMLElement {}
export const MarketInputSearch: {
    prototype: MarketInputSearch;
    new (): MarketInputSearch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
