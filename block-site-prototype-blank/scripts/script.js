// Color Picker
const popupToggle = document.querySelectorAll('.popup-toggle');
const colorPickerToggle = document.querySelector('.color-picker-toggle');
const colorPickerPanel = document.querySelector('.color-picker-panel');
const colorPicker = document.querySelector('#emphasisColorPicker');
const reloadOverlayBtn = document.querySelector('.reload-overlay');
const resetColorBtn = document.querySelector('.reset-color');
const defaultEmphasisColor = 'red';

// Toggle whether block is expanded or not
function toggleBlockExpanded(event, blockId) {
    event.preventDefault();
    const block = document.getElementById(blockId);
    if (!block) { return; }

    const isExpanded = block.classList.contains('expanded');
    if (isExpanded) {
        updateClass(block, 'expanded', false);
        updateClass(block, 'collapsed', true);
    } else {
        updateClass(block, 'expanded', true);
        updateClass(block, 'collapsed', false);
    }
}

function toggleBlockExpandedLevel1(event, blockId) {
    event.preventDefault();
    event.stopPropagation();
    const block = document.getElementById(blockId);
    if (!block) { return; }

    const isExpanded = block.classList.contains('expanded-multi-1');
    if (isExpanded) {
        updateClass(block, 'expanded-multi-1', false);
        updateClass(block, 'expanded-multi-2', false);
        updateClass(block, 'collapsed-multi', true);
    } else {
        updateClass(block, 'expanded-multi-1', true);
        updateClass(block, 'expanded-multi-2', false);
        updateClass(block, 'collapsed-multi', false);
    }
}

function toggleBlockExpandedLevel2(event, blockId) {
    event.preventDefault();
    event.stopPropagation();
    const block = document.getElementById(blockId);
    if (!block) { return; }

    const isExpanded = block.classList.contains('expanded-multi-2');
    if (isExpanded) {
        updateClass(block, 'expanded-multi-1', false);
        updateClass(block, 'expanded-multi-2', false);
        updateClass(block, 'collapsed-multi', true);
    } else {
        updateClass(block, 'expanded-multi-1', false);
        updateClass(block, 'expanded-multi-2', true);
        updateClass(block, 'collapsed-multi', false);
    }
}

function animateSlideInFade() {
    const blocks = document.querySelectorAll('.block');
    const skeletons = document.querySelector('.skeletons');
    let skeletonsInterval;
    let blocksInterval;

    function animateBlocks(index = 0) {
        if (index >= blocks.length) return;
        
        updateClass(blocks[index], 'animate', true);
        
        blocksInterval = setTimeout(() => {
            animateBlocks(index + 1);
        }, 200);
    }

    function resetSkeletons() {
        updateClass(skeletons, 'fade-out', false);
        skeletons.style.display = '';
    }

    function resetBlocks() {
        blocks.forEach((block) => {
            updateClass(block, 'animate', false);
        });
    }

    function showContent() {
        animateBlocks();
        updateClass(skeletons, 'fade-out', true);
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
        applyOptionsButton.parentElement.querySelectorAll('.config-input').forEach((panelInput) => {
            const cssVar = panelInput.getAttribute('data-css-var');
            const value = panelInput?.value;
            const suffix = panelInput?.getAttribute('data-suffix');
            if (cssVar && value && suffix) {
                updateCssVariable(cssVar, `${value}${suffix}`);
            }
        });
        
        reloadContent();
    });

    document.querySelector('.reset-options').addEventListener('click', () => {
        for (const variable in defaultAnimationValues) {
            if (defaultAnimationValues.hasOwnProperty(variable)) {
                const input = document.querySelector(`input[data-key="${variable}"]`);
                input.value = parseFloat(defaultAnimationValues[variable], 10);
                updateCssVariable(variable, defaultAnimationValues[variable]);
            }
        }
        reloadContent();
    });
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

    updateClass(body, `load-animation__${getLoadAnimationType()}`, true); 

    switch (getLoadAnimationType()) {
        case 'reveal-on-scroll':
            // todo
            break;
        case 'slide-in-fade':
            updateClass(reloadOverlayBtn, 'hide', false);
            animateSlideInFade();
            break;
    }
});

// Toggle color picker panel
popupToggle.forEach((popup) => {
    popup.addEventListener('click', () => {
        const popupPanel = popup.nextElementSibling;
        popupPanel.classList.toggle('active');
    });
})

// Update color when picker changes
colorPicker?.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--emphasis', e.target.value);
});

// Reset color to default
resetColorBtn?.addEventListener('click', () => {
    document.documentElement.style.setProperty('--emphasis', defaultEmphasisColor);
    colorPicker.value = defaultEmphasisColor;
});

// Close color picker panel when clicking outside
document.addEventListener('click', (e) => {
    if (colorPickerToggle && colorPickerPanel && !colorPickerToggle.contains(e.target) && !colorPickerPanel.contains(e.target)) {
        updateClass(colorPickerPanel, 'active', false);
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
document.querySelector('.close-cart')?.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling to cart panel
    toggleCart();
});

// Prevent clicks inside cart panel from closing it
document.querySelector('.cart-panel')?.addEventListener('click', (e) => {
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
        categoryButtons.forEach(btn => updateClass(btn, 'active', false));
        updateClass(btn, 'active', true);
        
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
        updateClass(sheet, 'visible', false);
        setTimeout(() => {
            sheet.style.display = 'none';
        }, 300); // Match this with your CSS transition duration
    } else {
        // Opening animation
        sheet.style.display = 'flex';
        setTimeout(() => {
            updateClass(sheet, 'visible', true);
        }, 10);
    }
}

const phoneInput = document.getElementById('phoneNumber');
phoneInput?.addEventListener('input', (e) => {
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