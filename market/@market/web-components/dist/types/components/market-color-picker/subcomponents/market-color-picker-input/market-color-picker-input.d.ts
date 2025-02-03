import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class MarketColorPickerInput {
    /**
     * Value representing the color shown on the input.
     * This should be in a hexadecimal format (i.e. #ABC123), similarly to native HTML color inputs.
     */
    value: string;
    /**
     * Fired whenever the color picker input value changes.
     */
    marketColorPickerInputValueChange: EventEmitter<{
        prevValue: string;
        value: string;
    }>;
    displayLeadingAccessory(): any;
    inputValueChange(event: CustomEvent): void;
    formatAndUpdateValue(value?: string): void;
    componentWillLoad(): void;
    render(): any;
}
