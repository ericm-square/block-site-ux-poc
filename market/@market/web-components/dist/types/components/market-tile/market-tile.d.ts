import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketTileSelectedChanged } from './events';
/**
 * @slot media - When provided, replaces the solid color background with a background image and applies a slight gradient.
 * @slot leading-accessory - An icon set on the top-left corner of the tile.
 * @slot actions - Optional slot to customize action(s) in the top-right corner of the tile. Renders a remove button by default.
 * @slot indicator - Text to render in a pill-like element on the top-right corner of the slot.
 * Is overridden by `actions`.
 * @slot hint - Large text set in the center of a medium-sized tile. Intended to be one or two letters.
 * @slot label - Text set beneath the hint slot.
 * @slot subtext - Smaller text set beneath the label slot.
 */
export declare class MarketTile {
    el: HTMLMarketTileElement;
    hasTrailingAccessorySlot: boolean;
    hasIndicatorTextSlot: boolean;
    /**
     * Whether to disable the tile.
     */
    readonly disabled: boolean;
    /**
     * Enables interactivity.
     */
    readonly interactive: boolean;
    /**
     * Whether to render the markup in the action slot.
     */
    readonly showActions: boolean;
    /**
     * What size tile to render.
     */
    readonly size: 'small' | 'medium';
    /**
     * Value for the tile.
     */
    readonly value: string;
    /**
     * Whether the tile is currently selected
     */
    selected: boolean;
    /**
     * Whether or not `[slot="media"]` is provided
     */
    hasSlottedMedia: boolean;
    /**
     * Fired whenever the tile is selected.
     */
    marketTileSelectedChanged: EventEmitter<TMarketTileSelectedChanged>;
    /**
     * Fired whenever the remove button is clicked
     */
    marketTileRemoveClicked: EventEmitter;
    onSizeChange(): void;
    /**
     * Allows external elements to set selected value.
     */
    setSelected(newValue: boolean): Promise<void>;
    handleClick(event: MouseEvent | KeyboardEvent): void;
    handleRemoveActionKeydown(event: KeyboardEvent): void;
    handleRemoveActionClick(event: MouseEvent | KeyboardEvent): void;
    renderDefaultRemoveAction(): any;
    handleKeydown(event: KeyboardEvent): void;
    /**
     * This function determines the number of lines the `label` slot text should clamp to.
     * It should clamp to a single line if the hint slot exists or if the subtext slot exists
     * and the element `size` prop is set to "small".
     */
    adjustSlottedLabels(): void;
    checkSlottedMedia(): void;
    componentWillLoad(): void;
    render(): any;
}
