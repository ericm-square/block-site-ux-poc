/**
 * Workaround to allow popover to be rendered beyond the sb container’s bounds
 */
export function fixFilterZIndex(canvasElement) {
    window.requestAnimationFrame(() => {
        // unset overflow styles
        const container = canvasElement.closest('.sbdocs-preview');
        if (!container) {
            return;
        }
        container.style.overflow = 'unset !important';
        container.querySelector('.docs-story').style.overflow = 'unset';
        container.querySelector('.docs-story div:first-of-type').style.overflow = 'unset';
        // set z-index of 1
        canvasElement.querySelectorAll('.market-filter').forEach((filter) => {
            filter.addEventListener('marketFilterExpandedChanged', ({ detail }) => {
                container.style.zIndex = detail ? '1' : null;
                container.querySelector('.docs-story div:first-of-type').style.zIndex = detail ? '2' : '1';
            });
        });
    });
}
//# sourceMappingURL=utils.js.map
