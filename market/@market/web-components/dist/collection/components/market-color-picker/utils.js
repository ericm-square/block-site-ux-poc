import { CORE_BURGUNDY_FILL_COLOR, CORE_RED_FILL_COLOR, CORE_ORANGE_FILL_COLOR, CORE_GOLD_FILL_COLOR, CORE_YELLOW_FILL_COLOR, CORE_TAUPE_FILL_COLOR, CORE_BROWN_FILL_COLOR, CORE_FOREST_FILL_COLOR, CORE_GREEN_FILL_COLOR, CORE_TEAL_FILL_COLOR, CORE_BLUE_FILL_COLOR, CORE_SKY_FILL_COLOR, CORE_PURPLE_FILL_COLOR, CORE_PINK_FILL_COLOR, } from "@market/market-theme/js/cjs/index.js";
/**
 * Takes swatch colors string prop and converts it into a usable array. Removes any empty strings.
 * @param {string} swatchString
 */
export function formatSwatchArray(swatchString) {
    return swatchString.split(';').filter((el) => el);
}
/**
 * Helper function to grab default Market color swatches formatted for market-color-picker
 * @returns { string } colorString
 */
export function getDefaultMarketColorSwatches() {
    return [
        CORE_BURGUNDY_FILL_COLOR,
        CORE_RED_FILL_COLOR,
        CORE_ORANGE_FILL_COLOR,
        CORE_GOLD_FILL_COLOR,
        CORE_YELLOW_FILL_COLOR,
        CORE_TAUPE_FILL_COLOR,
        CORE_BROWN_FILL_COLOR,
        CORE_FOREST_FILL_COLOR,
        CORE_GREEN_FILL_COLOR,
        CORE_TEAL_FILL_COLOR,
        CORE_BLUE_FILL_COLOR,
        CORE_SKY_FILL_COLOR,
        CORE_PURPLE_FILL_COLOR,
        CORE_PINK_FILL_COLOR,
    ];
}
//# sourceMappingURL=utils.js.map
