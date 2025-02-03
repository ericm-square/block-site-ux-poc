import type { Components, JSX } from "../types/components";

interface MarketTableCell extends Components.MarketTableCell, HTMLElement {}
export const MarketTableCell: {
    prototype: MarketTableCell;
    new (): MarketTableCell;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
