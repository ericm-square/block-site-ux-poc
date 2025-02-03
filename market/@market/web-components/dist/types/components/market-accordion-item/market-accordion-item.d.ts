import { EventEmitter } from '../../stencil-public-runtime';
export declare class MarketAccordionItem {
    el: HTMLMarketAccordionItemElement;
    /**
     * The unique name of the accordion.
     */
    readonly name: string;
    /**
     * Determines whether the accordion is shown as expanded or collapsed.
     */
    expanded: boolean;
    /**
     * Whether the accordion should appear in a disabled state.
     */
    disabled: boolean;
    /**
     * The size of the heading text of the accordion.
     */
    readonly size: 'small' | 'medium' | 'large';
    /**
     * Use a custom trigger to expand/collapse content
     */
    customTrigger: HTMLMarketTableRowElement;
    /**
     * Fired whenever the "expanded" prop value changes.
     */
    marketAccordionItemExpandedChange: EventEmitter<{
        expanded: boolean;
    }>;
    marketAccordionToggleHandler(e: CustomEvent): void;
    /**
     * Used to set the "open" state of the accordion.
     */
    setExpanded(newExpanded: boolean): Promise<void>;
    /**
     * Sets `disabled` state. Allows external elements to programmatically trigger disabled styling.
     */
    setDisabled(value: boolean): Promise<void>;
    getAccordionIcon(): any;
    componentWillLoad(): void;
    render(): any;
}
