/**
 * @slot primary-text - Primary text; `<h3>` element is recommended
 * @slot secondary-text - Secondary text; `<p>` element is recommended
 * @slot media - Media that appears above the primary text
 * @slot actions - Action elements; `<market-button>` is recommended
 * @slot - default slot is available for slotting non-text content and will appear above all other slots
 */
export declare class MarketEmptyState {
    el: HTMLMarketEmptyStateElement;
    /**
     * Whether or not `.actions` will be displayed (if `actions` slot is provided)
     */
    showActions: boolean;
    handleSlottedContent(): void;
    componentWillRender(): void;
    render(): any;
}
