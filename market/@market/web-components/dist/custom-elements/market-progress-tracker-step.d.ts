import type { Components, JSX } from "../types/components";

interface MarketProgressTrackerStep extends Components.MarketProgressTrackerStep, HTMLElement {}
export const MarketProgressTrackerStep: {
    prototype: MarketProgressTrackerStep;
    new (): MarketProgressTrackerStep;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
