import type { Components, JSX } from "../types/components";

interface MarketTable extends Components.MarketTable, HTMLElement {}
export const MarketTable: {
    prototype: MarketTable;
    new (): MarketTable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
