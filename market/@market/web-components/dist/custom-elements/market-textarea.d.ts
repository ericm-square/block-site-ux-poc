import type { Components, JSX } from "../types/components";

interface MarketTextarea extends Components.MarketTextarea, HTMLElement {}
export const MarketTextarea: {
    prototype: MarketTextarea;
    new (): MarketTextarea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
