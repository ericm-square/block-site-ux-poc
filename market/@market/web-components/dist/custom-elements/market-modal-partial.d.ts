import type { Components, JSX } from "../types/components";

interface MarketModalPartial extends Components.MarketModalPartial, HTMLElement {}
export const MarketModalPartial: {
    prototype: MarketModalPartial;
    new (): MarketModalPartial;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
