import type { Components, JSX } from "../types/components";

interface MarketInlineStatus extends Components.MarketInlineStatus, HTMLElement {}
export const MarketInlineStatus: {
    prototype: MarketInlineStatus;
    new (): MarketInlineStatus;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
