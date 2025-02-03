import { EventEmitter } from '../../stencil-public-runtime';
export declare class MarketColorPicker {
    el: HTMLMarketColorPickerElement;
    /**
     * Value representing the color shown on the color picker.
     */
    value: string;
    /**
     * State holding the value to pass into the input. This allows us to handle converting the input value into hexadecimal.
     */
    inputValue: string;
    /**
     * Fired whenever the color picker selection state changes.
     */
    marketColorPickerValueChange: EventEmitter<{
        value: string;
        prevValue: string;
    }>;
    gradientPicker: HTMLMarketColorPickerGradientElement;
    swatchList: HTMLMarketColorSwatchListElement;
    colorInput: HTMLMarketColorPickerInputElement;
    /**
     * Listener for gradient value change. This only fires when the gradient is dragged manually, which currently will only pass a hex value.
     * Since it's a hex value, we know the value will be formatted for inputs.
     * @param event
     */
    gradientValueChange(event: CustomEvent): void;
    swatchValueChange(event: CustomEvent): void;
    inputValueChange(event: CustomEvent): void;
    /**
     * Helper function taking a color string and converting it to Hex if it's in rgba format.
     * @param colorString
     * @returns { string } Hex color string
     */
    formatInputValue(colorString: string): string;
    setSubcomponentValues(): void;
    handleSlotChange(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): any;
}
