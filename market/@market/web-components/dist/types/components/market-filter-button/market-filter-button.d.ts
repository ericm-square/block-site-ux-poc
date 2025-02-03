import { AriaAttributes } from '../../utils/aria';
/**
 * @slot - The text used for the filter button label
 * @slot feedback - The text to indicate currently applied filters
 */
export declare class MarketFilterButton {
    /**
     * String for setting filter button size
     */
    readonly size: 'medium' | 'small';
    /**
     * Functionally and visually disables the button
     */
    readonly disabled: boolean;
    /**
     * Whether or not the button is focused
     */
    focused: boolean;
    /**
     * Whether to display icon in place of label
     */
    readonly iconOnly: boolean;
    /**
     * Whether or not the button is in an active state, e.g. filter is selected and dropdown is opened
     */
    readonly active: boolean;
    /**
     * The ID of the popover element that the button controls
     */
    readonly popoverId: string;
    ariaAttributes: AriaAttributes;
    handleClick(event: UIEvent): void;
    handleDisabledChange(newValue: boolean): void;
    /**
     * Toggle focus on the filter button
     * @param {boolean} [value=true] whether or not focus will be applied or removed
     * @returns {Promise<boolean>} whether or not the button was focused or blurred
     */
    setFocus(value?: boolean): Promise<boolean>;
    /**
     * Reference to the button element
     */
    private buttonEl;
    render(): any;
}
