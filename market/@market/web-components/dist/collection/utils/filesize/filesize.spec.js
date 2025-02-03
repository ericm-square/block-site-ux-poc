import { getReadableFilesize } from "./index";
describe('getReadableFilesize', () => {
    it('default case', () => {
        expect(getReadableFilesize(1234)).toBe('1.21 kB');
    });
    it('setting number of decimal places', () => {
        expect(getReadableFilesize(1234, 3)).toBe('1.205 kB');
    });
    it('0 bytes', () => {
        expect(getReadableFilesize(0)).toBe('0 bytes');
    });
    it('converting multiple-byte units', () => {
        expect(getReadableFilesize(1024)).toBe('1 kB');
        expect(getReadableFilesize(1024 ** 2)).toBe('1 MB');
        expect(getReadableFilesize(1024 ** 3)).toBe('1 GB');
        expect(getReadableFilesize(1024 ** 4)).toBe('1 TB');
    });
});
//# sourceMappingURL=filesize.spec.js.map
