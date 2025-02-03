import type { Components, JSX } from "../types/components";

interface MarketStepper extends Components.MarketStepper, HTMLElement {}
export const MarketStepper: {
    prototype: MarketStepper;
    new (): MarketStepper;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
