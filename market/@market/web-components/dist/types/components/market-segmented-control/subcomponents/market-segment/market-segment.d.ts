import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class MarketSegment {
    el: HTMLMarketSegmentElement;
    /**
     * Whether the market segment should appear in a disabled state.
     */
    disabled: boolean;
    /**
     * A string specifying a value for the segment.
     */
    value: string;
    /**
     * A boolean specifying whether the segment is selected or not.
     */
    selected: boolean;
    /**
     * Fired when the segment is clicked or otherwise selected
     */
    marketSegmentSelectedChanged: EventEmitter<{
        value: boolean;
        prevValue: boolean;
    }>;
    setSelectedState(state: any): Promise<void>;
    selectSegment(): Promise<void>;
    render(): any;
}
