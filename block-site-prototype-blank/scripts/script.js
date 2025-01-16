// Color Picker
const popupToggle = document.querySelectorAll('.popup-toggle');
const colorPickerToggle = document.querySelector('.color-picker-toggle');
const colorPickerPanel = document.querySelector('.color-picker-panel');
const colorPicker = document.querySelector('#emphasisColorPicker');
const resetColorBtn = document.querySelector('.reset-color');
const defaultEmphasisColor = 'red';

// Toggle whether block is expanded or not
function toggleBlockExpanded(event, blockId) {
    event.preventDefault();
    const block = document.getElementById(blockId);
    if (!block) { return; }

    const isExpanded = block.classList.contains('expanded');
    if (isExpanded) {
        block.classList.remove('expanded');
        block.classList.add('collapsed');
    } else {
        block.classList.add('expanded');
        block.classList.remove('collapsed');
    }
}

function toggleBlockExpandedLevel1(event, blockId) {
    event.preventDefault();
    event.stopPropagation();
    const block = document.getElementById(blockId);
    if (!block) { return; }

    const isExpanded = block.classList.contains('expanded-multi-1');
    if (isExpanded) {
        block.classList.remove('expanded-multi-1');
        block.classList.remove('expanded-multi-2');
        block.classList.add('collapsed-multi');
    } else {
        block.classList.add('expanded-multi-1');
        block.classList.remove('expanded-multi-2');
        block.classList.remove('collapsed-multi');
    }
}

function toggleBlockExpandedLevel2(event, blockId) {
    event.preventDefault();
    event.stopPropagation();
    const block = document.getElementById(blockId);
    if (!block) { return; }

    const isExpanded = block.classList.contains('expanded-multi-2');
    if (isExpanded) {
        block.classList.remove('expanded-multi-1');
        block.classList.remove('expanded-multi-2');
        block.classList.add('collapsed-multi');
    } else {
        block.classList.add('expanded-multi-2');
        block.classList.remove('expanded-multi-1');
        block.classList.remove('collapsed-multi');
    }
}

// Toggle visibility of given element...
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    const notVisible = element.style.visibility === 'hidden';
    element.style.visibility = notVisible ? 'visible' : 'hidden';
}

function updateCssVariable(variableName, value) {
    console.log(`${variableName}: ${value}`);
    document.documentElement.style.setProperty(variableName, value);
}

// When document loads...
document.addEventListener('DOMContentLoaded', () => {
    // Change background color based on browser...
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isChrome = /chrome/i.test(navigator.userAgent);
    const body = document.querySelector('body');
    if (isChrome) {
        updateCssVariable('--background', '#2D2D2D');
        updateCssVariable('--skeleton-opacity-20', 0.05);
        updateCssVariable('--skeleton-opacity-10', 0.03);
    }
    // Animate blocks sequentially
    const blocks = document.querySelectorAll('.block');
    const skeletons = document.querySelector('.skeletons');
    let skeletonsInterval;
    let blocksInterval;

    function animateBlocks(index = 0) {
        if (index >= blocks.length) return;
        
        blocks[index].classList.add('animate');
        
        blocksInterval = setTimeout(() => {
            animateBlocks(index + 1);
        }, 200);
    }

    function resetSkeletons() {
        skeletons.classList.remove('fade-out');
        skeletons.style.display = '';
    }

    function resetBlocks() {
        blocks.forEach((block) => {
            block.classList.remove('animate');
        });
    }

    function showContent() {
        animateBlocks();
        skeletons.classList.add('fade-out');
        setTimeout(() => {
            skeletons.style.display = 'none';
        }, 500);
    }

    function reloadContent() {
        clearInterval(skeletonsInterval);
        clearTimeout(blocksInterval);
        resetSkeletons();
        resetBlocks();
        skeletonsInterval = setTimeout(showContent, 2000);
    }

    skeletonsInterval = setTimeout(showContent, 2000);
    
    const applyOptionsButton = document.querySelector('.apply-options');
    applyOptionsButton.addEventListener('click', () => {
        applyOptionsButton.parentElement.querySelectorAll('.popup-panel-input').forEach((panelInput) => {
            const cssVar = panelInput.getAttribute('data-css-var');
            const value = panelInput?.value;
            const suffix = panelInput.parentElement?.getAttribute('data-suffix');
            if (cssVar && value && suffix) {
                updateCssVariable(cssVar, `${value}${suffix}`);
            }
        });
        
        reloadContent();
    });
    
    const defaultAnimationValues = {
        '--animation-content-translate-y': '20px',
        '--animation-block-slide-in-duration': '0.2s',
    };

    document.querySelector('.reset-options').addEventListener('click', () => {
        for (const variable in defaultAnimationValues) {
            if (defaultAnimationValues.hasOwnProperty(variable)) {
                const input = document.querySelector(`input[data-css-var="${variable}"]`);
                input.value = parseFloat(defaultAnimationValues[variable], 10);
                console.log(defaultAnimationValues[variable]);
                updateCssVariable(variable, defaultAnimationValues[variable]);
            }
        }
        reloadContent();
    });
});

// Toggle color picker panel
popupToggle.forEach((popup) => {
    popup.addEventListener('click', () => {
        const popupPanel = popup.nextElementSibling;
        popupPanel.classList.toggle('active');
    });
})

// Update color when picker changes
colorPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--emphasis', e.target.value);
});

// Reset color to default
resetColorBtn.addEventListener('click', () => {
    document.documentElement.style.setProperty('--emphasis', defaultEmphasisColor);
    colorPicker.value = defaultEmphasisColor;
});

// Close color picker panel when clicking outside
document.addEventListener('click', (e) => {
    if (!colorPickerToggle.contains(e.target) && !colorPickerPanel.contains(e.target)) {
        colorPickerPanel.classList.remove('active');
    }
});

// Cart Functionality
let cart = [];
let cartVisible = false;

function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartVisible = !cartVisible;
    cartPanel.style.transform = cartVisible ? 'translateX(0)' : 'translateX(100%)';
}

// Initialize close cart button
document.querySelector('.close-cart').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling to cart panel
    toggleCart();
});

// Prevent clicks inside cart panel from closing it
document.querySelector('.cart-panel').addEventListener('click', (e) => {
    e.stopPropagation();
});

function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    
    // Update cart count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-controls">
                    <button onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `).join('');
    
    // Update subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
}

function addToCart(menuItem) {
    const existingItem = cart.find(item => item.id === menuItem.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1
        });
    }
    
    // Open cart panel when adding items
    if (!cartVisible) {
        toggleCart();
    }
    
    updateCart();
}

function updateItemQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== itemId);
    } else {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    
    updateCart();
}

// Initialize add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const menuItem = button.closest('.menu-item');
        const name = menuItem.querySelector('.menu-item-title').textContent;
        const priceStr = menuItem.querySelector('.menu-item-price').textContent;
        const price = parseFloat(priceStr.replace('$', ''));
        const id = name.toLowerCase().replace(/\\s+/g, '-');
        
        addToCart({ id, name, price });
    });
});

// Category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter menu items
        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category.includes(category)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Check-in functionality
function toggleCheckIn() {
    const sheet = document.getElementById('checkInSheet');
    if (sheet.style.display === 'flex') {
        // Closing animation
        sheet.classList.remove('visible');
        setTimeout(() => {
            sheet.style.display = 'none';
        }, 300); // Match this with your CSS transition duration
    } else {
        // Opening animation
        sheet.style.display = 'flex';
        setTimeout(() => {
            sheet.classList.add('visible');
        }, 10);
    }
}

function formatPhoneNumber(input) {
    let cleaned = input.replace(/\\D/g, '');
    let match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);
    
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    
    return cleaned;
}

const phoneInput = document.getElementById('phoneNumber');
phoneInput.addEventListener('input', (e) => {
    let input = e.target;
    let formatted = formatPhoneNumber(input.value);
    input.value = formatted;
});

function submitCheckIn() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    // Here you would typically send this to a server
    console.log('Checking in with phone number:', phoneNumber);
    toggleCheckIn();
    
    // Reset the form
    document.getElementById('phoneNumber').value = '';
}