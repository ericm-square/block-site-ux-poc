export class Cart {
    constructor() {
        this.cartPanel = document.querySelector('.cart-panel');
        this.cartIcon = document.querySelector('.cart');
        this.closeCartBtn = document.querySelector('.close-cart');
        this.cartCount = document.querySelector('.cart-count');
        this.cartItems = document.querySelector('.cart-items');
        this.subtotalElement = document.querySelector('.subtotal-amount');
        this.items = new Map();
        this.setupEventListeners();
        this.setupMenuItems();
    }

    setupEventListeners() {
        this.cartIcon?.addEventListener('click', () => this.openCart());
        this.closeCartBtn?.addEventListener('click', () => this.closeCart());

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (this.cartPanel?.classList.contains('open') && 
                !this.cartPanel.contains(e.target) && 
                !this.cartIcon.contains(e.target)) {
                this.closeCart();
            }
        });

        // Prevent clicks inside cart from closing it
        this.cartPanel?.addEventListener('click', (e) => e.stopPropagation());
    }

    setupMenuItems() {
        const addButtons = document.querySelectorAll('.add-to-cart');
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const menuItem = e.target.closest('.menu-item');
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
    }

    openCart() {
        this.cartPanel.style.transform = 'translateX(0)';
        this.cartPanel.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        this.cartPanel.style.transform = 'translateX(100%)';
        this.cartPanel.classList.remove('open');
        document.body.style.overflow = '';
    }

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
        this.cartIcon.classList.add('bounce');
        setTimeout(() => this.cartIcon.classList.remove('bounce'), 300);
    }

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
    }

    updateItemQuantity(itemId, quantity) {
        const quantityElement = document.querySelector(`[data-item-id="${itemId}"] .quantity`);
        if (quantityElement) {
            quantityElement.textContent = quantity;
        }
    }

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

        this.cartItems.appendChild(itemElement);
    }

    updateCartCount() {
        let totalItems = 0;
        this.items.forEach(item => {
            totalItems += item.quantity;
        });
        this.cartCount.textContent = totalItems;
        
        // Update cart icon visibility
        if (totalItems > 0) {
            this.cartCount.style.display = 'flex';
        } else {
            this.cartCount.style.display = 'none';
        }
    }

    updateSubtotal() {
        let total = 0;
        this.items.forEach(item => {
            total += parseFloat(item.price.replace('$', '')) * item.quantity;
        });
        this.subtotalElement.textContent = `$${total.toFixed(2)}`;
    }
}