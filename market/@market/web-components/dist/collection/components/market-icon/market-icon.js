import { Host, h } from "@stencil/core";
import tokens from "@market/market-theme/js/icons.json";
import marketSVGSprite from "@market/market-theme/assets/icons/icons.svg";
import { getDefaultIconFidelity, getFidelityToken, isValidTokenFidelity, isValidSpriteFidelity, getMarketIconSVGSymbol, } from "../../utils/icons";
const marketIconSVGSpriteID = '#market-icon-sprite';
export class MarketIcon {
    constructor() {
        /**
         * Whether or not the icon can change color (is monotone).
         * */
        this.tintable = true;
        this.name = undefined;
        this.fidelity = undefined;
    }
    cloneSymbol(symbol, assetName, width, height) {
        // Remove any existing SVG child elements so we don't duplicate them
        this.el.querySelectorAll('svg').forEach((svg) => svg.remove());
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svg.dataset.name = assetName;
        svg.setAttribute('viewBox', symbol === null || symbol === void 0 ? void 0 : symbol.getAttribute('viewBox'));
        width && svg.setAttribute('width', `${width}`);
        height && svg.setAttribute('height', `${height}`);
        svg.innerHTML = symbol.innerHTML;
        this.el.appendChild(svg);
    }
    getDimensions(symbol, fidelityToken, currentFidelity) {
        var _a, _b, _c, _d;
        // Get the dimensions from the symbol's viewBox attribute
        const dimensions = (symbol === null || symbol === void 0 ? void 0 : symbol.getAttribute('viewBox').split(/\s/).map((d) => Number.parseInt(d, 10))) || [];
        /* Set the dimensions based on the following:
        1. Passed width/height param
        2. Width & Height as read from the tokens
        3. The numbers from the matching SVG symbol's viewBox attribute
        4. Whatever the currentFidelity is set to (assumes square dimensions)
        */
        const width = (_b = (_a = fidelityToken === null || fidelityToken === void 0 ? void 0 : fidelityToken.width) !== null && _a !== void 0 ? _a : dimensions[2]) !== null && _b !== void 0 ? _b : currentFidelity;
        const height = (_d = (_c = fidelityToken === null || fidelityToken === void 0 ? void 0 : fidelityToken.height) !== null && _c !== void 0 ? _c : dimensions[3]) !== null && _d !== void 0 ? _d : currentFidelity;
        return { width, height };
    }
    componentWillLoad() {
        var _a;
        let assetName, currentFidelity, defaultFidelity, fidelityToken, symbol;
        // Find the market SVG sprite if it is on the page
        const documentSVGSprite = document.querySelector(marketIconSVGSpriteID);
        /* If we can't find a symbol or a root level SVG sprite, that means we need to add the default one
        to the page */
        if (!documentSVGSprite) {
            /* This feels sort of icky, but using innerHTML apparently the best way to convert the string
            that gets loaded from importing marketSVGSprite into an actual DOM element */
            const template = document.createElement('div');
            template.innerHTML = marketSVGSprite;
            const sprite = template.querySelector(marketIconSVGSpriteID);
            sprite.style.display = 'none';
            document.body.append(sprite);
            template.remove();
        }
        // Get the full icon object as well as the object at the correct fidelity key if passed.
        const iconToken = tokens.core.icon[this.name];
        // If we have passed a semantic name
        if (iconToken) {
            // Determine the default fidelity from the tokens.
            defaultFidelity = getDefaultIconFidelity(iconToken);
            // Current fidelity is either the fidelity that is passed if it is valid, or the default fidelity
            currentFidelity = isValidTokenFidelity(this.fidelity, iconToken) ? this.fidelity : defaultFidelity;
            // Get the JSON object of the token values for this icon for this icon
            fidelityToken = getFidelityToken(currentFidelity, iconToken);
            // Find the asset name for this semantic icon
            assetName = fidelityToken === null || fidelityToken === void 0 ? void 0 : fidelityToken.asset;
            // Otherwise we've passed a descriptive name
        }
        else {
            // The name passed is assumed to be the asset name
            assetName = this.name;
            // If fidelity here is null or invalid, then this will be an approximate selection of the symbol
            // But we need to surmise some default fidelity and current fidelity from something and since we
            // dont have tokens, the SVG markup is the only thing we have more or less.
            symbol = getMarketIconSVGSymbol(assetName, this.fidelity);
            // Approximate a default fidelity from the matching SVG symbol in the sprite
            defaultFidelity = Number.parseInt(symbol === null || symbol === void 0 ? void 0 : symbol.dataset.fidelity, 10);
            // Current fidelity is either the fidelity that is passed if it is valid, or the default fidelity
            currentFidelity = isValidSpriteFidelity(assetName, this.fidelity) ? this.fidelity : defaultFidelity;
        }
        /* Even if we already have a symbol, we want to run this function again in case the symbol
        assignment on line 120 was assigned based on a non-existent or invalid fidelity */
        symbol = getMarketIconSVGSymbol(assetName, currentFidelity);
        const { width, height } = this.getDimensions(symbol, fidelityToken, currentFidelity);
        if (symbol) {
            // Append the symbol to the component's template
            this.cloneSymbol(symbol, assetName, width, height);
        }
        // set props needed for render
        this.width = width;
        this.height = height;
        this.tintable = (_a = fidelityToken === null || fidelityToken === void 0 ? void 0 : fidelityToken.tintable) !== null && _a !== void 0 ? _a : true;
    }
    render() {
        return (h(Host, { key: 'c8e658a53c2c5af0b32b3f123b124df008f0b499', class: "market-icon", tintable: this.tintable, style: {
                '--icon-width': `${this.width}px`,
                '--icon-height': `${this.height}px`,
            } }, h("slot", { key: '573037cc01b84ffac5e425ac25d9422aca7ae7ab' })));
    }
    static get is() { return "market-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-icon.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-icon.css"]
        };
    }
    static get properties() {
        return {
            "name": {
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
                    "text": "A string identifier for the icon. This can be either the semantic name which maps to\na token or the descriptive name, which maps to a SVG id in the sprite, though using the\nsemantic name is preferred because it gives you access to additional features like fidelity.\nYou can also pass any string and it will display a symbol or group within any SVG sprite\non the page, whether it is the Market sprite or not."
                },
                "attribute": "name",
                "reflect": true
            },
            "fidelity": {
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
                    "text": "Optional: A number representing the fidelity of the icon to display."
                },
                "attribute": "fidelity",
                "reflect": true
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-icon.js.map
