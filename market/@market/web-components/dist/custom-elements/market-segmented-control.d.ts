import type { Components, JSX } from "../types/components";

interface MarketSegmentedControl extends Components.MarketSegmentedControl, HTMLElement {}
export const MarketSegmentedControl: {
    prototype: MarketSegmentedControl;
    new (): MarketSegmentedControl;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
