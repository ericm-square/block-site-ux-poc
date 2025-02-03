import type { Components, JSX } from "../types/components";

interface MarketAccessory extends Components.MarketAccessory, HTMLElement {}
export const MarketAccessory: {
    prototype: MarketAccessory;
    new (): MarketAccessory;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
