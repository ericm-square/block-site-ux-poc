const newTransformTagName = jest.fn().mockImplementation((value) => `prefix-${value}-suffix`);
describe('namespace', () => {
    let getNamespacedTagFor;
    let setTransformTagName;
    let isElementWithTagName;
    beforeEach(async () => {
        ({ getNamespacedTagFor, isElementWithTagName, setTransformTagName } = await import('.'));
    });
    afterEach(() => {
        jest.resetModules();
    });
    it('isElementWithTagName', () => {
        const buttonEl = document.createElement('market-button');
        expect(isElementWithTagName(buttonEl, 'market-button')).toStrictEqual(true);
    });
    describe('getNamespacedTagFor', () => {
        it('default tag (no-op)', () => {
            const tagNameToBeTransformed = 'market-button';
            const transformedTagName = getNamespacedTagFor(tagNameToBeTransformed);
            expect(transformedTagName).toBe(tagNameToBeTransformed);
        });
        it('custom tag name', () => {
            setTransformTagName(newTransformTagName);
            const tagNameToBeTransformed = 'market-button';
            const expectedTransformedName = 'prefix-market-button-suffix';
            const transformedTagName = getNamespacedTagFor(tagNameToBeTransformed);
            expect(newTransformTagName).toHaveBeenCalled();
            expect(transformedTagName).toBe(expectedTransformedName);
        });
    });
});
//# sourceMappingURL=namespace.spec.js.map
