import type { Components, JSX } from "../types/components";

interface MarketTile extends Components.MarketTile, HTMLElement {}
export const MarketTile: {
    prototype: MarketTile;
    new (): MarketTile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
