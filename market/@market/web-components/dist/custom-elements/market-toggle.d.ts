import type { Components, JSX } from "../types/components";

interface MarketToggle extends Components.MarketToggle, HTMLElement {}
export const MarketToggle: {
    prototype: MarketToggle;
    new (): MarketToggle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
