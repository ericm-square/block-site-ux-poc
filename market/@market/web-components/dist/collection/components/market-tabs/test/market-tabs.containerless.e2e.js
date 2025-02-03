import { newE2EPage } from "@stencil/core/testing";
describe('market-tabs: containerless', () => {
    let page;
    let tabEls;
    let tabPanelEls;
    it('can be used without `market-tabs`', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <nav>
        <market-tab-list default-tab="tab-2">
          <market-tab id="tab-1" aria-controls="panel-1">Tab 1</market-tab>
          <market-tab id="tab-2" aria-controls="panel-2">Tab 2</market-tab>
          <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
        </market-tab-list>
      </nav>
      <main>
        <market-tab-panel id="panel-1" aria-labelledby="tab-1" hidden>Content for tab 1</market-tab-panel>
        <market-tab-panel id="panel-2" aria-labelledby="tab-2">Content for tab 2</market-tab-panel>
        <market-tab-panel id="panel-3" aria-labelledby="tab-3" hidden>Content for tab 3</market-tab-panel>
      </main>
    `);
        await page.waitForChanges();
        tabEls = await page.findAll('market-tab');
        tabPanelEls = await page.findAll('market-tab-panel');
        await page.evaluate(() => {
            const tabListEl = document.querySelector('market-tab-list');
            tabListEl.addEventListener('marketTabSelectedChanged', (event) => {
                const panelEl = document.querySelector(`#${event.detail.panelId}`);
                panelEl.hidden = !event.detail.value;
            });
        });
        const tab3ButtonEl = await tabEls[2].find('pierce/button');
        await tab3ButtonEl.click();
        await page.waitForChanges();
        expect(tabEls[0]).not.toHaveAttribute('selected');
        expect(tabEls[1]).not.toHaveAttribute('selected');
        expect(tabEls[2]).toHaveAttribute('selected');
        expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[1]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[2]).toEqualAttribute('aria-selected', 'true');
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
//# sourceMappingURL=market-tabs.containerless.e2e.js.map
