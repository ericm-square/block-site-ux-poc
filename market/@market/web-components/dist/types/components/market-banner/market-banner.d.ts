import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The text for the banner
 * @slot title - Optional title text for the banner
 * @slot action - for `<a href>` or `<button>` (not a `<market-button>`)
 * @slot icon - for use with a custom icon
 */
export declare class MarketBanner {
    el: HTMLMarketBannerElement;
    /**
     * banner variant that corresponds to the type of info it is conveying
     */
    readonly variant: 'info' | 'success' | 'warning' | 'critical' | 'insight';
    /**
     * whether to show the dismiss "x" or not
     */
    readonly dismissable: boolean;
    /**
     * Optional property to pass a string to the dismiss "x"
     * that will function as its aria-label. Defaults to "Dismiss".
     */
    readonly dismissButtonAriaLabel: string;
    /**
     * Title for the icon image, used as the accessible name for the icon.
     * If a custom icon is provided, this prop is ignored.
     */
    readonly iconImageTitle: string;
    /**
     * Whether or not `[slot="title"]` is provided
     */
    hasTitle: boolean;
    /**
     * Whether or not `[slot="actions"]` is provided
     */
    hasAction: boolean;
    /**
     * Emitted when the banner's dismiss button is clicked.
     */
    marketBannerDismissed: EventEmitter;
    iconImageTitleId: string;
    renderIcon(): any;
    handleTitleSlotChange(): void;
    handleActionSlotChange(): void;
    componentWillLoad(): void;
    dismiss(): void;
    render(): any;
}
