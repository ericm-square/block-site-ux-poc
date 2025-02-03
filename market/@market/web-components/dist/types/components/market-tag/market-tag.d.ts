import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The text used for the tag label
 * @slot icon - an icon that is to the left of tag text
 */
export declare class MarketTag {
    el: HTMLMarketTagElement;
    /**
     * Functionally and visually disables the tag
     */
    readonly disabled: boolean;
    /**
     * Whether or not the tag is in a focused state
     */
    focused: boolean;
    /**
     * String for setting tag size
     */
    readonly size: 'medium' | 'small';
    /**
     * Whether or not the tag contains an icon
     */
    hasIcon: boolean;
    /**
     * Emitted when the tag's remove indicator is clicked.
     */
    marketTagDismissed: EventEmitter;
    onFocus(): void;
    handleDismissTagEvent(e: Event): void;
    componentWillLoad(): void;
    render(): any;
}
