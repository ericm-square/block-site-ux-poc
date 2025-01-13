// Device preview functionality
export class DevicePreview {
    constructor() {
        this.deviceFrame = document.querySelector('.device-frame');
        this.segmentButtons = document.querySelectorAll('.device-preview-card .segment-button');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.segmentButtons?.forEach(button => {
            button.addEventListener('click', (e) => this.handleModeChange(e));
        });
    }

    handleModeChange(e) {
        const mode = e.target.dataset.mode;
        
        // Update active button
        this.segmentButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Update device frame class
        this.deviceFrame.classList.remove('mobile', 'responsive');
        this.deviceFrame.classList.add(mode);
    }
}