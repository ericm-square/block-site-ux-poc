'use strict';

/**
 * We need to account for several possible values for autocomplete.
 * many people make the assumption that autocomplete is a boolean value,
 * but it is actually a string, so we're going to account for people's
 * incorrect assumptions and accept a boolean as well as accepting the
 * spec values
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
var AUTOCOMPLETE;
(function (AUTOCOMPLETE) {
    AUTOCOMPLETE["TRUE"] = "true";
    AUTOCOMPLETE["FALSE"] = "false";
    AUTOCOMPLETE["ON"] = "on";
    AUTOCOMPLETE["OFF"] = "off";
})(AUTOCOMPLETE || (AUTOCOMPLETE = {}));
function autocompleteWatcher(newValue) {
    switch (newValue) {
        case '':
        case true:
        case AUTOCOMPLETE.ON:
        case AUTOCOMPLETE.TRUE:
            /**
             * First, we check for known "truthy" values which will just set
             * the autocomplete attribute to "on" and tell the browser, yes please
             * autocomplete this field, but you have to fend for yourself to figure
             * out what to fill it with.
             */
            return AUTOCOMPLETE.ON;
        case false: // gotta check for exact bc empty strings are falsey, ಠ_ಠ thanks javascript
        case AUTOCOMPLETE.OFF:
        case AUTOCOMPLETE.FALSE:
            return AUTOCOMPLETE.OFF;
        default:
            /**
             * Otherwise we can assume that a non-empty string is passed
             * that doesn't map to a specific enum value. Despite assumptions
             * otherwise, the autocomplete attribute is not a boolean. You can
             * pass strings to it and browsers will use that to infer what kind
             * of data should be autofilled to this field (address, name)
             * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
             */
            return newValue;
    }
}

exports.autocompleteWatcher = autocompleteWatcher;

//# sourceMappingURL=autocomplete-d3ecf142.js.map