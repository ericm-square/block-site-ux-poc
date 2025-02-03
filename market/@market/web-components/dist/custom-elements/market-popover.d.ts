import type { Components, JSX } from "../types/components";

interface MarketPopover extends Components.MarketPopover, HTMLElement {}
export const MarketPopover: {
    prototype: MarketPopover;
    new (): MarketPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
