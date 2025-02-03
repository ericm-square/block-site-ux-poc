import { newE2EPage } from "@stencil/core/testing";
describe('market-tab-list', () => {
    let page;
    let el;
    let tabEls;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-tab-list>
        <market-tab id="tab-1" aria-controls="panel-1" disabled>Tab 1</market-tab>
        <market-tab id="tab-2" aria-controls="panel-2">Tab 2</market-tab>
        <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
        <market-tab id="tab-4" aria-controls="panel-4" disabled>Tab 4</market-tab>
        <market-tab id="tab-5" aria-controls="panel-5">Tab 5</market-tab>
        <market-tab id="tab-6" aria-controls="panel-6" disabled>Tab 6</market-tab>
      </market-tab-list>
    `);
        el = await page.find('market-tab-list');
        tabEls = await el.findAll('market-tab');
    });
    it('renders', async () => {
        expect(el).toHaveClass('market-tab-list');
        expect(el).toEqualAttribute('role', 'tablist');
        expect(await tabEls[0].isVisible()).toStrictEqual(true);
        expect(await tabEls[1].isVisible()).toStrictEqual(true);
        expect(await tabEls[2].isVisible()).toStrictEqual(true);
        expect(await tabEls[3].isVisible()).toStrictEqual(true);
        expect(await tabEls[4].isVisible()).toStrictEqual(true);
        expect(await tabEls[5].isVisible()).toStrictEqual(true);
    });
    it('propagates size prop to `market-tab` children', async () => {
        expect(tabEls[0]).toEqualAttribute('size', 'medium');
        expect(tabEls[1]).toEqualAttribute('size', 'medium');
        expect(tabEls[2]).toEqualAttribute('size', 'medium');
        expect(tabEls[3]).toEqualAttribute('size', 'medium');
        expect(tabEls[4]).toEqualAttribute('size', 'medium');
        expect(tabEls[5]).toEqualAttribute('size', 'medium');
        el.setAttribute('size', 'small');
        await page.waitForChanges();
        expect(tabEls[0]).toEqualAttribute('size', 'small');
        expect(tabEls[1]).toEqualAttribute('size', 'small');
        expect(tabEls[2]).toEqualAttribute('size', 'small');
        expect(tabEls[3]).toEqualAttribute('size', 'small');
        expect(tabEls[4]).toEqualAttribute('size', 'small');
        expect(tabEls[5]).toEqualAttribute('size', 'small');
    });
    it('only selected tab has tabindex="0"', () => {
        expect(el).toEqualAttribute('selected-tab', 'tab-2');
        expect(tabEls[0]).toEqualAttribute('tabindex', '-1');
        expect(tabEls[1]).toEqualAttribute('tabindex', '0');
        expect(tabEls[2]).toEqualAttribute('tabindex', '-1');
        expect(tabEls[3]).toEqualAttribute('tabindex', '-1');
        expect(tabEls[4]).toEqualAttribute('tabindex', '-1');
        expect(tabEls[5]).toEqualAttribute('tabindex', '-1');
    });
    it('selects the first non-disabled tab by default', () => {
        expect(el).toEqualAttribute('selected-tab', 'tab-2');
        expect(tabEls[0]).toEqualAttribute('aria-selected', 'false'); // disabled
        expect(tabEls[1]).toEqualAttribute('aria-selected', 'true');
        expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[3]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[4]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[5]).toEqualAttribute('aria-selected', 'false');
    });
    describe('tab attribute', () => {
        it('selects a tab with the `selected-tab` prop', async () => {
            el.setAttribute('selected-tab', 'tab-3');
            await page.waitForChanges();
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[3]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[4]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[5]).toEqualAttribute('aria-selected', 'false');
        });
        it('cannot select the tab with the `selected-tab` prop when that tab is disabled', async () => {
            el.setAttribute('selected-tab', 'tab-4');
            await page.waitForChanges();
            // tab-4 is disabled, so select tab-2 because it is the first non-disabled tab
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[3]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[4]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[5]).toEqualAttribute('aria-selected', 'false');
        });
        it('updates when a tab is clicked', async () => {
            const buttonEl = await tabEls[2].find('pierce/button');
            await buttonEl.click();
            expect(el).toEqualAttribute('selected-tab', 'tab-3');
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[3]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[4]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[5]).toEqualAttribute('aria-selected', 'false');
        });
    });
    describe('default-tab attribute', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-tab-list default-tab="tab-2">
          <market-tab id="tab-1" aria-controls="panel-1">Tab 1</market-tab>
          <market-tab id="tab-2" aria-controls="panel-2">Tab 2</market-tab>
          <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
        </market-tab-list>
      `);
            await page.waitForChanges();
            el = await page.find('market-tab-list');
            tabEls = await el.findAll('market-tab');
        });
        it('selects the default tab via `default-tab` prop', () => {
            expect(el).toEqualAttribute('selected-tab', 'tab-2');
            // 2nd tab (tab-2) is selected
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
        });
        it('can select other tabs when a tab is clicked', async () => {
            const buttonEl = await tabEls[2].find('pierce/button');
            await buttonEl.click();
            expect(el).toEqualAttribute('selected-tab', 'tab-3');
            // 3rd tab (tab-3) is selected
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
        });
        it('does not change tabs when `default-tab` value is changed later', async () => {
            el.setAttribute('default-tab', 'tab-3');
            await page.waitForChanges();
            // 2nd tab (tab-2) is selected
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
        });
        it('selects the tab provided on the `selected-tab` attribute over the `default-tab` attribute when both are provided', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-tab-list default-tab="tab-2" selected-tab="tab-3">
          <market-tab id="tab-1" aria-controls="panel-1">Tab 1</market-tab>
          <market-tab id="tab-2" aria-controls="panel-2">Tab 2</market-tab>
          <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
        </market-tab-list>
      `);
            await page.waitForChanges();
            el = await page.find('market-tab-list');
            tabEls = await el.findAll('market-tab');
            // 3rd tab (tab-3) is selected
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
        });
        it('cannot have a default tab that is disabled', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-tab-list default-tab="tab-2">
          <market-tab id="tab-1" aria-controls="panel-1" disabled>Tab 1</market-tab>
          <market-tab id="tab-2" aria-controls="panel-2" disabled>Tab 2</market-tab>
          <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
        </market-tab-list>
      `);
            await page.waitForChanges();
            el = await page.find('market-tab-list');
            tabEls = await el.findAll('market-tab');
            expect(el).toEqualAttribute('selected-tab', 'tab-3');
            // 3rd tab (tab-3) is selected
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
        });
    });
});
//# sourceMappingURL=market-tab-list.e2e.js.map
