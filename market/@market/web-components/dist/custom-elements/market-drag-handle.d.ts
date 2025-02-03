import type { Components, JSX } from "../types/components";

interface MarketDragHandle extends Components.MarketDragHandle, HTMLElement {}
export const MarketDragHandle: {
    prototype: MarketDragHandle;
    new (): MarketDragHandle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
