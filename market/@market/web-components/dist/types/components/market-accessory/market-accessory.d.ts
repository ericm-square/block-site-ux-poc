/**
 * @slot - Intended for a slotted image or icon.
 */
export declare class MarketAccessory {
    /**
     * The desired size for the leading or trailing accessory, which we expect to
     * be either an image or a <market-icon> component. The available sizes are
     * "icon" (24x24) and "image" (40x40).
     */
    readonly size: 'icon' | 'image';
    render(): any;
}
