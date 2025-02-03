import { newE2EPage } from "@stencil/core/testing";
describe('market-tile', () => {
    it('should render with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tile></market-tile>');
        const el = await page.find('market-tile');
        expect(el).not.toBeNull();
        expect(el).not.toHaveAttribute('disabled');
        expect(el).toEqualAttribute('aria-selected', false);
    });
    it('should not emit event when disabled', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tile disabled></market-tile>');
        const el = await page.find('market-tile');
        expect(el).toHaveAttribute('disabled');
        const tileSelected = await page.spyOnEvent('marketTileSelectedChanged');
        await el.click();
        await page.waitForChanges();
        expect(tileSelected).not.toHaveReceivedEvent();
    });
    it('should not emit events or select when not interactive', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tile></market-tile>');
        const el = await page.find('market-tile');
        const tileSelectedSpy = await page.spyOnEvent('marketTileSelectedChanged');
        await el.click();
        await page.waitForChanges();
        expect(tileSelectedSpy).not.toHaveReceivedEvent();
    });
    it('should have selected attr when selected', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tile interactive></market-tile>');
        const el = await page.find('market-tile');
        expect(el).toEqualAttribute('aria-selected', false);
        await el.click();
        await page.waitForChanges();
        expect(el).toEqualAttribute('aria-selected', true);
    });
    it('should emit selection event on selection and deselection', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tile interactive value="test-value"></market-tile>');
        const el = await page.find('market-tile');
        const tileSelectedSpy = await page.spyOnEvent('marketTileSelectedChanged');
        await el.click();
        await page.waitForChanges();
        expect(tileSelectedSpy).toHaveReceivedEventTimes(1);
        expect(tileSelectedSpy).toHaveNthReceivedEventDetail(0, {
            selected: true,
            value: 'test-value',
        });
        await el.click();
        await page.waitForChanges();
        expect(tileSelectedSpy).toHaveReceivedEventTimes(2);
        expect(tileSelectedSpy).toHaveNthReceivedEventDetail(1, {
            selected: false,
            value: 'test-value',
        });
    });
    describe('no slotted actions', () => {
        it('should render default remove action and emit click event', async () => {
            const page = await newE2EPage();
            await page.setContent(`<market-tile show-actions interactive></market-tile>`);
            const removeButton = await page.find('pierce/.remove-button');
            const removeClickedSpy = await page.spyOnEvent('marketTileRemoveClicked');
            await removeButton.click();
            expect(removeClickedSpy).toHaveReceivedEvent();
        });
    });
    describe('label slot line clamp logic', () => {
        it('should clamp to 2 lines when size="medium" and hint slot not present', async () => {
            const page = await newE2EPage();
            await page.setContent(`
      <market-tile size="medium">
        <span slot="label">Sodium</span>
        <span slot="subtext">22.99</span>
      </market-tile>
      `);
            const labelEl = await page.find('[slot="label"]');
            const labelElStyle = await labelEl.getComputedStyle();
            expect(labelElStyle.webkitLineClamp).toEqual('2');
        });
        it('should clamp to 1 line when size="small"', async () => {
            const page = await newE2EPage();
            await page.setContent(`
      <market-tile size="small">
        <span slot="label">Sodium</span>
        <span slot="subtext">22.99</span>
      </market-tile>
      `);
            const labelEl = await page.find('[slot="label"]');
            const labelElStyle = await labelEl.getComputedStyle();
            expect(labelElStyle.webkitLineClamp).toEqual('1');
        });
        it('should clamp to 1 line when hint slot is present', async () => {
            const page = await newE2EPage();
            await page.setContent(`
      <market-tile size="medium">
        <span slot="hint">Na</span>
        <span slot="label">Sodium</span>
        <span slot="subtext">22.99</span>
      </market-tile>
      `);
            const labelEl = await page.find('[slot="label"]');
            const labelElStyle = await labelEl.getComputedStyle();
            expect(labelElStyle.webkitLineClamp).toEqual('1');
        });
    });
    describe('size="small"', () => {
        it('should not render hint label', async () => {
            const page = await newE2EPage();
            await page.setContent(`
      <market-tile size="small">
        <span slot="indicator">11</span>
        <span slot="hint">Na</span>
        <span slot="label">Sodium</span>
        <span slot="subtext">22.99</span>
      </market-tile>
      `);
            const tile = await page.find('market-tile');
            const hintEl = tile.shadowRoot.querySelector('[name="hint"]');
            expect(hintEl).toBeNull();
        });
    });
    describe('accessibility', () => {
        let page;
        let tile;
        let container;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <div class="container">
          <market-tile interactive></market-tile>
        </div>
      `);
            tile = await page.find('market-tile');
            container = await page.find('.container');
        });
        it('can be tabbed into and out of', async () => {
            await container.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(tile);
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(tile);
        });
        it('can be selected with Space', async () => {
            await tile.focus();
            const tileSelectedSpy = await page.spyOnEvent('marketTileSelectedChanged');
            await page.keyboard.press('Space');
            await page.waitForChanges();
            expect(tile).toEqualAttribute('aria-selected', true);
            expect(tileSelectedSpy).toHaveReceivedEventTimes(1);
            expect(tileSelectedSpy.lastEvent.detail.selected).toEqual(true);
        });
        it('can be selected with Enter', async () => {
            await tile.focus();
            const tileSelectedSpy = await page.spyOnEvent('marketTileSelectedChanged');
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(tile).toEqualAttribute('aria-selected', true);
            expect(tileSelectedSpy).toHaveReceivedEventTimes(1);
            expect(tileSelectedSpy.lastEvent.detail.selected).toEqual(true);
        });
        it('cannot be tabbed into when interactive=false', async () => {
            tile.setProperty('interactive', false);
            await container.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(tile);
        });
        it('cannot be tabbed into when disabled', async () => {
            tile.setProperty('disabled', true);
            await container.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(tile);
        });
        it('default remove button should be tabbable', async () => {
            tile.setProperty('showActions', true);
            const actionClickedSpy = await page.spyOnEvent('marketTileRemoveClicked');
            await container.focus();
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.up('Enter');
            await page.waitForChanges();
            expect(actionClickedSpy).toHaveReceivedEvent();
        });
    });
});
//# sourceMappingURL=market-tile.e2e.js.map
