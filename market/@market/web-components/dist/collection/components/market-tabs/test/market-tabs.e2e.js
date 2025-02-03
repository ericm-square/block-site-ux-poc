import { newE2EPage } from "@stencil/core/testing";
describe('market-tabs', () => {
    let page;
    let el;
    let tabEls;
    let tabPanelEls;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-tabs>
        <market-tab-list>
          <market-tab id="tab-1" aria-controls="panel-1" disabled>Tab 1</market-tab>
          <market-tab id="tab-2" aria-controls="panel-2">Tab 2</market-tab>
          <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
          <market-tab id="tab-4" aria-controls="panel-4" disabled>Tab 4</market-tab>
          <market-tab id="tab-5" aria-controls="panel-5">Tab 5</market-tab>
          <market-tab id="tab-6" aria-controls="panel-6" disabled>Tab 6</market-tab>
        </market-tab-list>
        <market-tab-panel id="panel-1" aria-labelledby="tab-1">
          <p>Content for tab 1</p>
          <market-button>Button 1</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-2" aria-labelledby="tab-2">
          <p>Content for tab 2</p>
          <market-button>Button 2</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-3" aria-labelledby="tab-3">
          <p>Content for tab 3</p>
          <market-button>Button 3</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-4" aria-labelledby="tab-4">
          <p>Content for tab 4</p>
          <market-button>Button 4</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-5" aria-labelledby="tab-5">
          <p>Content for tab 5</p>
          <market-button>Button 5</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-6" aria-labelledby="tab-6">
          <p>Content for tab 6</p>
          <market-button>Button 6</market-button>
        </market-tab-panel>
      </market-tabs>
    `);
        await page.waitForChanges();
        el = await page.find('market-tabs');
        tabEls = await el.findAll('market-tab');
        tabPanelEls = await el.findAll('market-tab-panel');
    });
    it('renders; selects the first valid tab and displays its associated panel', async () => {
        expect(el).toHaveClass('market-tabs');
        expect(el).toHaveAttribute('hydrated');
        expect(el).toEqualAttribute('selected-tab', 'tab-2');
        // 2nd tab (tab-2) is selected
        expect(tabEls[0]).not.toHaveAttribute('selected');
        expect(tabEls[1]).toHaveAttribute('selected');
        expect(tabEls[2]).not.toHaveAttribute('selected');
        expect(tabEls[3]).not.toHaveAttribute('selected');
        expect(tabEls[4]).not.toHaveAttribute('selected');
        expect(tabEls[5]).not.toHaveAttribute('selected');
        expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[1]).toEqualAttribute('aria-selected', 'true');
        expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[3]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[4]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[5]).toEqualAttribute('aria-selected', 'false');
        // 2nd panel (panel-2) is visible
        expect(tabPanelEls[0]).toHaveAttribute('hidden');
        expect(tabPanelEls[1]).not.toHaveAttribute('hidden');
        expect(tabPanelEls[2]).toHaveAttribute('hidden');
        expect(tabPanelEls[3]).toHaveAttribute('hidden');
        expect(tabPanelEls[4]).toHaveAttribute('hidden');
        expect(tabPanelEls[5]).toHaveAttribute('hidden');
        expect(tabPanelEls[0]).toEqualAttribute('aria-hidden', 'true');
        expect(tabPanelEls[1]).toEqualAttribute('aria-hidden', 'false');
        expect(tabPanelEls[2]).toEqualAttribute('aria-hidden', 'true');
        expect(tabPanelEls[3]).toEqualAttribute('aria-hidden', 'true');
        expect(tabPanelEls[4]).toEqualAttribute('aria-hidden', 'true');
        expect(tabPanelEls[5]).toEqualAttribute('aria-hidden', 'true');
        expect(await tabPanelEls[0].isVisible()).toStrictEqual(false);
        expect(await tabPanelEls[1].isVisible()).toStrictEqual(true);
        expect(await tabPanelEls[2].isVisible()).toStrictEqual(false);
        expect(await tabPanelEls[3].isVisible()).toStrictEqual(false);
        expect(await tabPanelEls[4].isVisible()).toStrictEqual(false);
        expect(await tabPanelEls[5].isVisible()).toStrictEqual(false);
    });
    describe('tab attribute', () => {
        it('can change tab via tab attribute', async () => {
            el.setAttribute('selected-tab', 'tab-3');
            await page.waitForChanges();
            // 3rd tab (tab-3) is selected
            expect(tabEls[0]).not.toHaveAttribute('selected');
            expect(tabEls[1]).not.toHaveAttribute('selected');
            expect(tabEls[2]).toHaveAttribute('selected');
            expect(tabEls[3]).not.toHaveAttribute('selected');
            expect(tabEls[4]).not.toHaveAttribute('selected');
            expect(tabEls[5]).not.toHaveAttribute('selected');
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[3]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[4]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[5]).toEqualAttribute('aria-selected', 'false');
            // 3rd panel (panel-3) is visible
            expect(tabPanelEls[0]).toHaveAttribute('hidden');
            expect(tabPanelEls[1]).toHaveAttribute('hidden');
            expect(tabPanelEls[2]).not.toHaveAttribute('hidden');
            expect(tabPanelEls[3]).toHaveAttribute('hidden');
            expect(tabPanelEls[4]).toHaveAttribute('hidden');
            expect(tabPanelEls[5]).toHaveAttribute('hidden');
            expect(tabPanelEls[0]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[1]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[2]).toEqualAttribute('aria-hidden', 'false');
            expect(tabPanelEls[3]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[4]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[5]).toEqualAttribute('aria-hidden', 'true');
            expect(await tabPanelEls[0].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[1].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[2].isVisible()).toStrictEqual(true);
            expect(await tabPanelEls[3].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[4].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[5].isVisible()).toStrictEqual(false);
        });
        it('updates when a tab is clicked', async () => {
            const buttonEl = await tabEls[4].find('pierce/button');
            await buttonEl.click();
            // 5th tab (tab-5) is selected
            expect(tabEls[0]).not.toHaveAttribute('selected');
            expect(tabEls[1]).not.toHaveAttribute('selected');
            expect(tabEls[2]).not.toHaveAttribute('selected');
            expect(tabEls[3]).not.toHaveAttribute('selected');
            expect(tabEls[4]).toHaveAttribute('selected');
            expect(tabEls[5]).not.toHaveAttribute('selected');
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[3]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[4]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[5]).toEqualAttribute('aria-selected', 'false');
            // 5th panel (panel-5) is visible
            expect(tabPanelEls[0]).toHaveAttribute('hidden');
            expect(tabPanelEls[1]).toHaveAttribute('hidden');
            expect(tabPanelEls[2]).toHaveAttribute('hidden');
            expect(tabPanelEls[3]).toHaveAttribute('hidden');
            expect(tabPanelEls[4]).not.toHaveAttribute('hidden');
            expect(tabPanelEls[5]).toHaveAttribute('hidden');
            expect(tabPanelEls[0]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[1]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[2]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[3]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[4]).toEqualAttribute('aria-hidden', 'false');
            expect(tabPanelEls[5]).toEqualAttribute('aria-hidden', 'true');
            expect(await tabPanelEls[0].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[1].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[2].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[3].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[4].isVisible()).toStrictEqual(true);
            expect(await tabPanelEls[5].isVisible()).toStrictEqual(false);
        });
    });
    describe('default-tab attribute', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-tabs default-tab="tab-2">
          <market-tab-list>
            <market-tab id="tab-1" aria-controls="panel-1">Tab 1</market-tab>
            <market-tab id="tab-2" aria-controls="panel-2">Tab 2</market-tab>
            <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
          </market-tab-list>
          <market-tab-panel id="panel-1" aria-labelledby="tab-1">Content for tab 1</market-tab-panel>
          <market-tab-panel id="panel-2" aria-labelledby="tab-2">Content for tab 2</market-tab-panel>
          <market-tab-panel id="panel-3" aria-labelledby="tab-3">Content for tab 3</market-tab-panel>
        </market-tabs>
      `);
            await page.waitForChanges();
            el = await page.find('market-tabs');
            tabEls = await el.findAll('market-tab');
            tabPanelEls = await el.findAll('market-tab-panel');
        });
        it('selects the default tab via `default-tab` prop', async () => {
            expect(el).toEqualAttribute('selected-tab', 'tab-2');
            // 2nd tab (tab-2) is selected
            expect(tabEls[0]).not.toHaveAttribute('selected');
            expect(tabEls[1]).toHaveAttribute('selected');
            expect(tabEls[2]).not.toHaveAttribute('selected');
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
            // 2nd panel (panel-2) is visible
            expect(tabPanelEls[0]).toHaveAttribute('hidden');
            expect(tabPanelEls[1]).not.toHaveAttribute('hidden');
            expect(tabPanelEls[2]).toHaveAttribute('hidden');
            expect(tabPanelEls[0]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[1]).toEqualAttribute('aria-hidden', 'false');
            expect(tabPanelEls[2]).toEqualAttribute('aria-hidden', 'true');
            expect(await tabPanelEls[0].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[1].isVisible()).toStrictEqual(true);
            expect(await tabPanelEls[2].isVisible()).toStrictEqual(false);
        });
        it('can select other tabs when a tab is clicked', async () => {
            const buttonEl = await tabEls[2].find('pierce/button');
            await buttonEl.click();
            expect(el).toEqualAttribute('selected-tab', 'tab-3');
            // 3rd tab (tab-3) is selected
            expect(tabEls[0]).not.toHaveAttribute('selected');
            expect(tabEls[1]).not.toHaveAttribute('selected');
            expect(tabEls[2]).toHaveAttribute('selected');
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
            // 3rd panel (panel-3) is visible
            expect(tabPanelEls[0]).toHaveAttribute('hidden');
            expect(tabPanelEls[1]).toHaveAttribute('hidden');
            expect(tabPanelEls[2]).not.toHaveAttribute('hidden');
            expect(tabPanelEls[0]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[1]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[2]).toEqualAttribute('aria-hidden', 'false');
            expect(await tabPanelEls[0].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[1].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[2].isVisible()).toStrictEqual(true);
        });
        it('does not change tabs when `default-tab` value is changed later', async () => {
            el.setAttribute('default-tab', 'tab-3');
            await page.waitForChanges();
            // 2nd tab (tab-2) is selected
            expect(tabEls[0]).not.toHaveAttribute('selected');
            expect(tabEls[1]).toHaveAttribute('selected');
            expect(tabEls[2]).not.toHaveAttribute('selected');
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'true');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
            // 2nd panel (panel-2) is visible
            expect(tabPanelEls[0]).toHaveAttribute('hidden');
            expect(tabPanelEls[1]).not.toHaveAttribute('hidden');
            expect(tabPanelEls[2]).toHaveAttribute('hidden');
            expect(tabPanelEls[0]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[1]).toEqualAttribute('aria-hidden', 'false');
            expect(tabPanelEls[2]).toEqualAttribute('aria-hidden', 'true');
            expect(await tabPanelEls[0].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[1].isVisible()).toStrictEqual(true);
            expect(await tabPanelEls[2].isVisible()).toStrictEqual(false);
        });
        it('selects the tab provided on the `selected-tab` attribute over the `default-tab` attribute when both are provided', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-tabs default-tab="tab-2" selected-tab="tab-3">
          <market-tab-list>
            <market-tab id="tab-1" aria-controls="panel-1">Tab 1</market-tab>
            <market-tab id="tab-2" aria-controls="panel-2">Tab 2</market-tab>
            <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
          </market-tab-list>
          <market-tab-panel id="panel-1" aria-labelledby="tab-1">Content for tab 1</market-tab-panel>
          <market-tab-panel id="panel-2" aria-labelledby="tab-2">Content for tab 2</market-tab-panel>
          <market-tab-panel id="panel-3" aria-labelledby="tab-3">Content for tab 3</market-tab-panel>
        </market-tabs>
      `);
            await page.waitForChanges();
            el = await page.find('market-tabs');
            tabEls = await el.findAll('market-tab');
            tabPanelEls = await el.findAll('market-tab-panel');
            // 3rd tab (tab-3) is selected
            expect(tabEls[0]).not.toHaveAttribute('selected');
            expect(tabEls[1]).not.toHaveAttribute('selected');
            expect(tabEls[2]).toHaveAttribute('selected');
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
            // 3rd panel (panel-3) is visible
            expect(tabPanelEls[0]).toHaveAttribute('hidden');
            expect(tabPanelEls[1]).toHaveAttribute('hidden');
            expect(tabPanelEls[2]).not.toHaveAttribute('hidden');
            expect(tabPanelEls[0]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[1]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[2]).toEqualAttribute('aria-hidden', 'false');
            expect(await tabPanelEls[0].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[1].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[2].isVisible()).toStrictEqual(true);
        });
        it('cannot have a default tab that is disabled', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-tabs default-tab="tab-2">
          <market-tab-list>
            <market-tab id="tab-1" aria-controls="panel-1" disabled>Tab 1</market-tab>
            <market-tab id="tab-2" aria-controls="panel-2" disabled>Tab 2</market-tab>
            <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
          </market-tab-list>
          <market-tab-panel id="panel-1" aria-labelledby="tab-1">Content for tab 1</market-tab-panel>
          <market-tab-panel id="panel-2" aria-labelledby="tab-2">Content for tab 2</market-tab-panel>
          <market-tab-panel id="panel-3" aria-labelledby="tab-3">Content for tab 3</market-tab-panel>
        </market-tabs>
      `);
            await page.waitForChanges();
            el = await page.find('market-tabs');
            tabEls = await el.findAll('market-tab');
            tabPanelEls = await el.findAll('market-tab-panel');
            expect(el).toEqualAttribute('selected-tab', 'tab-3');
            // 3rd tab (tab-3) is selected
            expect(tabEls[0]).not.toHaveAttribute('selected');
            expect(tabEls[1]).not.toHaveAttribute('selected');
            expect(tabEls[2]).toHaveAttribute('selected');
            expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
            expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
            // 3rd panel (panel-3) is visible
            expect(tabPanelEls[0]).toHaveAttribute('hidden');
            expect(tabPanelEls[1]).toHaveAttribute('hidden');
            expect(tabPanelEls[2]).not.toHaveAttribute('hidden');
            expect(tabPanelEls[0]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[1]).toEqualAttribute('aria-hidden', 'true');
            expect(tabPanelEls[2]).toEqualAttribute('aria-hidden', 'false');
            expect(await tabPanelEls[0].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[1].isVisible()).toStrictEqual(false);
            expect(await tabPanelEls[2].isVisible()).toStrictEqual(true);
        });
    });
});
//# sourceMappingURL=market-tabs.e2e.js.map
