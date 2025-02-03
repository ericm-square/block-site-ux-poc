function findNode(node) {
    if (node.focused) {
        return node;
    }
    for (const child of node.children || []) {
        const foundNode = findNode(child);
        if (foundNode) {
            return foundNode;
        }
    }
    return null;
}
/**
 * Finds currently focused node
 *
 * Source: https://pptr.dev/api/puppeteer.accessibility.snapshot/#example-2
 *
 * @param {E2EPage} page `E2EPage` instance
 * @returns {SerializedAXNode} focused node
 */
export async function findFocusedNode(page) {
    const snapshot = await page.accessibility.snapshot();
    return findNode(snapshot);
}
//# sourceMappingURL=focus.js.map
