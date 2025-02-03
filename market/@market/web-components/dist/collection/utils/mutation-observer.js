/**
 * Use this util within a MutationObserver callback.
 * This waits for all `addedNodes[].componentOnReady` to be called.
 * @returns {Promise} Promise when the elements are ready
 */
export const waitForAddedNodesToBeReady = (mutationList) => {
    const addedNodes = mutationList.reduce((nodes, record) => {
        for (const node of record.addedNodes) {
            if (typeof node.componentOnReady === 'function') {
                nodes.push(node);
            }
        }
        return nodes;
    }, []);
    return Promise.all(addedNodes.map(async (node) => {
        await node.componentOnReady();
        return Promise.resolve();
    }));
};
/**
 * Creates a MutationObserver and observes attribute changes
 *
 * @param element - Element to be observed
 * @param attributeName - Name of attribute to be observed
 * @param callback - Callback to be executed when the attribute's value is mutated
 * @returns MutationObserver
 */
export const createAttributeMutationObserver = (element, attributeName, callback) => {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'attributes' || mutation.attributeName !== attributeName) {
                continue;
            }
            const element = mutation.target;
            const value = element.getAttribute(attributeName);
            callback.apply({}, [value, element]);
        }
    });
    observer.observe(element, { attributes: true });
    return observer;
};
//# sourceMappingURL=mutation-observer.js.map
