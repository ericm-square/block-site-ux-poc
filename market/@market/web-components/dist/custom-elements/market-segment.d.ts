import type { Components, JSX } from "../types/components";

interface MarketSegment extends Components.MarketSegment, HTMLElement {}
export const MarketSegment: {
    prototype: MarketSegment;
    new (): MarketSegment;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
