import type { Components, JSX } from "../types/components";

interface MarketTableV2Cell extends Components.MarketTableV2Cell, HTMLElement {}
export const MarketTableV2Cell: {
    prototype: MarketTableV2Cell;
    new (): MarketTableV2Cell;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
