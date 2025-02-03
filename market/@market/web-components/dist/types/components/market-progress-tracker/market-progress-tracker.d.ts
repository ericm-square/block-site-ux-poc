import { TMarketProgressTrackerStepClickEventDetail } from './subcomponents/market-progress-tracker-step/events';
/**
 * @slot - Default slot, intended to be slotted with `<market-progress-tracker-step>`s
 */
export declare class MarketProgressTracker {
    el: HTMLMarketProgressTrackerElement;
    /**
     * Whether the progress tracker is in compact mode
     *
     * Only functional when `orientation` is set to `"horizontal"`
     *
     * @default false
     */
    readonly compact: boolean;
    /**
     * Whether there are connectors displayed between steps
     *
     * @default false
     */
    readonly connectorless: boolean;
    /**
     * Index of the current step of the tracker
     *
     * When defined, the child `market-progress-tracker-step` components’
     * `active` and `completed` attributes will be automatically set.
     *
     * Otherwise, it is expected that the steps’
     * `active` and `completed` properties are manually set.
     *
     * @default undefined
     */
    currentStepIndex: number;
    /**
     * Type of icon used to indicate the step’s progress
     *
     * @default undefined
     */
    readonly indicator: 'circle' | 'check';
    /**
     * Whether this step tracker is interactive
     *
     * Only functional when `orientation` is set to `"horizontal"`
     *
     * @default false
     */
    readonly interactive: boolean;
    /**
     * Progress tracker orientation
     *
     * @default 'vertical'
     */
    readonly orientation: 'horizontal' | 'vertical';
    /**
     * Whether the direction of the progress indicators is reversed
     *
     * @default false
     */
    readonly reversed: boolean;
    /**
     * Steps’ size
     *
     * @default 'medium'
     */
    readonly size: 'large' | 'medium' | 'small';
    marketProgressTrackerStepClickEventHandler(event: CustomEvent<TMarketProgressTrackerStepClickEventDetail>): void;
    currentStepIndexWatcher(): void;
    reversedWatcher(): void;
    otherPropsWatcher(newValue: unknown, propKey: 'compact' | 'indicator' | 'interactive' | 'orientation' | 'size'): void;
    get stepEls(): HTMLMarketProgressTrackerStepElement[];
    updateStepState(): void;
    /**
     * Updates the steps’ props based on the provided prop-value pair(s)
     */
    propagatePropsToSteps(propValues: Partial<Pick<HTMLMarketProgressTrackerElement, 'compact' | 'indicator' | 'interactive' | 'orientation' | 'size'>>): void;
    handleDefaultSlotChange(): void;
    connectedCallback(): void;
    render(): any;
}
