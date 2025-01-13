// Color conversion utilities
function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: h * 360,
        s: s * 100,
        l: l * 100
    };
}

function hslToRGB(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4))
    };
}

function rgbToHex(r, g, b) {
    const toHex = n => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
}

// Generate emphasis colors based on the base color
function generateEmphasisColors(baseColor) {
    const rgb = hexToRGB(baseColor);
    const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
    
    return {
        'emphasis-fill': baseColor,
        'emphasis-text': adjustColor(hsl, 5, -35),
        'emphasis-10': adjustColor(hsl, 10, -45),
        'emphasis-20': adjustColor(hsl, 5, -25),
        'emphasis-30': adjustColor(hsl, -5, 25),
        'emphasis-40': adjustColor(hsl, -10, 45)
    };
}

// Generate a color with adjusted HSL values
function adjustColor(hsl, saturationAdjust, lightnessAdjust) {
    let newSaturation = Math.max(0, Math.min(100, hsl.s + saturationAdjust));
    let newLightness = Math.max(0, Math.min(100, hsl.l + lightnessAdjust));
    
    const rgb = hslToRGB(hsl.h, newSaturation, newLightness);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// Color blending function
function blendColors(color1, color2, ratio) {
    const rgb1 = hexToRGB(color1);
    const rgb2 = hexToRGB(color2);
    
    return rgbToHex(
        Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio),
        Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio),
        Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio)
    );
}

// Generate status colors using color blending
function generateStatusColorsBlend(baseColor) {
    return {
        'success-fill': blendColors('#22C55E', baseColor, 0.2),
        'success-text': blendColors('#166534', baseColor, 0.2),
        'success-10': blendColors('#14532D', baseColor, 0.2),
        'success-20': blendColors('#166534', baseColor, 0.2),
        'success-30': blendColors('#22C55E', baseColor, 0.2),
        'success-40': blendColors('#86EFAC', baseColor, 0.2),

        'warning-fill': blendColors('#EAB308', baseColor, 0.2),
        'warning-text': blendColors('#854D0E', baseColor, 0.2),
        'warning-10': blendColors('#713F12', baseColor, 0.2),
        'warning-20': blendColors('#854D0E', baseColor, 0.2),
        'warning-30': blendColors('#EAB308', baseColor, 0.2),
        'warning-40': blendColors('#FEF08A', baseColor, 0.2),

        'critical-fill': blendColors('#EF4444', baseColor, 0.2),
        'critical-text': blendColors('#991B1B', baseColor, 0.2),
        'critical-10': blendColors('#7F1D1D', baseColor, 0.2),
        'critical-20': blendColors('#991B1B', baseColor, 0.2),
        'critical-30': blendColors('#EF4444', baseColor, 0.2),
        'critical-40': blendColors('#FCA5A5', baseColor, 0.2)
    };
}

// Generate status colors using adaptive approach
function generateStatusColorsAdaptive(baseColor) {
    const rgb = hexToRGB(baseColor);
    const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
    const saturationFactor = hsl.s / 50;
    const lightnessFactor = hsl.l / 50;

    const generateColor = (hue, sat, light) => {
        return rgbToHex(
            ...Object.values(hslToRGB(
                hue,
                Math.min(100, sat * saturationFactor),
                Math.min(100, light * lightnessFactor)
            ))
        );
    };

    return {
        'success-fill': generateColor(142, 70, 45),
        'success-text': generateColor(142, 65, 25),
        'success-10': generateColor(142, 75, 20),
        'success-20': generateColor(142, 65, 25),
        'success-30': generateColor(142, 70, 45),
        'success-40': generateColor(142, 60, 75),

        'warning-fill': generateColor(45, 80, 50),
        'warning-text': generateColor(45, 75, 30),
        'warning-10': generateColor(45, 85, 25),
        'warning-20': generateColor(45, 75, 30),
        'warning-30': generateColor(45, 80, 50),
        'warning-40': generateColor(45, 70, 80),

        'critical-fill': generateColor(0, 90, 55),
        'critical-text': generateColor(0, 85, 35),
        'critical-10': generateColor(0, 95, 30),
        'critical-20': generateColor(0, 85, 35),
        'critical-30': generateColor(0, 90, 55),
        'critical-40': generateColor(0, 80, 85)
    };
}

// Update color boxes and their information
function updateColorBoxes(palette) {
    // Update all color boxes and their information
    document.querySelectorAll('.color-box').forEach(box => {
        const colorKey = box.getAttribute('data-color');
        if (colorKey && palette[colorKey]) {
            const color = palette[colorKey];
            
            // Update the box color
            box.style.backgroundColor = color;
            
            // Update the hex value display
            const hexDisplay = box.parentElement.querySelector('.swatch-hex');
            if (hexDisplay) {
                hexDisplay.textContent = color.toUpperCase();
            }
            
            // Set up click-to-copy
            box.onclick = () => {
                navigator.clipboard.writeText(color);
                box.style.outline = '2px solid white';
                setTimeout(() => box.style.outline = 'none', 200);
            };

            // If this is the emphasis-fill color, update the prototype
            if (colorKey === 'emphasis-fill') {
                const businessCard = document.getElementById('business-card');
                if (businessCard) {
                    businessCard.style.backgroundColor = color;
                }
            }
        }
    });

    // Update UI examples
    updateUIExamples(palette);
}

// Update UI examples with current colors
function updateUIExamples(palette) {
    // Update buttons
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        if (btn.disabled) {
            btn.style.backgroundColor = palette['emphasis-30'];
            btn.style.opacity = '0.5';
        } else if (btn.classList.contains('btn-hover')) {
            btn.style.backgroundColor = palette['emphasis-20'];
        } else if (btn.classList.contains('btn-focus')) {
            btn.style.backgroundColor = palette['emphasis-30'];
            btn.style.outline = `2px solid ${palette['emphasis-20']}`;
            btn.style.outlineOffset = '1px';
        } else {
            btn.style.backgroundColor = palette['emphasis-fill'];
        }
        btn.style.color = palette['text-white'];
    });

    // Update typography
    const headingLarge = document.querySelector('.heading-large');
    if (headingLarge) {
        headingLarge.style.color = palette['emphasis-text'];
    }

    const headingMedium = document.querySelector('.heading-medium');
    if (headingMedium) {
        headingMedium.style.color = palette['emphasis-20'];
    }

    const bodyText = document.querySelector('.body-text');
    if (bodyText) {
        bodyText.style.color = palette['text-20'];
    }

    const subtleText = document.querySelector('.subtle-text');
    if (subtleText) {
        subtleText.style.color = palette['text-30'];
    }

    // Update surfaces
    const primarySurface = document.querySelector('.surface-primary');
    if (primarySurface) {
        primarySurface.style.backgroundColor = palette['emphasis-fill'];
        primarySurface.style.color = palette['text-white'];
    }

    const secondarySurface = document.querySelector('.surface-secondary');
    if (secondarySurface) {
        secondarySurface.style.backgroundColor = palette['emphasis-20'];
        secondarySurface.style.color = palette['text-white'];
    }

    const lightSurface = document.querySelector('.surface-light');
    if (lightSurface) {
        lightSurface.style.backgroundColor = palette['surface-10'];
        lightSurface.style.color = palette['text-20'];
        lightSurface.style.borderColor = palette['emphasis-30'];
    }

    // Update form elements
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        if (input.classList.contains('input-hover')) {
            input.style.borderColor = palette['emphasis-20'];
        } else if (input.classList.contains('input-focus')) {
            input.style.borderColor = palette['emphasis-fill'];
            input.style.boxShadow = `0 0 0 1px ${palette['emphasis-fill']}`;
        } else {
            input.style.borderColor = palette['emphasis-30'];
        }
        input.style.color = palette['text-20'];
        input.style.backgroundColor = palette['surface-5'];
    });

    const checkbox = document.querySelector('.form-checkbox');
    if (checkbox) {
        checkbox.style.borderColor = palette['emphasis-30'];
        checkbox.style.backgroundColor = palette['surface-5'];
    }

    // Update food cards
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.style.backgroundColor = palette['surface-10'];
        
        const foodName = card.querySelector('.food-name');
        if (foodName) {
            foodName.style.color = palette['text-10'];
        }
        
        const foodDescription = card.querySelector('.food-description');
        if (foodDescription) {
            foodDescription.style.color = palette['text-30'];
        }
        
        const foodPrice = card.querySelector('.food-price');
        if (foodPrice) {
            foodPrice.style.color = palette['emphasis-fill'];
        }
    });

    // Update banners
    const bannerSuccess = document.querySelector('.banner-success');
    if (bannerSuccess) {
        bannerSuccess.style.backgroundColor = palette['success-fill'];
    }

    const bannerWarning = document.querySelector('.banner-warning');
    if (bannerWarning) {
        bannerWarning.style.backgroundColor = palette['warning-fill'];
    }

    const bannerCritical = document.querySelector('.banner-critical');
    if (bannerCritical) {
        bannerCritical.style.backgroundColor = palette['critical-fill'];
    }

    // Update business card
    const businessCard = document.querySelector('.business-card');
    if (businessCard) {
        businessCard.style.backgroundColor = palette['emphasis-fill'];
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const baseColorInput = document.getElementById('baseColor');
    const colorHexInput = document.getElementById('colorHex');
    let currentMode = 'blend';
    let previewMode = 'mobile';

    function updateColors() {
        const baseColor = baseColorInput.value;
        const emphasisColors = generateEmphasisColors(baseColor);
        const statusColors = currentMode === 'blend' 
            ? generateStatusColorsBlend(baseColor)
            : generateStatusColorsAdaptive(baseColor);

        const palette = {
            ...emphasisColors,
            ...statusColors,
            'text-10': '#000000',
            'text-20': '#1A1A1A',
            'text-30': '#333333',
            'text-inverse': '#FFFFFF',
            'text-black': '#000000',
            'text-white': '#FFFFFF',
            'fill-50': 'rgba(0, 0, 0, 0.1)',
            'fill-40': 'rgba(0, 0, 0, 0.2)',
            'fill-30': 'rgba(0, 0, 0, 0.3)',
            'fill-20': 'rgba(0, 0, 0, 0.4)',
            'fill-10': 'rgba(0, 0, 0, 0.5)',
            'fill-inverse': '#FFFFFF',
            'fill-black': '#000000',
            'fill-white': '#FFFFFF',
            'surface-5': '#000000',
            'surface-10': '#FFFFFF',
            'surface-20': '#FFFFFF',
            'surface-30': '#FFFFFF',
            'surface-overlay': 'rgba(0, 0, 0, 0.5)'
        };

        // Set CSS variables
        const root = document.documentElement;
        Object.entries(palette).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        updateColorBoxes(palette);
    }

    // Initial color generation
    updateColors();

    // Update on color picker change
    baseColorInput.addEventListener('input', (e) => {
        colorHexInput.value = e.target.value.toUpperCase();
        updateColors();
    });

    // Update on hex input change
    colorHexInput.addEventListener('input', (e) => {
        let newColor = e.target.value;
        if (!newColor.startsWith('#')) {
            newColor = '#' + newColor;
        }
        if (newColor.match(/^#[0-9A-Fa-f]{6}$/)) {
            baseColorInput.value = newColor;
            updateColors();
        }
    });

    // Handle color mode segmented control
    const colorModeSegments = document.querySelectorAll('.color-input .segment-button');
    colorModeSegments.forEach(button => {
        button.addEventListener('click', () => {
            colorModeSegments.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentMode = button.dataset.mode;
            updateColors();
        });
    });

    // Handle preview mode segmented control
    const previewModeSegments = document.querySelectorAll('.device-preview-card .segment-button');
    const deviceFrame = document.querySelector('.device-frame');
    
    // Set initial preview mode
    deviceFrame.classList.add('mobile');

    previewModeSegments.forEach(button => {
        button.addEventListener('click', () => {
            previewModeSegments.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const newMode = button.dataset.mode;
            
            // Update device frame class
            deviceFrame.classList.remove('mobile', 'responsive');
            deviceFrame.classList.add(newMode);
        });
    });
});