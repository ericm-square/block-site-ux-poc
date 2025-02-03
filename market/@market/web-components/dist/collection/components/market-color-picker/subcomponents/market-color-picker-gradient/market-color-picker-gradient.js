import { Host, h } from "@stencil/core";
import { throttle } from "lodash-es";
import { isTouchEvent, getCoordsFromEvent } from "../../../../utils/gesture/utils";
import { hsvToRgb, parseToHSVA, hsvToHex } from "../../../../utils/color";
const RESIZE_DEBOUNCE_DURATION = 16; // 60fps
/**
 * String values for pointer ids.
 */
const PRIMARY_ID = 'primary-pointer';
const SECONDARY_ID = 'secondary-pointer';
/**
 * Default constants as percentages. Looks different at different viewport sizes, so no obvious coordinates available.
 */
const PRIMARY_COORDINATES = [50, 50];
const SECONDARY_COORDINATES = [95, 10];
export class MarketColorPickerGradient {
    constructor() {
        /**
         * Secondary pointer location. Used to determine secondary pointer color when secondary gradient changes.
         */
        this.secondaryPointerCoordinates = SECONDARY_COORDINATES;
        /**
         * Drag and drop logic for pointers.
         */
        this.boundOnDragMove = this.onDragMove.bind(this);
        this.boundOnDragEnd = this.onDragEnd.bind(this);
        this.throttledUpdatePointerOnDrag = throttle(this.updatePointerOnDrag.bind(this), RESIZE_DEBOUNCE_DURATION);
        this.value = undefined;
    }
    onDragStart(e, pointer) {
        e.preventDefault();
        e.stopPropagation();
        // only start drag on touch events or left mouse clicks
        if (!isTouchEvent(e) && e.button !== 0)
            return;
        const coords = getCoordsFromEvent(e);
        this.updatePointerOnDrag(coords.x, coords.y, pointer);
        this.draggablePointer = pointer;
        document.addEventListener('mousemove', this.boundOnDragMove);
        document.addEventListener('mouseup', this.boundOnDragEnd);
        // don't use passive touch event listeners so we can call preventDefault()
        document.addEventListener('touchmove', this.boundOnDragMove, { passive: false });
        document.addEventListener('touchend', this.boundOnDragEnd, { passive: false });
    }
    onDragMove(e) {
        e.preventDefault();
        const coords = getCoordsFromEvent(e);
        this.throttledUpdatePointerOnDrag(coords.x, coords.y, this.draggablePointer);
    }
    onDragEnd(e) {
        e.preventDefault();
        this.draggablePointer = null;
        document.removeEventListener('mousemove', this.boundOnDragMove);
        document.removeEventListener('mouseup', this.boundOnDragEnd);
        document.removeEventListener('touchmove', this.boundOnDragMove);
        document.removeEventListener('touchend', this.boundOnDragEnd);
    }
    /**
     * Drag logic function to determine coordinates as a percentage.
     * @param posX
     * @param posY
     * @param pointer
     */
    updatePointerOnDrag(posX, posY, pointer) {
        const elem = pointer.parentElement;
        if (!elem) {
            return;
        }
        const rect = elem.getBoundingClientRect();
        const elemOffsetX = rect.left;
        const elemOffsetY = rect.top;
        const maxWidth = rect.width;
        const maxHeight = rect.height;
        // Set x and y as percentages of the gradient
        let updatedX = (posX - elemOffsetX) / maxWidth;
        let updatedY = (posY - elemOffsetY) / maxHeight;
        // Ensure pointer does not leave gradient bounds
        updatedX = Math.max(Math.min(updatedX, 1), 0);
        updatedY = Math.max(Math.min(updatedY, 1), 0);
        // utilize the %'s given for S & V (H decided by primary gradient)
        // S = x increasing
        // V = y decreasing
        // H = color (0-360) by %
        this.setPointerCoordinates({
            pointer,
            x: updatedX * 100,
            y: updatedY * 100,
        });
    }
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
    setPointerCoordinates(options) {
        const { pointer, x, y = 50, emitEvent = true, colorType = '' } = options;
        const pointerOffset = pointer.offsetWidth / 2;
        pointer.style.left = `calc(${x}% - ${pointerOffset}px)`;
        // Updates the selected color of the targeted gradient
        if (pointer.id === PRIMARY_ID) {
            this.setPrimaryGradientColor(x / 100, emitEvent);
        }
        else if (pointer.id === SECONDARY_ID) {
            // only update this on secondary gradient
            pointer.style.top = `calc(${y}% - ${pointerOffset}px)`;
            this.setSecondaryGradientColor(x / 100, y / 100, emitEvent, colorType);
        }
    }
    /**
     * Sets primary pointer color.
     * Secondary gradient is updated to reflect new primary color.
     * @param x
     * @param emitEvent
     */
    setPrimaryGradientColor(x, emitEvent = true) {
        this.primaryHue = x * 360;
        this.primaryPointer.style.background = `hsl(${this.primaryHue}, 100%, 50%)`;
        this.updateSecondaryGradient(emitEvent);
    }
    /**
     * Sets secondary pointer color. If rgba is used, show that, otherwise default to hex values.
     * The value emitted from the gradient here, if emitEvent is true.
     * @param x
     * @param y
     * @param emitEvent
     * @param colorType
     */
    setSecondaryGradientColor(x, y, emitEvent = true, colorType = '') {
        const saturation = x * 100;
        const value = 100 - y * 100;
        let colorValue;
        let colorString;
        if (colorType === 'rgba') {
            colorValue = hsvToRgb(this.primaryHue, saturation, value);
            colorString = `rgb(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]})`;
        }
        else {
            // Defaults to hex value shown
            colorValue = hsvToHex(this.primaryHue, saturation, value);
            colorString = `#${colorValue.join('')}`;
        }
        this.secondaryPointer.style.background = colorString;
        this.secondaryPointerCoordinates = [x, y];
        if (emitEvent) {
            this.marketColorPickerGradientValueChange.emit({ value: colorString });
        }
    }
    /**
     * Updates the secondary gradient picker background, then updates secondary pointer.
     * @param emitEvent
     */
    updateSecondaryGradient(emitEvent = true) {
        const gradient = this.el.shadowRoot.querySelector('.secondary-gradient');
        gradient.style.background = `
      linear-gradient(to top, rgb(0, 0, 0), transparent),
      linear-gradient(to left, hsl(${this.primaryHue}, 100%, 50%), rgb(255, 255, 255))
    `;
        this.setSecondaryGradientColor(...this.secondaryPointerCoordinates, emitEvent);
    }
    /**
     * This value watcher attempts to convert the value into a valid color and updates the gradient pickers.
     * It returns a boolean based on whether this succeeded or not.
     * @returns boolean
     */
    updateGradientsByValue() {
        // Determine if color formatted as: hex, rgb, hsl
        // Convert it to hsv and update position based on hsv
        // Attempt to convert value
        const convertedColor = parseToHSVA(this.value);
        // If it converts successfully, values will exist. We also need the pointers to be initialized for this to work.
        if (convertedColor.values && this.primaryPointer && this.secondaryPointer) {
            const h = convertedColor.values[0];
            const s = convertedColor.values[1];
            const v = convertedColor.values[2];
            // Deconstruct to HSV values. h = primary, s = secondary x, v = secondary y (decreasing)
            const primaryX = (100 * h) / 360;
            const secondaryX = s;
            const secondaryY = 100 - v;
            const primaryOptions = {
                pointer: this.primaryPointer,
                x: primaryX,
                emitEvent: false,
            };
            const secondaryOptions = {
                pointer: this.secondaryPointer,
                x: secondaryX,
                y: secondaryY,
                colorType: convertedColor.colorType,
                emitEvent: false,
            };
            this.setPointerCoordinates(primaryOptions);
            this.setPointerCoordinates(secondaryOptions);
            return true;
        }
        return false;
    }
    /**
     * Sets necessary values for pointers to work if no valid value has been preset on load
     */
    setInitialPointers() {
        const pointers = [this.primaryPointer, this.secondaryPointer];
        const pointerCoordinates = [PRIMARY_COORDINATES, SECONDARY_COORDINATES];
        pointers.forEach((pointer, i) => {
            const pointerOptions = {
                pointer,
                x: pointerCoordinates[i][0],
                y: pointerCoordinates[i][1],
                emitEvent: false,
            };
            this.setPointerCoordinates(pointerOptions);
        });
    }
    componentDidLoad() {
        this.primaryPointer = this.el.shadowRoot.querySelector(`#${PRIMARY_ID}`);
        this.secondaryPointer = this.el.shadowRoot.querySelector(`#${SECONDARY_ID}`);
        const success = this.updateGradientsByValue();
        if (!success) {
            this.setInitialPointers();
        }
    }
    /* eslint-disable jsx-a11y/aria-role */
    render() {
        return (h(Host, { key: '27b14b18a7e6c1035e8c062f8125918f7cc4a2c2', class: "market-color-picker-gradient" }, h("slot", { key: '5abf8dc220282ff102cd8b5011849a35e79a4596' }), h("div", { key: '036d0b665d8f536d8e89e9e44a11c0a323ebe648', class: "primary-gradient", role: "input", onMouseDown: (e) => this.onDragStart(e, this.primaryPointer), onTouchStart: (e) => this.onDragStart(e, this.primaryPointer) }, h("div", { key: '96d5a6573888eb84d0c8833f493a4feb2869466c', id: PRIMARY_ID, class: "pointer" })), h("div", { key: '825d8adfc5eb558d5114d540b9d054b8085967a5', class: "secondary-gradient", role: "input", onMouseDown: (e) => this.onDragStart(e, this.secondaryPointer), onTouchStart: (e) => this.onDragStart(e, this.secondaryPointer) }, h("div", { key: '3b8b8955b967f45d3bac7b57b5904c52d71f1d34', id: SECONDARY_ID, class: "pointer" }))));
    }
    static get is() { return "market-color-picker-gradient"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-color-picker-gradient.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-color-picker-gradient.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Value representing the selected color of the secondary gradient picker.\nThis is a string that can represent a [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color).\nThis is the value the color picker will use.\nSupported color types are rgb/a, hsl/a, and hex colors."
                },
                "attribute": "value",
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "marketColorPickerGradientValueChange",
                "name": "marketColorPickerGradientValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the picker selection state changes."
                },
                "complexType": {
                    "original": "{ value: string }",
                    "resolved": "{ value: string; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "updateGradientsByValue"
            }];
    }
}
//# sourceMappingURL=market-color-picker-gradient.js.map
