import { ColorPicker } from './color-picker.js';
import { Cart } from './cart.js';
import { BottomSheet } from './bottom-sheet.js';
import { DevicePreview } from './device-preview.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const colorPicker = new ColorPicker();
    const cart = new Cart();
    const bottomSheet = new BottomSheet();
    const devicePreview = new DevicePreview();
});