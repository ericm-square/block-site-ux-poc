/**
 * This is an implementation component only and does not relfect any component in the
 * design spec for Market */
/**
 * @slot - Default slot
 */
export declare class MarketTableArea {
    el: HTMLMarketTableAreaElement;
    /**
     * Whether or not this area is grouping columns (vertical) or rows (horizontal)
     */
    readonly orientation: 'horizontal' | 'vertical';
    /**
     * Sticks this area to an edge of the table
     */
    readonly stickTo: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Set by the parent market-table or market-row component to determine CSS grid template
     */
    readonly gridTemplate: Array<string>;
    /**
     * Whether or not this table area is currently visible/has any rows or cells within
     */
    active: boolean;
    /**
     * Sets the element's grid-column CSS property to determine where this particular element
     * falls on the parent grid. Used in vertical orientation table areas
     */
    readonly placement: Array<number>;
    elements: Array<HTMLMarketTableRowElement | HTMLMarketTableCellElement | HTMLMarketTableColumnElement>;
    assignGridTemplate(newValue: Array<string>, oldValue?: Array<string>): void;
    placementObserver(newValue: Array<number>, oldValue: Array<number>): void;
    componentWillLoad(): void;
    render(): any;
}
