import type { Components, JSX } from "../types/components";

interface MarketBlade extends Components.MarketBlade, HTMLElement {}
export const MarketBlade: {
    prototype: MarketBlade;
    new (): MarketBlade;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
