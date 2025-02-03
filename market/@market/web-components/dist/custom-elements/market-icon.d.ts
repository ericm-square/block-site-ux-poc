import type { Components, JSX } from "../types/components";

interface MarketIcon extends Components.MarketIcon, HTMLElement {}
export const MarketIcon: {
    prototype: MarketIcon;
    new (): MarketIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
