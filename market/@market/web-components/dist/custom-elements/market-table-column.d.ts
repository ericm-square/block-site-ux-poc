import type { Components, JSX } from "../types/components";

interface MarketTableColumn extends Components.MarketTableColumn, HTMLElement {}
export const MarketTableColumn: {
    prototype: MarketTableColumn;
    new (): MarketTableColumn;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
