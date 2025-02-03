import type { Components, JSX } from "../types/components";

interface MarketLink extends Components.MarketLink, HTMLElement {}
export const MarketLink: {
    prototype: MarketLink;
    new (): MarketLink;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
