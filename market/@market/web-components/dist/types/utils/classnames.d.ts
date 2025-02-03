type TClassNamesArgs = string | {
    [cn: string]: boolean | number | string;
};
/**
 * Utility for joining class names
 *
 * This function accepts any number of arguments which can be a string or an object.
 * With object parameters, class names that have a truthy value are applied.
 *
 * Based on https://github.com/JedWatson/classnames
 *
 * @param {TClassNamesArgs} args class names
 */
export declare function classNames(...args: TClassNamesArgs[]): string;
export {};
