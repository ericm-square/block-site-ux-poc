import { newE2EPage } from "@stencil/core/testing";
describe('market-row: accessibility', () => {
    describe('interactive row', () => {
        let page;
        let row;
        let parent;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <div class="parent">
          <market-row interactive>Apple</market-row>
        </div>
      `);
            row = await page.find('market-row');
            parent = await page.find('.parent');
        });
        it('should pass render aria defaults', async () => {
            const el = await page.find('market-row');
            const container = await el.shadowRoot.querySelector('.container');
            expect(el).not.toHaveAttribute('aria-selected');
            expect(el).toEqualAttribute('role', null);
            expect(container).toEqualAttribute('role', null);
        });
        it('can be tabbed in to', async () => {
            await parent.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(row);
        });
        it('can be tabbed out of', async () => {
            await row.focus();
            expect(await page.find(':focus')).toEqual(row);
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(row);
        });
        it('hitting enter selects the focused row', async () => {
            await row.focus();
            expect(await page.find(':focus')).toEqual(row);
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(row).toHaveAttribute('selected');
        });
        it('hitting space selects the focused row', async () => {
            await row.focus();
            expect(await page.find(':focus')).toEqual(row);
            await page.keyboard.press(' ');
            await page.waitForChanges();
            expect(row).toHaveAttribute('selected');
        });
        it('tabs directly into slotted control if there is one', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <div class="parent">
          <market-row interactive>
            <label slot="label">Apple</label>
            <market-checkbox slot="control"></market-checkbox>
          </market-row>
        </div>
      `);
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(await page.find('market-checkbox'));
        });
    });
    it('renders correctly when passed an `href` prop', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <market-row interactive href="http://chillestmonkey.com" target="_blank">Monkey</market-row>
      `);
        const row = await page.find('market-row');
        const container = await row.shadowRoot.querySelector('.container');
        expect((await container).tagName).toEqual('A');
        expect(container).toEqualAttribute('href', 'http://chillestmonkey.com');
        expect(container).toEqualAttribute('target', '_blank');
    });
    it('sets aria-selected when role is option', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-row interactive role="option" selected>Apple</market-row>');
        const el = await page.find('market-row');
        expect(el).toEqualAttribute('aria-selected', 'true');
        el.setProperty('selected', null);
        await page.waitForChanges();
        expect(el).toEqualAttribute('aria-selected', 'false');
    });
    it('sets the container role to button with an interactive transient row without href', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-row interactive transient>Apple</market-row>');
        const el = await page.find('market-row');
        const container = await el.shadowRoot.querySelector('.container');
        expect(el).toEqualAttribute('role', null);
        expect(container).toEqualAttribute('role', 'button');
    });
});
//# sourceMappingURL=market-row.a11y.e2e.js.map
