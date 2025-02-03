// adapted from https://bobbyhadz.com/blog/javascript-find-highest-z-index-on-page
function getMaxZIndex(container) {
    return Math.max(...[...container.querySelectorAll('*')]
        .map((el) => Number.parseFloat(window.getComputedStyle(el).zIndex))
        .filter((zIndex) => !Number.isNaN(zIndex)), 0);
}

export { getMaxZIndex as g };

//# sourceMappingURL=max-z-index.js.map