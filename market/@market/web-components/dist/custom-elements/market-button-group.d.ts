import type { Components, JSX } from "../types/components";

interface MarketButtonGroup extends Components.MarketButtonGroup, HTMLElement {}
export const MarketButtonGroup: {
    prototype: MarketButtonGroup;
    new (): MarketButtonGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
