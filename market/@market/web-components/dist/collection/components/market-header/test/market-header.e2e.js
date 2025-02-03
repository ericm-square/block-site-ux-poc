import { newE2EPage } from "@stencil/core/testing";
describe('market-header', () => {
    let page;
    let el;
    it('can disable close button', async () => {
        page = await newE2EPage();
        await page.setContent('<market-header show-navigation disable-close-button></market-header>');
        el = await page.find('market-header');
        const closeX = await el.find('pierce/market-button[aria-label="Close"]');
        expect(closeX).toHaveAttribute('disabled');
    });
    it('emits an event when the close button is clicked', async () => {
        page = await newE2EPage();
        await page.setContent('<market-header show-navigation></market-header>');
        el = await page.find('market-header');
        const closeX = await el.find('pierce/market-button[aria-label="Close"]');
        const navSpy = await el.spyOnEvent('marketHeaderNavigate');
        await closeX.click();
        await page.waitForChanges();
        expect(navSpy).toHaveReceivedEventTimes(1);
        expect(navSpy.lastEvent.detail.action).toBe('close');
    });
    it('hides the actions menu', async () => {
        page = await newE2EPage();
        await page.setContent('<market-header></market-header>');
        el = await page.find('market-header');
        expect(el).not.toHaveAttribute('show-actions');
    });
    describe('with slotted navigation', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-header><button slot="navigation">Click me</button></market-header>');
            el = await page.find('market-header');
            await page.waitForChanges();
        });
        it('emits an event when the navigation button is clicked', async () => {
            const navButton = await el.find('[slot="navigation"]');
            const navSpy = await el.spyOnEvent('marketHeaderNavigate');
            await navButton.click();
            await page.waitForChanges();
            expect(navSpy).toHaveReceivedEventTimes(1);
            expect(navSpy.lastEvent.detail.action).toBe('custom');
        });
    });
    describe('with slotted actions', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-header><button slot="actions">Click me</button></market-header>');
            el = await page.find('market-header');
            await page.waitForChanges();
        });
        it('shows the actions menu', () => {
            expect(el).toHaveAttribute('show-actions');
        });
    });
    describe('with slotted heading and wayfinding elements', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-header><small slot="wayfinding">Step 1 of 2</small><h2>A heading</h2></market-header>');
            el = await page.find('market-header');
            await page.waitForChanges();
        });
        it('clones the slotted content into the compact slot', async () => {
            const clonedHeading = await el.find('h2[slot="compact"]');
            expect(clonedHeading.textContent).toBe('A heading');
            const clonedWayfinding = await el.find('.wayfinding[slot="compact"]');
            expect(clonedWayfinding.textContent).toBe('Step 1 of 2');
        });
        describe('when the slotted content changes via JS', () => {
            beforeEach(async () => {
                el.innerHTML = '<small slot="wayfinding">Step 2 of 2</small><h2>A different heading</h2>';
                await page.waitForChanges();
            });
            it('reclones the slotted content into the compact slot', async () => {
                const clonedHeading = await el.find('h2[slot="compact"]');
                expect(clonedHeading.textContent).toBe('A different heading');
                const clonedWayfinding = await el.find('.wayfinding[slot="compact"]');
                expect(clonedWayfinding.textContent).toBe('Step 2 of 2');
            });
        });
    });
    describe('when navigation is present', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-header show-navigation><small slot="wayfinding">Step 1 of 2</small><h2>A heading</h2></market-header>');
            el = await page.find('market-header');
        });
        it('reduces the height of the header in compact mode', async () => {
            // get the default non-compact height
            let headerStyle = await el.getComputedStyle();
            const defaultHeight = Number.parseInt(headerStyle.getPropertyValue('height'), 10);
            // get the compact height
            el.setAttribute('compact', true);
            await page.waitForChanges();
            headerStyle = await el.getComputedStyle();
            const compactHeight = Number.parseInt(headerStyle.getPropertyValue('height'), 10);
            // compact should be shorter
            expect(compactHeight).toBeLessThan(defaultHeight);
        });
    });
});
//# sourceMappingURL=market-header.e2e.js.map
