import { EventEmitter } from '../../../../stencil-public-runtime';
import { TMouseOrTouchEvent } from '../../../../utils/gesture/types';
export declare class MarketColorPickerGradient {
    el: HTMLMarketColorPickerGradientElement;
    /**
     * Value representing the selected color of the secondary gradient picker.
     * This is a string that can represent a [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color).
     * This is the value the color picker will use.
     * Supported color types are rgb/a, hsl/a, and hex colors.
     */
    readonly value: string;
    /**
     * Fired whenever the picker selection state changes.
     */
    marketColorPickerGradientValueChange: EventEmitter<{
        value: string;
    }>;
    /**
     * Current hue set on primary gradient.
     */
    primaryHue: number;
    primaryPointer: HTMLElement;
    secondaryPointer: HTMLElement;
    /**
     * Secondary pointer location. Used to determine secondary pointer color when secondary gradient changes.
     */
    secondaryPointerCoordinates: [number, number];
    /**
     * Element of currently dragged pointer.
     */
    draggablePointer: HTMLElement | null;
    /**
     * Drag and drop logic for pointers.
     */
    boundOnDragMove: any;
    boundOnDragEnd: any;
    private throttledUpdatePointerOnDrag;
    onDragStart(e: TMouseOrTouchEvent, pointer: HTMLElement): void;
    onDragMove(e: TMouseOrTouchEvent): void;
    onDragEnd(e: TMouseOrTouchEvent): void;
    /**
     * Drag logic function to determine coordinates as a percentage.
     * @param posX
     * @param posY
     * @param pointer
     */
    updatePointerOnDrag(posX: number, posY: number, pointer: HTMLElement): void;
    /**
     * Function handling updating pointer location based on provided coordinates.
     * The x and y values are percentages, from 0-100.
     * It then also updates the colors of the pointers.
     * @param {HTMLElement} options.pointer
     * @param {number} options.x
     * @param {number} options.y
     * @param {boolean} options.emitEvent
     * @param {string} options.colorType
     */
    setPointerCoordinates(options: {
        pointer: HTMLElement;
        x: number;
        y?: number;
        emitEvent?: boolean;
        colorType?: string;
    }): void;
    /**
     * Sets primary pointer color.
     * Secondary gradient is updated to reflect new primary color.
     * @param x
     * @param emitEvent
     */
    setPrimaryGradientColor(x: number, emitEvent?: boolean): void;
    /**
     * Sets secondary pointer color. If rgba is used, show that, otherwise default to hex values.
     * The value emitted from the gradient here, if emitEvent is true.
     * @param x
     * @param y
     * @param emitEvent
     * @param colorType
     */
    setSecondaryGradientColor(x: number, y: number, emitEvent?: boolean, colorType?: string): void;
    /**
     * Updates the secondary gradient picker background, then updates secondary pointer.
     * @param emitEvent
     */
    updateSecondaryGradient(emitEvent?: boolean): void;
    /**
     * This value watcher attempts to convert the value into a valid color and updates the gradient pickers.
     * It returns a boolean based on whether this succeeded or not.
     * @returns boolean
     */
    updateGradientsByValue(): boolean;
    /**
     * Sets necessary values for pointers to work if no valid value has been preset on load
     */
    setInitialPointers(): void;
    componentDidLoad(): void;
    render(): any;
}
