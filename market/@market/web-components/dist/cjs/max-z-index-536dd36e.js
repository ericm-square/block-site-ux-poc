'use strict';

// adapted from https://bobbyhadz.com/blog/javascript-find-highest-z-index-on-page
function getMaxZIndex(container) {
    return Math.max(...[...container.querySelectorAll('*')]
        .map((el) => Number.parseFloat(window.getComputedStyle(el).zIndex))
        .filter((zIndex) => !Number.isNaN(zIndex)), 0);
}

exports.getMaxZIndex = getMaxZIndex;

//# sourceMappingURL=max-z-index-536dd36e.js.map