/**
 * @slot - Default slot for all rows
 *
 * @slot header - Slot for header rows at the top of the table. Slotting a header row is required to set custom column
 * widths.
 *
 * **NOTE:** slotting rows into this area will not sticky rows to the top. Use `sticky` or
 * `stick-to="top"` on the row element instead.
 *
 * @slot footer - Slot for footer rows at the bottom of the table
 *
 * **NOTE:** slotting rows into this area will not sticky rows to the bottom. Use `sticky` or
 * `stick-to="bottom"` on the row element instead.
 */
export declare class MarketTable {
    el: HTMLMarketTableElement;
    styleDeclaration: CSSStyleDeclaration;
    gridColumnTemplate: Array<string>;
    allColumns: Array<HTMLMarketTableColumnElement>;
    visibleColumns: Array<HTMLMarketTableColumnElement>;
    columnsStuckLeft: Array<HTMLMarketTableColumnElement>;
    columnsStuckRight: Array<HTMLMarketTableColumnElement>;
    columnsUnstuck: Array<HTMLMarketTableColumnElement>;
    allRows: Array<HTMLMarketTableRowElement>;
    rowsStuckTop: Array<HTMLMarketTableRowElement>;
    rowsStuckBottom: Array<HTMLMarketTableRowElement>;
    rowsUnstuck: Array<HTMLMarketTableRowElement>;
    hasAccordionRows: boolean;
    observers: {
        resize?: ResizeObserver;
        inlineStyle?: MutationObserver;
        content?: MutationObserver;
    };
    styleDeclarationObserver(newValue: CSSStyleDeclaration, oldValue: CSSStyleDeclaration): void;
    gridTemplateObserver(newValue: Array<string>, oldValue?: Array<string>): void;
    allColumnsObserver(columns: Array<HTMLMarketTableColumnElement>, oldValue?: Array<HTMLMarketTableColumnElement>): void;
    allRowsObserver(rows: Array<HTMLMarketTableRowElement>, oldValue?: Array<HTMLMarketTableRowElement>): void;
    stuckRowsObserver(newValue: Array<HTMLMarketTableRowElement>, oldValue: Array<HTMLMarketTableRowElement>): void;
    marketTableHeaderLoadedEventHandler({ detail }: {
        detail: any;
    }): void;
    marketTableRowStickEventHandler({ target, detail }: {
        target: any;
        detail: any;
    }): void;
    marketTableRowUnstickEventHandler({ target }: {
        target: any;
    }): void;
    marketTableColumnStickEventHandler({ target, detail }: {
        target: any;
        detail: any;
    }): Promise<void>;
    marketTableColumnUnstickEventHandler({ target }: {
        target: any;
    }): Promise<void>;
    marketTableColumnVisibilityChangeHandler({ detail }: {
        detail: any;
    }): void;
    checkColumnVisibility(): void;
    setColumnWidths(gridTemplate: Array<string>): void;
    forwardColumnPropertiesToCells(columns: any): void;
    updateGridLayout(): void;
    updateStickyRows(): void;
    handleSlotChange(): void;
    /**
     * Gets current CSSStyleDeclaration object for this.el (see styleDeclarationObserver)
     */
    private detectStyleDeclaration;
    private throttledDetectStyleDeclaration;
    /**
     * Supports setting dynamic column sizes using CSS media queries by recalculating column width on table resize
     */
    private initResizeObserver;
    /**
     * Supports setting dynamic column widths by updating inline styles
     */
    private initInlineStyleObserver;
    /**
     * since onSlotchange only fires on changes to the <Host> node itself (not changes to the child slots of the
     * <market-table-area>s), we're using a mutation observer to listen for added rows or changes in row content
     * https://github.com/ionic-team/stencil/issues/232#issuecomment-397871813
     */
    private initContentObserver;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): any;
    disconnectedCallback(): void;
}
