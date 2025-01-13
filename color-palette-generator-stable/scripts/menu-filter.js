// Menu filtering functionality
export class MenuFilter {
    constructor() {
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.categoryButtons?.forEach(button => {
            button.addEventListener('click', (e) => this.handleCategoryChange(e));
        });
    }

    handleCategoryChange(e) {
        // Update active button
        this.categoryButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter menu items
        const category = e.target.dataset.category;
        this.menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category.includes(category)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}