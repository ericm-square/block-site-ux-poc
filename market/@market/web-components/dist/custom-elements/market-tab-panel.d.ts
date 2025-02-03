import type { Components, JSX } from "../types/components";

interface MarketTabPanel extends Components.MarketTabPanel, HTMLElement {}
export const MarketTabPanel: {
    prototype: MarketTabPanel;
    new (): MarketTabPanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
