import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The text for the toast
 * @slot action - for `<a href>` or `<button>` (not a `<market-button>`)
 */
export declare class MarketToast {
    el: HTMLMarketToastElement;
    /**
     * toast variant that corresponds to the type of info it is conveying
     */
    readonly variant: 'info' | 'success' | 'warning' | 'critical' | 'insight';
    /**
     * Whether or not the toast persists, ie does not autodismiss after 5s
     */
    readonly persistent: boolean;
    /**
     * Optional property to pass a string to the dismiss "x"
     * that will function as its aria-label. Defaults to "Dismiss".
     */
    readonly dismissButtonAriaLabel: string;
    /**
     * The progress of the action, progress bar will be rendered for values between 0-100 inclusive
     */
    readonly progress: number;
    /**
     * The amount of time (ms) until the toast autodismisses
     * TODO(UI-1153): should be a design token
     */
    durationTilAutoDismiss: number;
    showActionsNav: boolean;
    /**
     * Emitted when the toast automatically dismisses.
     */
    marketToastAutoDismissed: EventEmitter;
    /**
     * Emitted when the toast's dismissed button is clicked.
     */
    marketToastManuallyDismissed: EventEmitter;
    /**
     * Set toast to disappear after the autodismiss timeout has passed
     */
    startAutoDismissTimer(): Promise<void>;
    handleManualDismiss(): void;
    componentWillLoad(): void;
    checkIfActionsArePresent(): void;
    getVariantIcon(): "success" | "warning" | "info" | "attention" | "recommendation";
    render(): any;
}
