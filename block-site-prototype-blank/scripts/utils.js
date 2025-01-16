const defaultAnimationValues = {
    'content-translate-y': '20px',
    'block-slide-in-duration': '0.2s',
};

function updateCssVariable(variableName, value) {
    console.log(`${variableName}: ${value}`);
    document.documentElement.style.setProperty(variableName, value);
}

function updateClass(selector, className, add = true) {
    if (add) {
        selector.classList.add(className);
    } else {
        selector.classList.remove(className);
    }
}

function getLoadAnimationType() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const initialLoadType = urlParams.get('load-animation');
    return initialLoadType;
}

function formatPhoneNumber(input) {
    let cleaned = input.replace(/\\D/g, '');
    let match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);
    
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    
    return cleaned;
}

function checkAndHideButton(targetElement, buttonElement) {
    if (!targetElement.innerText.trim()) {
        buttonElement.style.display = 'none';
    } else {
        buttonElement.style.display = '';
    }
}

function copyAsClipboard(targetElement) {
    const textToCopy = targetElement.innerText;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Text copied to clipboard!');
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
}