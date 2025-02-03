'use strict';

function submitFormImplicitly(trigger) {
    const form = trigger.closest('form');
    if (form) {
        const submitButton = form.querySelector('[type="submit"]:not(disabled)');
        if (submitButton) {
            submitButton.click();
        }
    }
}

exports.submitFormImplicitly = submitFormImplicitly;

//# sourceMappingURL=forms-08db29a3.js.map