import type { Components, JSX } from "../types/components";

interface MarketDialog extends Components.MarketDialog, HTMLElement {}
export const MarketDialog: {
    prototype: MarketDialog;
    new (): MarketDialog;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
