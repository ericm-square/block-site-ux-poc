import { EventEmitter } from '../../stencil-public-runtime';
import { Draggable } from '../../utils/draggable';
import { TMarketDragCoords } from '../../utils/gesture/types';
import { TMarketRowDeselectedEventDetail, TMarketRowSelectedEventDetail } from './events';
import { TMarketRowValidControlElement } from './types';
/**
 * @slot label - Text label for the row
 * @slot subtext - Secondary text for the row
 * @slot side-label - Additional text label to display on the side of the row
 * @slot side-subtext - Secondary text to display on the side of the row
 * @slot control - An interactive control, intended for use with `<market-checkbox>`, `<market-radio>`, or `<market-toggle>`.
 * The row's `selected` prop will set the control's selection state.
 * @slot leading-accessory - An icon set on the left side of the row; intended for use with `<market-accessory>`
 * @slot trailing-accessory - An icon set on the right side of the row; intended for use with `<market-accessory>`
 * @slot - Default slot can take any content, intended as an "escape hatch" for
 * scenarios where rows need to contain more complex HTML content stylable from
 * the light DOM.
 *
 * @part container - Wraps the main and side areas (see below). The outer padding of the row is specified on this element.
 * @part main - Wraps the label and subtext slots, can be used for styling purposes as needed.
 * @part side - Wraps the side-label and side-subtext slots, can be used for styling purposes as needed.
 * @part drag-handle - the drag handle when `dragEnabled` is true.
 */
export declare class MarketRow {
    slottedControlEl: TMarketRowValidControlElement;
    el: HTMLMarketRowElement;
    /**
     * Whether the row is currently selected. Used by `<market-list>` and `<market-select>`.
     * Also sets the selection state for slotted controls (`<market-checkbox>`, `<market-radio>`, or `<market-toggle>`),
     * if present.
     */
    selected: boolean;
    /**
     * The value for the row.
     */
    readonly value: string;
    /**
     * Whether the row is disabled.
     * Also disables slotted controls (`<market-checkbox>`, `<market-radio>`, or `<market-toggle>`), if present.
     */
    readonly disabled: boolean;
    /**
     * Determines the form factor of the row.
     */
    readonly size: 'small' | 'medium';
    /**
     * Whether or not the row is interactive. Results in rows receiving hover
     * and active styling when hovered/clicked.
     *
     * Automatically set to `true` when using the drill variant
     * or passing in a slotted control (checkbox/radio/toggle).<br>
     *
     * Automatically be set to reflect the list's `interactive`
     * value if used inside of `<market-list>`.
     */
    interactive: boolean;
    /**
     * When set to `true`, rows will not persist selected state on click.
     * Only takes effect when `interactive` is true.
     */
    transient: boolean;
    /**
     * By default, row selection is toggled on click. There are some cases, such
     * as selects, where we instead want the row to stay active on subsequent
     * clicks. Setting `togglable` to `false` enables this behavior. Can be set
     * by `<market-list>` and `<market-select>`.
     */
    readonly togglable: boolean;
    /**
     * The style of row you want to use. The default is "regular", which allows
     * you to optionally slot a checkbox, radio, or (in the future) toggle control.
     * The other option is "drill", which functions more like a link that you can
     * use to drill through a series of action card sets.
     */
    readonly variant: 'regular' | 'drill';
    /**
     * Gives the row destructive styling.
     */
    readonly destructive: boolean;
    /**
     * Whether the slotted control appears to the left or right of the main content.
     */
    readonly controlPosition: 'trailing' | 'leading';
    /**
     * A link that this row should navigate to on click.
     * If this property is set, an anchor tag will be rendered.
     */
    readonly href: string | undefined;
    /**
     * Specifies where to display the linked URL.
     * Only applies when an `href` is provided.
     * See [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) for details on accepted values.
     */
    readonly target: '_blank' | '_self' | '_parent' | '_top' | undefined;
    /**
     * Whether the row is drag & drop enabled
     */
    readonly dragEnabled: boolean;
    /**
     * Whether the drag handle appears to the left or right.
     */
    readonly dragHandlePosition: 'leading' | 'trailing';
    /**
     * Fired whenever a row is selected.
     */
    marketRowSelected: EventEmitter<TMarketRowSelectedEventDetail>;
    /**
     * Fired whenever a row is deselected.
     */
    marketRowDeselected: EventEmitter<TMarketRowDeselectedEventDetail>;
    hasSideText: boolean;
    /**
     * If a control gets slotted in, set the value to match that of the row
     */
    selectedWatcher(newValue: boolean): void;
    /**
     * If a control gets slotted in, set the value to match that of the row
     */
    disabledWatcher(newValue: typeof this.disabled): void;
    /**
     * Link rows should not be selectable
     */
    hrefWatcher(newValue: typeof this.href): void;
    /**
     * Drill rows are interactive and transient
     */
    variantWatcher(newValue: typeof this.variant): void;
    /**
     * @internal
     * @private
     *
     * Used for setting the selection state to true without emiting the `marketRowSelected` event.
     */
    silentlySelect(): Promise<void>;
    /**
     * @internal
     * @private
     *
     * Used for setting the selection state to false without emiting the `marketRowDeselected` event.
     */
    silentlyDeselect(): Promise<void>;
    /**
     * @internal
     * @private
     *
     * Used for manually setting `selected` to true. Generally speaking, it
     * is preferable to avoid using this method and allow `market-row` to
     * manage its own selection state based on user interaction. It should only
     * be used for parent components that need to manage a group of rows, such as
     * `market-list`.
     */
    select(): Promise<void>;
    /**
     * @internal
     * @private
     *
     * Used for manually setting `selected` to false. Generally speaking, it
     * is preferable to avoid using this method and allow `market-row` to
     * manage its own selection state based on user interaction. It should only
     * be used for parent components that need to manage a group of rows, such as
     * `market-list`.
     */
    deselect(): Promise<void>;
    /**
     * @internal
     * @private
     *
     * Used for toggling the row's selected state.
     */
    toggle(): Promise<void>;
    handleControlSlotChange(): void;
    setControlActive(value: boolean): void;
    setControlHover(value: boolean): void;
    handleClick(e: MouseEvent): Promise<void>;
    handleKeydown(e: KeyboardEvent): void;
    drag: Draggable;
    onDragStart(e: CustomEvent<TMarketDragCoords>): Promise<void>;
    onDragMove(e: CustomEvent<TMarketDragCoords>): void;
    onDragEnd(e: CustomEvent<TMarketDragCoords>): Promise<void>;
    checkIfSideTextIsPresent(): void;
    querySlots(): void;
    determineRowRole(): string;
    connectedCallback(): void;
    componentWillLoad(): void;
    componentDidUpdate(): Promise<void>;
    render(): any;
}
