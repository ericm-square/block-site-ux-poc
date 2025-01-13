export class BottomSheet {
    constructor() {
        this.bottomSheet = document.querySelector('.bottom-sheet');
        this.closeBtn = document.querySelector('.close-sheet');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close button click
        this.closeBtn?.addEventListener('click', () => this.close());

        // Close on click outside
        this.bottomSheet?.addEventListener('click', (e) => {
            if (e.target === this.bottomSheet) {
                this.close();
            }
        });

        // Prevent clicks inside content from closing
        this.bottomSheet?.querySelector('.bottom-sheet-content')?.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    open() {
        this.bottomSheet.style.display = 'flex';
        // Force reflow
        this.bottomSheet.offsetHeight;
        this.bottomSheet.classList.add('visible');
    }

    close() {
        this.bottomSheet.classList.remove('visible');
        // Wait for animation to finish
        setTimeout(() => {
            this.bottomSheet.style.display = 'none';
        }, 500);
    }
}