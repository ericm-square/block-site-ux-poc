// Color Picker
const popupToggle = document.querySelectorAll('.popup-toggle');
const colorPickerToggle = document.querySelector('.color-picker-toggle');
const colorPickerPanel = document.querySelector('.color-picker-panel');
const colorPicker = document.querySelector('#emphasisColorPicker');
const reloadOverlayBtn = document.querySelector('.reload-overlay');
const resetColorBtn = document.querySelector('.reset-color');
const defaultEmphasisColor = 'red';
let outerSwiper;
let businessCardsSwiper;
let isBusinessCardsSwiperVisible = false;
let shouldLockScrolling = false;
const businessCardBlock = document.querySelector('.business-card-block');

function expandFullScreen(event, blockId) {
    // event.preventDefault();
    const block = document.getElementById(blockId);
    if (!block) { return; }
    const isFullHeight = block.classList.contains('full-height');

    // Scroll so this block is at the top of the screen...
    if (!isFullHeight) {
        block.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    if (isFullHeight) {
        updateClass(block, 'full-height', false);
    } else {
        updateClass(block, 'full-height', true);
    }   
}

// Toggle whether block is expanded or not
function toggleBlockExpanded(event, blockId) {
    event.preventDefault();
    const block = document.getElementById(blockId);
    if (!block) { return; }
    const isExpanded = block.classList.contains('expanded');

    // Scroll so this block is at the top of the screen...
    if (!isExpanded) {
        block.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

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


// GIFT CARDS
function onGiftCardsNextClick(e, idBlockToExpand, idAdditionalContent, idNextButton, onlyFullScreen) {
    const blockGiftCards = document.getElementById(idBlockToExpand);

    // Scroll the block into view...
    blockGiftCards.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

    // Increase height...
    updateClass(blockGiftCards, 'expanded', true);
    updateClass(blockGiftCards, 'collapsed', false);

    // If "onlyFullScreen", it means we want the block to only take up 100% of the screen (and not go beyond it)....
    if (onlyFullScreen) {
        blockGiftCards.style.height = '99vh';
        blockGiftCards.style['overflow-y'] = 'scroll';
    }

    // Hide next button...
    const nextButton = document.getElementById(idNextButton);
    updateClass(nextButton, 'hide', true);

    // Show gift card additional content...
    const giftCardAdditionalContent = document.getElementById(idAdditionalContent);
    updateClass(giftCardAdditionalContent, 'hide', false);
}

function animateRevealOnScroll(type = 'fade-in') {
    const sr = ScrollReveal();

    switch (type) {
        case 'rotate':
            sr.reveal('.reveal-block', {
                opacity: [0, 1],
                rotate: {
                    x: 20,
                    z: 20
                },
                duration: 500,    
                interval: 200,
                reset: true,
                easing: 'ease-in-out',  
                viewFactor: 0.2,
            });
            break;
        case 'scale':
            sr.reveal('.reveal-block', {
                opacity: [0, 1],
                scale: 0.85,
                duration: 500, 
                interval: 200,
                delay: 0,
                reset: true,
                easing: 'ease-in-out',  
                viewFactor: 0.2,
            });
            break;
        case 'fade-in':
            sr.reveal('.reveal-block', {
                duration: 500,         // reveal animation
                delay: 200,             // 200ms delay between each reveal
                opacity: [0.2, 1],        // Fade in from 0 (invisible) to 1 (visible)
                reset: true,            // Reset the animation on scroll back
                easing: 'ease-in-out',  // Smooth easing for the opacity transition
                viewFactor: 0.2,        // Trigger the reveal when 20% of the element is visible
            });
    }
}

function animateSwipeOnScroll() {
    updateClass(document.querySelector('.blocks-wrapper'), 'swiper-container');
    updateClass(document.querySelector('.blocks-wrapper .blocks'), 'swiper-wrapper');
    const blocks = document.querySelectorAll('.reveal-block');
    const blocksInner = document.querySelectorAll('.reveal-block .inner-content');
    blocks.forEach((block) => {
        updateClass(block, 'swiper-slide');
    });

    outerSwiper = new Swiper('.swiper-container', {
        loop: false,              // Enable looping of blocks
        slidesPerView: 1,        // Show 1 block at a time
        spaceBetween: 30,        // Space between blocks (added gap)
        centeredSlides: true,    // Center the active block
        grabCursor: true,        // Enable grab cursor on touch devices
        mousewheel: {            // Enable mouse wheel scroll navigation
          invert: false,         // Scroll direction (false: down -> next, true: down -> prev)
          forceToAxis: true,     // Force scrolling to work only in one direction (vertical or horizontal)
        },
        effect: 'slide', // fade or slide
        slideToClickedSlide: false,  // Disable click-to-slide functionality
        breakpoints: {           // Responsive settings
          768: {
            slidesPerView: 1,    // Show 1 block on smaller screens
          },
        },
        simulateTouch: true,   // Allow touch (drag/swipe)
        allowTouchMove: true,  // Allow slide dragging,
        on: {
            touchStart: function (e) {
                const currentSlide = this.slides[this.activeIndex];
                const hasGiftCards = currentSlide.closest('#block-gift-cards');
                if (hasGiftCards) {
                    const isGiftCardsScaledUp = currentSlide.classList.contains('scale-up');
                    this.allowTouchMove = !isGiftCardsScaledUp;
                }
            },
            touchMove: function (e) {
            // console.log('Dragging:', outerSwiper.realIndex);
            },
            touchEnd: function (e) {
            },
            slideChange: function () {
            // console.log('Slide changed to index:', outerSwiper.realIndex);
            },
        },
      });

      // Scroll to swipe functionality
    let isScrolling = false;
    let scrollTimeout;
    
    let atBottomAttempt = 0;
    const giftCardsBlock = document.querySelector('#block-gift-cards');

    document.addEventListener('click', (event) => {
        const isGiftCardsBlock = event.target.closest('#block-gift-cards');
        shouldLockScrolling = isGiftCardsBlock;

        updateClass(giftCardsBlock, 'scale-up', isGiftCardsBlock);
        updateClass(document.body, 'vertical-scroll', isGiftCardsBlock);
        updateClass(document.body, 'is-current-block-scaled-up', isGiftCardsBlock);

        if (isGiftCardsBlock) {
            outerSwiper.update();
        }
    });

    document.querySelector('.swiper-container').addEventListener('wheel', function (event) {
        if (shouldLockScrolling) {
            return;
        }
        // if (isBusinessCardsSwiperVisible) {
        //     return;
        // }
      if (isScrolling) return;  // Prevent multiple triggers
      isScrolling = true;

      // Cancel the previous timeout if any
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (event.deltaY > 0) {
        outerSwiper.slideNext();  // Scroll down -> Next slide
      } else {
        outerSwiper.slidePrev();  // Scroll up -> Previous slide
      }

      // Reset the scrolling lock after a short delay to allow the animation to finish
      scrollTimeout = setTimeout(function() {
        isScrolling = false;
      }, 100);  // Adjust the timeout duration to match Swiper's transition speed
    });

}

function animateStackingCards() {
    // todo
}

function animateExpanded() {
    window.scrollTo(0, 0);
    const width = window.innerHeight - document.querySelector('header').clientHeight + 10;
    businessCardBlock.style.height = `${width}px`;

    setTimeout(() => {
        const duration = '0.8s';
        document.querySelector('header').style.transition = `height ${duration} ease`;
        document.querySelector('.business-avatar').style.transition = `left ${duration} ease, bottom ${duration} ease,  width ${duration} ease, height ${duration} ease`;
        document.querySelector('.business-hero').style.transition = `height ${duration} ease`;
        updateClass(document.body, 'initial', false);
        businessCardBlock.style.height = '';
        document.querySelector('header').style.height = '40px';
    }, 500);
}

function toggleCarousel() {
    const carouselBefore = document.querySelector('.carousel-before');
    const carouselAfter = document.querySelector('.carousel-after');
    let timeout = null;
    let scrollTimeout = null;
    let lastScrollY = window.scrollY;
    let shouldCloseCarousel = false;

    carouselBefore.addEventListener('click', function() {
        clearTimeout(timeout);
        updateClass(businessCardBlock, 'open', true);
        updateClass(carouselAfter, 'hide', false);
        timeout = setTimeout(() => {
            updateClass(this, 'scale-down-fade', true);
            updateClass(carouselAfter, 'scale-down-fade', false);
            setTimeout(() => {
                updateClass(this, 'hide', true);
            }, 500);
        }, 200);
        shouldCloseCarousel = true;
        isBusinessCardsSwiperVisible = true;
    });

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        const isScrollingAway = scrollDifference >= 150;

        if (shouldCloseCarousel && isScrollingAway) {
            lastScrollY = currentScrollY;
            shouldCloseCarousel = false;
            isBusinessCardsSwiperVisible = false;
            clearTimeout(timeout);
            clearTimeout(scrollTimeout);
            clearTimeout(wheelTimeout);
            updateClass(businessCardBlock, 'open', false);
            updateClass(carouselBefore, 'hide', false);
            scrollTimeout = setTimeout(() => {
                updateClass(carouselAfter, 'scale-down-fade', true);
                updateClass(carouselBefore, 'scale-down-fade', false);

                setTimeout(() => {
                    updateClass(carouselAfter, 'hide', true);
                }, 500);
            }, 200);
        }
    });

    let wheelTimeout;

    function resetCarousel() {
        shouldCloseCarousel = false;
        isBusinessCardsSwiperVisible = false;
        clearTimeout(timeout);
        clearTimeout(scrollTimeout);
        clearTimeout(wheelTimeout);
        updateClass(businessCardBlock, 'open', false);
        updateClass(carouselBefore, 'hide', false);
        wheelTimeout = setTimeout(() => {
            updateClass(carouselAfter, 'scale-down-fade', true);
            updateClass(carouselBefore, 'scale-down-fade', false);

            setTimeout(() => {
                updateClass(carouselAfter, 'hide', true);
            }, 500);
        }, 200);
    }

    document.querySelector('.business-cards-swiper-container').addEventListener('wheel', function () {
        resetCarousel();
    });

    if (outerSwiper) {
        outerSwiper.on('slideChange', function() {
            resetCarousel();
          });
    }
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

    const swiperOptions = {
        loop: true,              // Enable looping of slides
        slidesPerView: 1,        // Show 1 slide at a time
        spaceBetween: 20,        // Space between slides
        centeredSlides: true,    // Center the active slide
        grabCursor: true,        // Enable grab cursor on touch devices
        slideToClickedSlide: true, // Enable click-to-slide functionality
        pagination: {            // Pagination (optional, dots)
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {           // Responsive settings
          768: {
            slidesPerView: 1,    // Show 1 slide on smaller screens
          },
        },
    };
    if (getLoadAnimationType() === 'swipe-on-scroll') {
        swiperOptions.direction = 'vertical';
    }
    businessCardsSwiper = new Swiper('.business-cards-swiper-container', swiperOptions);

    switch (getLoadAnimationType()) {
        case 'reveal-on-scroll-fade-in':
            animateRevealOnScroll('fade-in');
            break;
        case 'reveal-on-scroll-rotate':
            animateRevealOnScroll('rotate');
            break;
        case 'reveal-on-scroll-scale':
            animateRevealOnScroll('scale');
            break;
        case 'swipe-on-scroll':
            animateSwipeOnScroll();
            break;
        case 'stacking-cards':
            animateStackingCards();
            break;
        case 'expanded':
            animateExpanded();
            break;
        case 'slide-in-fade':
            updateClass(reloadOverlayBtn, 'hide', false);
            animateSlideInFade();
            break;
    }

    toggleCarousel();
    
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Toggle through "Business Name" and other content...
document.addEventListener("DOMContentLoaded", () => {
    const textOptions = ["Business name", "Waitlist (2)"];
    const text1 = document.getElementById('business-name');
    const openMarker = document.getElementById('open-marker');

    setInterval(async () => {
        const text = text1.textContent.trim();
        const isBusinessName = text === textOptions[0];

        // Fade out text1...
        updateClass(text1, 'fade-in', false);
        updateClass(text1, 'fade-out', true);
        if (isBusinessName) { updateClass(openMarker, 'fade-out', true); updateClass(openMarker, 'fade-in', false); }

        // Hold for 1 seconds...
        await delay(1_000);

        // Swap the text...
        text1.textContent = (isBusinessName) ? textOptions[1] : textOptions[0];

        // Fade in text1...
        updateClass(text1, 'fade-out', false);
        updateClass(text1, 'fade-in', true);
        if (!isBusinessName) { updateClass(openMarker, 'fade-out', false); updateClass(openMarker, 'fade-in', true); }
    }, 4_000);
    
});

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
        updateClass(button, 'active', true);
        
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