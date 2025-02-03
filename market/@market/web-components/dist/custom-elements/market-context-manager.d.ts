import type { Components, JSX } from "../types/components";

interface MarketContextManager extends Components.MarketContextManager, HTMLElement {}
export const MarketContextManager: {
    prototype: MarketContextManager;
    new (): MarketContextManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
