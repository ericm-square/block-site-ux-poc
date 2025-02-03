export function getDefaultIconFidelity(icon) {
    const defaultFidelity = Object.keys(icon)
        .filter((key) => key.includes('fidelity'))
        .find((fidelity) => {
        return icon[fidelity].default ? icon[fidelity].size : null;
    });
    return icon[defaultFidelity].size;
}
export function getFidelityToken(fidelity, icon) {
    return icon[`fidelity:${fidelity}`];
}
export function isValidTokenFidelity(fidelity, icon) {
    return Boolean(getFidelityToken(fidelity, icon));
}
export function getMarketIconSVGSymbol(asset, fidelity) {
    // Return the SVG asset matching the asset name and the fidelity provided. Of no fidelity provided, return the first match.
    return fidelity
        ? document.querySelector(`[data-name="${asset}"][data-fidelity="${fidelity}"]`)
        : document.querySelector(`[data-name="${asset}"]`);
}
export function isValidSpriteFidelity(asset, fidelity) {
    return Boolean(getMarketIconSVGSymbol(asset, fidelity));
}
//# sourceMappingURL=icons.js.map
