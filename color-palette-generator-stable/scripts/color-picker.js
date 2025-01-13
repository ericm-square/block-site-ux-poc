// Color picker functionality
export class ColorPicker {
    constructor() {
        this.colorPicker = document.querySelector('#baseColor');
        this.colorHex = document.querySelector('#colorHex');
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.colorPicker) {
            this.colorPicker.addEventListener('input', (e) => this.handleColorChange(e));
            this.colorPicker.addEventListener('change', (e) => this.handleColorChange(e));
        }

        if (this.colorHex) {
            this.colorHex.addEventListener('input', (e) => this.handleHexInput(e));
            this.colorHex.addEventListener('change', (e) => this.handleHexChange(e));
        }
    }

    handleColorChange(e) {
        const color = e.target.value;
        document.documentElement.style.setProperty('--emphasis', color);
        if (this.colorHex) {
            this.colorHex.value = color;
        }
    }

    handleHexInput(e) {
        let hex = e.target.value;
        if (hex.length === 7 && hex.match(/^#[0-9A-Fa-f]{6}$/)) {
            document.documentElement.style.setProperty('--emphasis', hex);
            if (this.colorPicker) {
                this.colorPicker.value = hex;
            }
        }
    }

    handleHexChange(e) {
        let hex = e.target.value;
        if (!hex.startsWith('#')) {
            hex = '#' + hex;
        }
        if (hex.match(/^#[0-9A-Fa-f]{6}$/)) {
            document.documentElement.style.setProperty('--emphasis', hex);
            if (this.colorPicker) {
                this.colorPicker.value = hex;
            }
        }
    }
}