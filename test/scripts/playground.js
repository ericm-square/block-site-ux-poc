function generatePageUrl(options = {}) {
    const currentUrl = window.location.href;
    const params = new URLSearchParams();
    let urlWithoutFilename = currentUrl.substring(0, currentUrl.lastIndexOf("/"));

    for (const [key, value] of Object.entries(options)) {
        params.append(key, `${value}`);
    }
    return `${urlWithoutFilename}/?${params.toString()}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const applyOptionsButton = document.querySelector('.apply-options');
    // const copyUrlButton = document.querySelector('.copy-url-button');
    const pageUrlSelector = document.querySelector('.page-url');
    
    applyOptionsButton.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.config-input');
        const options = {};
        inputs.forEach((input) => {
            const suffix = input.getAttribute('data-suffix') ?? '';
            const key = input.getAttribute('data-key');
            const value = input.value;
            if (key && value) {
                options[key] = `${value}${suffix}`;
            }
        });
        pageUrlSelector.innerText = generatePageUrl(options);
        setTimeout(() => {
            copyAsClipboard(pageUrlSelector);
        }, 200);
    });

    // checkAndHideButton(pageUrlSelector, copyUrlButton);
    // copyUrlButton?.addEventListener('click', () => {
    //     copyAsClipboard(pageUrlSelector);
    // });

    // const observer = new MutationObserver(() => {
    //     checkAndHideButton(pageUrlSelector, copyUrlButton);
    // });
    // observer.observe(pageUrlSelector, { childList: true, subtree: true });
    

    document.querySelector('.reset-options').addEventListener('click', () => {
        pageUrlSelector.innerText = generatePageUrl(defaultAnimationValues);
    });
});
