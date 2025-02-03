/**
 * Returns byte size as a human-readable string.
 * Cribbed from https://stackoverflow.com/a/18650828
 *
 * @param bytes File size in bytes
 * @param decimals Decimal precision
 */
export const getReadableFilesize = (bytes, decimals = 2) => {
    if (!Number(bytes))
        return '0 bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
//# sourceMappingURL=index.js.map
