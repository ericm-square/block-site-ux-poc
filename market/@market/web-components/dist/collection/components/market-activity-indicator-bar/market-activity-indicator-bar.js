import { Host, h } from "@stencil/core";
export class MarketActivityIndicatorBar {
    constructor() {
        this.value = 0;
        this.max = 1;
    }
    render() {
        const max = this.max > 0 ? this.max : 1;
        const value = this.value > 0 ? Math.min(this.value, this.max) : 0;
        const percentComplete = (value / max) * 100;
        return (h(Host, { key: '2e9db0488c0dc203483e1e9e56e41959a8329b1d', class: "market-activity-indicator-bar", role: "progressbar", "aria-valuenow": value, "aria-valuemin": "0", "aria-valuemax": max, "aria-valuetext": `${percentComplete}%` }, h("progress", { key: '5dfd6befd05042fa11d9488f0f20ecd83cda9a5c', value: value, max: max }, h("div", { key: 'cb0711db187e63011f1c2d12c4297c470f131445', class: "progress-bar" }, h("span", { key: '164fa23663f68bb1058f457f57e878971709773a', style: { width: `${percentComplete}%` } })))));
    }
    static get is() { return "market-activity-indicator-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-activity-indicator-bar.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-activity-indicator-bar.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The value the activity bar should report"
                },
                "attribute": "value",
                "reflect": false,
                "defaultValue": "0"
            },
            "max": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The maximum value of the activity bar"
                },
                "attribute": "max",
                "reflect": false,
                "defaultValue": "1"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-activity-indicator-bar.js.map
