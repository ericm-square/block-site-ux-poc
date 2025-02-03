import { h, r as registerInstance, c as createEvent, H as Host } from './index-e03cb5c3.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';
import { p as parseToHSVA } from './color-208faf7b.js';

const pencilWritingIcon = () => (h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M17 4.17004C17.72 4.17004 18.45 4.45004 19 5.00004C20.1 6.10004 20.1 7.90004 19 9.00004L17 11L8 20H4V16L13 7.00004L15 5.00004C15.55 4.45004 16.28 4.17004 17 4.17004ZM17.01 6.17004C16.88 6.17004 16.63 6.20004 16.42 6.41004L15.84 7.01004L17.01 8.18004L17.6 7.59004C17.81 7.37004 17.84 7.13004 17.84 7.00004C17.84 6.87004 17.82 6.62004 17.6 6.41004C17.38 6.20004 17.14 6.17004 17.01 6.17004ZM6 18H7.17L15.58 9.59004L14.41 8.42004L6 16.83V18ZM12 18.0001H20V20.0001H12V18.0001Z" })));

const marketColorPickerInputCss = ":host{display:block}.market-color-swatch{vertical-align:middle;margin:var(--color-picker-input-icon-vertical-spacing, 12px) 0}.color-picker-input-icon{display:flex;justify-content:center;align-items:center;width:var(--color-picker-input-width, 40px);height:var(--color-picker-input-height, 40px);margin:12px 0;border-radius:var(--color-picker-icon-border-radius, calc(var(--core-radius-10) * 1px));background-color:var(--color-picker-icon-background-color, var(--core-fill-40-color))}.color-picker-input-icon svg path{fill:var(--core-fill-10-color)}";
const MarketColorPickerInputStyle0 = marketColorPickerInputCss;

const MarketColorPickerInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketColorPickerInputValueChange = createEvent(this, "marketColorPickerInputValueChange", 7);
        this.value = undefined;
    }
    displayLeadingAccessory() {
        const MarketColorSwatchTagName = getNamespacedTagFor('market-color-swatch');
        const parsedValue = parseToHSVA(this.value);
        // If invalid, this will be null
        if (parsedValue.values) {
            return h(MarketColorSwatchTagName, { value: this.value, disabled: true });
        }
        // otherwise return default icon
        return h("div", { class: "color-picker-input-icon" }, pencilWritingIcon());
    }
    inputValueChange(event) {
        const { detail } = event;
        const prevValue = this.value;
        // Format for hexadecimal if required
        this.formatAndUpdateValue(detail.value);
        const { defaultPrevented } = this.marketColorPickerInputValueChange.emit({ prevValue, value: this.value });
        if (defaultPrevented) {
            this.value = prevValue;
        }
    }
    formatAndUpdateValue(value = this.value) {
        if (!value)
            return;
        let updatedValue = value;
        if (updatedValue[0] !== '#') {
            updatedValue = `#${updatedValue}`;
        }
        this.value = updatedValue;
    }
    componentWillLoad() {
        this.formatAndUpdateValue();
    }
    render() {
        const MarketInputTextTagName = getNamespacedTagFor('market-input-text');
        return (h(Host, { key: '065ff7a8b9ec8a397dd945737ab77d7c465b996f', class: "market-color-picker-input" }, h(MarketInputTextTagName, { key: '06608611fe126161506d8145d7a09de10b2dd02e', value: this.value, id: 'color-picker-input-text', maxlength: 7 }, h("div", { key: '442ad70d982f86c5869004670b47132b670666a4', slot: "leading-accessory" }, this.displayLeadingAccessory()), h("label", { key: '6e69242ce7ad59e3d099492a0898aa919dac643c', htmlFor: "color-picker-input-text" }, h("slot", { key: '3fe01f07c3f4fadf32d5aef7809d46919a1f4b72', name: "label" }, "Hex")), h("slot", { key: 'ebc1477530d21b20038b69557d5aabd9343d8d9f' }))));
    }
};
MarketColorPickerInput.style = MarketColorPickerInputStyle0;

export { MarketColorPickerInput as market_color_picker_input };

//# sourceMappingURL=market-color-picker-input.entry.js.map