// Initialize components when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePrototype();
});

// Listen for color updates from the parent window
window.addEventListener('message', (event) => {
    if (event.data.type === 'updateEmphasisFill') {
        // Update the business card background color
        const businessCard = document.getElementById('business-card');
        if (businessCard) {
            businessCard.style.backgroundColor = event.data.color;
        }
    }
});

function initializePrototype() {
    // Initialize menu filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter menu items
            const category = button.dataset.category;
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category.includes(category)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize cart
    const cart = {
        items: new Map(),
        panel: document.querySelector('.cart-panel'),
        icon: document.querySelector('.cart'),
        closeBtn: document.querySelector('.close-cart'),
        itemsContainer: document.querySelector('.cart-items'),
        countElement: document.querySelector('.cart-count'),
        subtotalElement: document.querySelector('.subtotal-amount'),

        init() {
            this.icon.addEventListener('click', () => this.open());
            this.closeBtn.addEventListener('click', () => this.close());

            // Close cart when clicking outside
            document.addEventListener('click', (e) => {
                if (this.panel.classList.contains('open') && 
                    !this.panel.contains(e.target) && 
                    !this.icon.contains(e.target)) {
                    this.close();
                }
            });

            // Setup add to cart buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const menuItem = button.closest('.menu-item');
                    const item = {
                        id: menuItem.dataset.id || Math.random().toString(36).substr(2, 9),
                        name: menuItem.querySelector('.menu-item-title').textContent,
                        price: menuItem.querySelector('.menu-item-price').textContent,
                        image: menuItem.querySelector('img').src
                    };
                    this.addItem(item);

                    // Show feedback
                    button.classList.add('added');
                    setTimeout(() => button.classList.remove('added'), 1000);
                });
            });
        },

        open() {
            this.panel.style.transform = 'translateX(0)';
            this.panel.classList.add('open');
            document.body.style.overflow = 'hidden';
        },

        close() {
            this.panel.style.transform = 'translateX(100%)';
            this.panel.classList.remove('open');
            document.body.style.overflow = '';
        },

        addItem(item) {
            if (this.items.has(item.id)) {
                const existingItem = this.items.get(item.id);
                existingItem.quantity += 1;
                this.updateItemQuantity(item.id, existingItem.quantity);
            } else {
                this.items.set(item.id, { ...item, quantity: 1 });
                this.renderCartItem(item);
            }
            this.updateCartCount();
            this.updateSubtotal();
            
            // Show cart feedback
            this.icon.classList.add('bounce');
            setTimeout(() => this.icon.classList.remove('bounce'), 300);
        },

        removeItem(itemId) {
            const item = this.items.get(itemId);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    this.items.delete(itemId);
                    const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
                    if (itemElement) {
                        itemElement.remove();
                    }
                } else {
                    this.updateItemQuantity(itemId, item.quantity);
                }
                this.updateCartCount();
                this.updateSubtotal();
            }
        },

        updateItemQuantity(itemId, quantity) {
            const quantityElement = document.querySelector(`[data-item-id="${itemId}"] .quantity`);
            if (quantityElement) {
                quantityElement.textContent = quantity;
            }
        },

        renderCartItem(item) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.dataset.itemId = item.id;
            
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-controls">
                        <button class="decrease">−</button>
                        <span class="quantity">1</span>
                        <button class="increase">+</button>
                    </div>
                </div>
            `;

            // Add event listeners for increase/decrease buttons
            const increaseBtn = itemElement.querySelector('.increase');
            const decreaseBtn = itemElement.querySelector('.decrease');

            increaseBtn.addEventListener('click', () => this.addItem(item));
            decreaseBtn.addEventListener('click', () => this.removeItem(item.id));

            this.itemsContainer.appendChild(itemElement);
        },

        updateCartCount() {
            let totalItems = 0;
            this.items.forEach(item => {
                totalItems += item.quantity;
            });
            this.countElement.textContent = totalItems;
            
            // Update cart icon visibility
            if (totalItems > 0) {
                this.countElement.style.display = 'flex';
            } else {
                this.countElement.style.display = 'none';
            }
        },

        updateSubtotal() {
            let total = 0;
            this.items.forEach(item => {
                total += parseFloat(item.price.replace('$', '')) * item.quantity;
            });
            this.subtotalElement.textContent = `$${total.toFixed(2)}`;
        }
    };

    // Initialize bottom sheet
    const bottomSheet = {
        element: document.querySelector('.bottom-sheet'),
        content: document.querySelector('.bottom-sheet-content'),
        closeBtn: document.querySelector('.close-sheet'),

        init() {
            // Close button click
            this.closeBtn?.addEventListener('click', () => this.close());

            // Close on click outside
            this.element?.addEventListener('click', (e) => {
                if (e.target === this.element) {
                    this.close();
                }
            });

            // Prevent clicks inside content from closing
            this.content?.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // Setup check-in button
            document.querySelector('.check-in-button')?.addEventListener('click', () => this.open());
        },

        open() {
            this.element.style.display = 'flex';
            // Force reflow
            this.element.offsetHeight;
            this.element.classList.add('visible');
        },

        close() {
            this.element.classList.remove('visible');
            // Wait for animation to finish
            setTimeout(() => {
                this.element.style.display = 'none';
            }, 500);
        }
    };

    // Initialize components
    cart.init();
    bottomSheet.init();
}