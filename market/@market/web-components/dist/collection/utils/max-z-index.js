// adapted from https://bobbyhadz.com/blog/javascript-find-highest-z-index-on-page
export function getMaxZIndex(container) {
    return Math.max(...[...container.querySelectorAll('*')]
        .map((el) => Number.parseFloat(window.getComputedStyle(el).zIndex))
        .filter((zIndex) => !Number.isNaN(zIndex)), 0);
}
//# sourceMappingURL=max-z-index.js.map
