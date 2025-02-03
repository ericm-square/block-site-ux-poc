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
function classNames(...args) {
    return args
        .reduce((result, arg) => {
        if (typeof arg === 'string') {
            result.push(arg);
        }
        else if (typeof arg === 'object') {
            for (const cn of Object.keys(arg)) {
                if (arg[cn]) {
                    result.push(cn);
                }
            }
        }
        return result;
    }, [])
        .join(' ');
}

export { classNames as c };

//# sourceMappingURL=classnames.js.map