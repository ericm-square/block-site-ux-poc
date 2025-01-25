const defaultAnimationValues = {
    'content-translate-y': '20px',
    'block-duration': '0.2s',
};

function updateCssVariable(variableName, value) {
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

function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    const notVisible = element.classList.contains('hidden')
    updateClass(element, 'hidden', !notVisible);
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

function isPartiallyInViewport(element) {
    const rect = element.getBoundingClientRect();

    // Check if any part of the block is within the viewport
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    return isVisible;
}