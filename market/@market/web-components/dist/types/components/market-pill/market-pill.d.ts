import { MarketPillVariant } from '../../utils/pill-variant';
export declare class MarketPill {
    /**
     * Sets the visual variant style for the pill.
     */
    readonly variant: MarketPillVariant;
    /**
     * String for setting pill size
     */
    readonly size: 'medium' | 'small';
    /**
     * Controls whether the pill should display an indicator icon.
     */
    readonly indicator: boolean;
    /**
     * Controls whether the pill should react to hovers/clicks. It is recommended to only set this to true if you have also slotted an icon into the pill.
     */
    readonly interactive: boolean;
    renderIndicator(): any;
    render(): any;
}
