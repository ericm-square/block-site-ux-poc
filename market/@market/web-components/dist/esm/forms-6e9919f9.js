function submitFormImplicitly(trigger) {
    const form = trigger.closest('form');
    if (form) {
        const submitButton = form.querySelector('[type="submit"]:not(disabled)');
        if (submitButton) {
            submitButton.click();
        }
    }
}

export { submitFormImplicitly as s };

//# sourceMappingURL=forms-6e9919f9.js.map