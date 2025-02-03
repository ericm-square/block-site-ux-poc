import type { Components, JSX } from "../types/components";

interface MarketEmptyState extends Components.MarketEmptyState, HTMLElement {}
export const MarketEmptyState: {
    prototype: MarketEmptyState;
    new (): MarketEmptyState;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
