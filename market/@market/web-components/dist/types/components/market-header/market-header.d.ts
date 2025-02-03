import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketHeaderNavigateEventDetail } from './events';
/**
 * @slot - The title. The position of the title varies based on the presence of other slots
 * @slot navigation - navigation buttons, ex close, back, forward, on the left side of the header
 * @slot wayfinding - the smaller "eyebrow" text displayed above the title, e.g. "Step 1 of 2"
 * @slot actions - for button(s) to perform actions, on the right side of the header
 * @slot subheading - Secondary text for the row
 * @part heading - the heading area where the default, wayfinding, and subheading slot is contained in
 */
export declare class MarketHeader {
    el: HTMLMarketHeaderElement;
    customNavEl: any;
    /**
     * Whether or not the navigation slot is shown
     */
    showNavigation: boolean | null;
    /**
     * String to use for the aria-label accessibility attribute of the default close "x" button.
     */
    readonly closeButtonAriaLabel: string;
    /**
     * Disables the default close "x" button.
     */
    readonly disableCloseButton: boolean;
    /**
     * Whether or not the header is in compact mode
     * when navigation is present.
     */
    readonly compact: boolean;
    showActions: boolean;
    /**
     * Emitted when the close icon in the navigation slot is clicked.
     */
    marketHeaderNavigate: EventEmitter<TMarketHeaderNavigateEventDetail>;
    handleCompact(): void;
    handleSlottedNavigation(): void;
    handleSlottedActions(): void;
    handleCloseButtonClick(event: any): void;
    handleSlottedNavClick(event: any): void;
    componentWillLoad(): void;
    componentDidRender(): void;
    handleMutation(mutationList: any): void;
    checkForNavigation(): void;
    cloneDefaultHeadingToCompactHeading(): void;
    renderDefaultNavigation(): any;
    render(): any;
}
