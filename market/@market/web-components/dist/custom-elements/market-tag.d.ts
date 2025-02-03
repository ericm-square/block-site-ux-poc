import type { Components, JSX } from "../types/components";

interface MarketTag extends Components.MarketTag, HTMLElement {}
export const MarketTag: {
    prototype: MarketTag;
    new (): MarketTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
