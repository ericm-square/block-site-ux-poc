import { parsedGridTemplateColumnValues } from "../utils";
describe('parsedGridTemplateColumnValues', () => {
    describe('should return the expected values', () => {
        it('when there is no grid-template-columns definition', () => {
            const output = parsedGridTemplateColumnValues('none');
            expect(output).toEqual(['none']);
        });
        it('when used with explicit values', () => {
            const output = parsedGridTemplateColumnValues('100px 80px 50px 2fr');
            expect(output).toEqual(['100px', '80px', '50px', '2fr']);
        });
        it('when used with repeat()', () => {
            const output = parsedGridTemplateColumnValues('repeat(2, 50px) repeat(3, 100px, 75px)');
            expect(output).toEqual(['50px', '50px', '100px', '75px', '100px']);
        });
        it('when used with a mix of explicit values and repeat()', () => {
            const output = parsedGridTemplateColumnValues('100px repeat(2, 80px) repeat(3, 50px, 3fr) 25px');
            expect(output).toEqual(['100px', '80px', '80px', '50px', '3fr', '50px', '25px']);
        });
    });
    it('should fail gracefully when given input containing unsupported CSS features', () => {
        // example cases from: https://developer.mozilla.org/en-US/docs/Web/CSS/repeat
        const logSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
            /* do nothing */
        });
        let output = parsedGridTemplateColumnValues('repeat(auto-fill, 250px)');
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(output).toEqual(['repeat(auto-fill,', '250px)']);
        output = parsedGridTemplateColumnValues('repeat(auto-fit, 250px)');
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(output).toEqual(['repeat(auto-fit,', '250px)']);
        output = parsedGridTemplateColumnValues('repeat(4, minmax(100px, 1fr)');
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(output).toEqual(['repeat(4,', 'minmax(100px,', '1fr)']);
        output = parsedGridTemplateColumnValues('repeat(4, fit-content(200px)');
        expect(logSpy).toHaveBeenCalledTimes(4);
        expect(output).toEqual(['repeat(4,', 'fit-content(200px)']);
    });
});
//# sourceMappingURL=market-table-utils.spec.js.map
