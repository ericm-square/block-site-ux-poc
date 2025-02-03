/**
 * @slot - The form input, ex. market-input-text.
 * @slot error - Optional error text for the block, displayed below the input when invalid.
 * @slot bottom-accessory - Optional content for the block, displayed below the input.
 * @slot action - Optional action component for the block, displayed below the input.
 */
export declare class MarketField {
    el: HTMLMarketFieldElement;
    /**
     * A string specifying a name for the field.
     */
    readonly name: string;
    /**
     * A boolean representing whether the field is readonly or not.
     */
    readonly readonly: boolean;
    /**
     * A boolean representing whether the field is disabled or not.
     * This visually and functionally will disable the field.
     */
    readonly disabled: boolean;
    /**
     * A boolean representing whether the field is invalid or not.
     * This represents error states.
     */
    readonly invalid: boolean;
    errorSlotId: string;
    getSlottedInputs(): (HTMLMarketCodeInputElement | HTMLMarketInputPasswordElement | HTMLMarketInputTextElement | HTMLMarketSelectElement | HTMLMarketTextareaElement)[];
    getErrorSlot(): Element;
    getBottomAccessorySlot(): Element;
    getInputElAriaDescribedby(): string;
    handleErrorAttributes(): void;
    handleBottomAccessoryAttributes(): void;
    render(): any;
}
