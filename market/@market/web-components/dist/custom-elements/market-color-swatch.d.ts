import type { Components, JSX } from "../types/components";

interface MarketColorSwatch extends Components.MarketColorSwatch, HTMLElement {}
export const MarketColorSwatch: {
    prototype: MarketColorSwatch;
    new (): MarketColorSwatch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
