import { EventEmitter } from '../../../../stencil-public-runtime';
import { TMarketProgressTrackerStepClickEventDetail } from './events';
/**
 * @slot label - Primary text for the step
 * @slot subtext - Secondary text for the step
 * @part icon - The `<market-accessory>` that contains the custom icon indicator
 * @part content - The container for the text content
 * @part button - The clickable part when interactive and on horizontal orientation
 */
export declare class MarketProgressTrackerStep {
    el: HTMLMarketProgressTrackerStepElement;
    /**
     * Whether the step is active
     *
     * @default false
     */
    readonly active: boolean;
    /**
     * @internal
     *
     * Whether the step is in compact mode
     *
     * Only functional when `orientation` is set to `"horizontal"`
     *
     * @default false
     */
    readonly compact: boolean;
    /**
     * @internal
     *
     * Type of connector displayed between steps
     *
     * @default undefined
     */
    readonly connector: 'active' | 'hidden' | 'inactive';
    /**
     * Whether the step is completed
     *
     * @default false
     */
    readonly completed: boolean;
    /**
     * @internal
     *
     * Type of icon used to indicate the step’s progress
     *
     * This is disregarded when a custom icon is slotted via the `icon` slot.
     *
     * @default 'circle'
     */
    readonly indicator: 'circle' | 'check';
    /**
     * @internal
     *
     * Whether the step is interactive
     *
     * Only functional when `orientation` is set to `"horizontal"`
     *
     * @default false
     */
    readonly interactive: boolean;
    /**
     * Unique name of the step
     *
     * When this step is interactive and clicked, it is included in the detail of the emitted event.
     *
     * @default undefined
     */
    readonly name: string;
    /**
     * @internal
     *
     * Affects the step’s appearance
     *
     * @default 'vertical'
     */
    readonly orientation: 'vertical' | 'horizontal';
    /**
     * @internal
     *
     * Step’s size
     *
     * @default 'medium'
     */
    readonly size: 'small' | 'medium' | 'large';
    /**
     * Emitted when this step is clicked
     */
    marketProgressTrackerStepClick: EventEmitter<TMarketProgressTrackerStepClickEventDetail>;
    /**
     * Default icon element if an `icon` slot isn’t provided
     */
    defaultIcon: SVGElement;
    /**
     * Updates the default icon based on the following attributes
     */
    updateDefaultIcon(): void;
    handleClick(): void;
    connectedCallback(): void;
    render(): any;
}
