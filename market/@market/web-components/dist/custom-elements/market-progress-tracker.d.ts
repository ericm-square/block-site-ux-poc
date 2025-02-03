import type { Components, JSX } from "../types/components";

interface MarketProgressTracker extends Components.MarketProgressTracker, HTMLElement {}
export const MarketProgressTracker: {
    prototype: MarketProgressTracker;
    new (): MarketProgressTracker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
