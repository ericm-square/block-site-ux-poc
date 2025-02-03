import { newE2EPage } from "@stencil/core/testing";
describe('market-list: with search', () => {
    let page;
    let el;
    let searchEl;
    let clearButtonEl;
    let appleRowEl;
    let bananaRowEl;
    let blueberryRowEl;
    let eventSpy;
    describe('render', () => {
        it('renders search bar and rows', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search"></market-input-search>
          <market-row value="apple">
            <label slot="label">Apple</label>
          </market-row>
          <market-row value="banana">
            <label slot="label">Banana</label>
          </market-row>
          <market-row value="blueberry">
            <label slot="label">Blueberry</label>
          </market-row>
        </market-list>
      `);
            el = await page.find('market-list');
            searchEl = await el.find('market-input-search');
            appleRowEl = await el.find('pierce/market-row[value="apple"]');
            bananaRowEl = await el.find('pierce/market-row[value="banana"]');
            blueberryRowEl = await el.find('pierce/market-row[value="blueberry"]');
            expect(el).toHaveAttribute('has-search');
            expect(await searchEl.isVisible()).toStrictEqual(true);
            expect(await appleRowEl.isVisible()).toStrictEqual(true);
            expect(await bananaRowEl.isVisible()).toStrictEqual(true);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(true);
        });
        it('shows clear button only when there’s a query', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search"></market-input-search>
          <market-row value="apple">
            <label slot="label">Apple</label>
          </market-row>
          <market-row value="banana">
            <label slot="label">Banana</label>
          </market-row>
          <market-row value="blueberry">
            <label slot="label">Blueberry</label>
          </market-row>
        </market-list>
      `);
            el = await page.find('market-list');
            searchEl = await el.find('market-input-search');
            clearButtonEl = await searchEl.find('pierce/.clear-button');
            expect(await clearButtonEl.isVisible()).toStrictEqual(false);
            await searchEl.click();
            await page.keyboard.type('boop');
            await page.waitForChanges();
            expect(await clearButtonEl.isVisible()).toStrictEqual(true);
            await clearButtonEl.click();
            await page.waitForChanges();
            expect(await clearButtonEl.isVisible()).toStrictEqual(false);
        });
        it('filters on initial render when market-input-search has value', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search" value="nana"></market-input-search>
          <market-row value="apple">
            <label slot="label">Apple</label>
          </market-row>
          <market-row value="banana">
            <label slot="label">Banana</label>
          </market-row>
          <market-row value="blueberry">
            <label slot="label">Blueberry</label>
          </market-row>
        </market-list>
      `);
            el = await page.find('market-list');
            appleRowEl = await el.find('pierce/market-row[value="apple"]');
            bananaRowEl = await el.find('pierce/market-row[value="banana"]');
            blueberryRowEl = await el.find('pierce/market-row[value="blueberry"]');
            expect(await appleRowEl.isVisible()).toStrictEqual(false);
            expect(await bananaRowEl.isVisible()).toStrictEqual(true);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(false);
        });
    });
    describe('filter strategies', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search"></market-input-search>
          <market-row value="apple">
            <label slot="label">Apple</label>
            <p slot="subtext">Red</p>
          </market-row>
          <market-row value="banana">
            <label slot="label">Banana</label>
            <p slot="subtext">yellow</p>
          </market-row>
          <market-row value="blueberry">
            <label slot="label">Blueberry</label>
            <p slot="subtext">blue</p>
          </market-row>
        </market-list>
      `);
            el = await page.find('market-list');
            searchEl = await el.find('market-input-search');
            clearButtonEl = await searchEl.find('pierce/.clear-button');
            appleRowEl = await el.find('pierce/market-row[value="apple"]');
            bananaRowEl = await el.find('pierce/market-row[value="banana"]');
            blueberryRowEl = await el.find('pierce/market-row[value="blueberry"]');
        });
        it('uses default “textcontent” filter strategy', async () => {
            expect(await clearButtonEl.isVisible()).toStrictEqual(false);
            await searchEl.click();
            await page.keyboard.type('b');
            await page.waitForChanges();
            expect(await clearButtonEl.isVisible()).toStrictEqual(true);
            expect(await appleRowEl.isVisible()).toStrictEqual(false);
            expect(await bananaRowEl.isVisible()).toStrictEqual(true);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(true);
            await page.keyboard.press('Backspace');
            await page.waitForChanges();
            expect(await clearButtonEl.isVisible()).toStrictEqual(false);
            expect(await appleRowEl.isVisible()).toStrictEqual(true);
            expect(await bananaRowEl.isVisible()).toStrictEqual(true);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(true);
            await page.keyboard.type('boop');
            await page.waitForChanges();
            expect(await clearButtonEl.isVisible()).toStrictEqual(true);
            expect(await appleRowEl.isVisible()).toStrictEqual(false);
            expect(await bananaRowEl.isVisible()).toStrictEqual(false);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(false);
            await clearButtonEl.click();
            await page.waitForChanges();
            expect(await clearButtonEl.isVisible()).toStrictEqual(false);
            expect(await appleRowEl.isVisible()).toStrictEqual(true);
            expect(await bananaRowEl.isVisible()).toStrictEqual(true);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(true);
        });
        it('uses “label” strategy', async () => {
            el.setAttribute('filter-strategy', 'label');
            await searchEl.click();
            await page.keyboard.type('nana');
            await page.waitForChanges();
            expect(await appleRowEl.isVisible()).toStrictEqual(false);
            expect(await bananaRowEl.isVisible()).toStrictEqual(true);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(false);
            await clearButtonEl.click();
            await page.waitForChanges();
            // "Banana" row has a "Yellow" subtext but we're only searching through labels
            await page.keyboard.type('yellow');
            await page.waitForChanges();
            expect(await appleRowEl.isVisible()).toStrictEqual(false);
            expect(await bananaRowEl.isVisible()).toStrictEqual(false);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(false);
        });
        it('uses “value” strategy', async () => {
            el.setAttribute('filter-strategy', 'value');
            await searchEl.click();
            await page.keyboard.type('berry');
            await page.waitForChanges();
            expect(await appleRowEl.isVisible()).toStrictEqual(false);
            expect(await bananaRowEl.isVisible()).toStrictEqual(false);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(true);
            await clearButtonEl.click();
            await page.waitForChanges();
            // "Blueberry" row's value is "blue" but value search is case-sensitive
            await page.keyboard.type('BlUe');
            await page.waitForChanges();
            expect(await appleRowEl.isVisible()).toStrictEqual(false);
            expect(await bananaRowEl.isVisible()).toStrictEqual(false);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(false);
        });
        it('uses custom function strategy', async () => {
            // same callback as in the storybook docs where '!' prefix negates the search results
            await page.$eval('.market-list', (listEl) => {
                listEl.filterStrategy = ({ label, query }) => {
                    const isNot = query.startsWith('!');
                    const q = isNot ? query.slice(1) : query;
                    if (!q)
                        return true;
                    const match = Boolean(new RegExp(q, 'i').test(label));
                    return isNot ? !match : match;
                };
            });
            // search for rows except "blue"
            await searchEl.click();
            await page.keyboard.type('!blue');
            await page.waitForChanges();
            expect(await appleRowEl.isVisible()).toStrictEqual(true);
            expect(await bananaRowEl.isVisible()).toStrictEqual(true);
            expect(await blueberryRowEl.isVisible()).toStrictEqual(false);
        });
        it('emits marketListItemsFiltered', async () => {
            eventSpy = await page.spyOnEvent('marketListItemsFiltered');
            await searchEl.click();
            await page.keyboard.type('b');
            expect(eventSpy).toHaveReceivedEventTimes(1);
            expect(eventSpy.lastEvent.detail.prevItems.length).toStrictEqual(3);
            expect(eventSpy.lastEvent.detail.items.length).toStrictEqual(2);
            await page.keyboard.type('a');
            expect(eventSpy).toHaveReceivedEventTimes(2);
            expect(eventSpy.lastEvent.detail.prevItems.length).toStrictEqual(2);
            expect(eventSpy.lastEvent.detail.items.length).toStrictEqual(1);
            await page.keyboard.type('x');
            expect(eventSpy).toHaveReceivedEventTimes(3);
            expect(eventSpy.lastEvent.detail.prevItems.length).toStrictEqual(1);
            expect(eventSpy.lastEvent.detail.items.length).toStrictEqual(0);
            await clearButtonEl.click();
            expect(eventSpy).toHaveReceivedEventTimes(4);
            expect(eventSpy.lastEvent.detail.prevItems.length).toStrictEqual(0);
            expect(eventSpy.lastEvent.detail.items.length).toStrictEqual(3);
        });
    });
    describe('empty state', () => {
        it('shows default empty state when there are no search results', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search"></market-input-search>
          <market-row value="apple">
            <label slot="label">Apple</label>
            <p slot="subtext">Red</p>
          </market-row>
          <market-row value="banana">
            <label slot="label">Banana</label>
            <p slot="subtext">yellow</p>
          </market-row>
          <market-row value="blueberry">
            <label slot="label">Blueberry</label>
            <p slot="subtext">blue</p>
          </market-row>
        </market-list>
      `);
            el = await page.find('market-list');
            searchEl = await el.find('market-input-search');
            await searchEl.click();
            await page.keyboard.type('fudge');
            const emptyStateEl = await el.find('pierce/.market-empty-state');
            expect(await emptyStateEl.isVisible()).toStrictEqual(true);
            const primaryTextEl = await emptyStateEl.find('h3');
            const secondaryTextEl = await emptyStateEl.find('p');
            expect(primaryTextEl.textContent).toStrictEqual('No search results for “fudge”');
            expect(secondaryTextEl.textContent).toStrictEqual('Try a different search.');
        });
        it('can have a slotted primary and secondary text for empty state', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search"></market-input-search>
          <market-row value="apple"><label slot="label">Apple</label></market-row>
          <span slot="empty-state-primary-text">fudge not found</span>
          <span slot="empty-state-secondary-text">nice try</span>
        </market-list>
      `);
            el = await page.find('market-list');
            searchEl = await el.find('market-input-search');
            await searchEl.click();
            await page.keyboard.type('fudge');
            await page.waitForChanges();
            const emptyStateEl = await el.find('pierce/.market-empty-state');
            expect(await emptyStateEl.isVisible()).toStrictEqual(true);
            const primaryTextSlot = await page.$eval('.market-list', (listEl) => {
                const slot = listEl.shadowRoot.querySelector('slot[name="empty-state-primary-text"]');
                return slot.assignedNodes()[0].textContent.trim();
            });
            const secondaryTextSlot = await page.$eval('.market-list', (listEl) => {
                const slot = listEl.shadowRoot.querySelector('slot[name="empty-state-secondary-text"]');
                return slot.assignedNodes()[0].textContent.trim();
            });
            expect(primaryTextSlot).toStrictEqual('fudge not found');
            expect(secondaryTextSlot).toStrictEqual('nice try');
        });
        it('can have a slotted empty state', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search"></market-input-search>
          <market-row value="apple"><label slot="label">Apple</label></market-row>
          <market-empty-state class="custom-empty-state" slot="empty-state">
            <h3 slot="primary-text">fudge not found</h3>
            <p slot="secondary-text">nice try</p>
          </market-empty-state>
        </market-list>
      `);
            el = await page.find('market-list');
            searchEl = await el.find('market-input-search');
            await searchEl.click();
            await page.keyboard.type('fudge');
            await page.waitForChanges();
            const emptyStateEl = await el.find('pierce/.custom-empty-state');
            expect(await emptyStateEl.isVisible()).toStrictEqual(true);
            const primaryTextEl = await emptyStateEl.find('h3');
            const secondaryTextEl = await emptyStateEl.find('p');
            expect(primaryTextEl.textContent).toStrictEqual('fudge not found');
            expect(secondaryTextEl.textContent).toStrictEqual('nice try');
        });
        it('shows empty state if there is a search query but there are no slotted rows', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search"></market-input-search>
        </market-list>
      `);
            el = await page.find('market-list');
            searchEl = await el.find('market-input-search');
            await searchEl.click();
            await page.keyboard.type('fudge');
            await page.waitForChanges();
            const emptyStateEl = await el.find('pierce/.market-empty-state');
            expect(await emptyStateEl.isVisible()).toStrictEqual(true);
        });
        it('does not show empty state if there’s no search query and there are no slotted rows', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-list>
          <market-input-search slot="search"></market-input-search>
        </market-list>
      `);
            el = await page.find('market-list');
            const emptyStateEl = await el.find('pierce/.market-empty-state');
            expect(await emptyStateEl.isVisible()).toStrictEqual(false);
        });
    });
});
//# sourceMappingURL=market-list.search.e2e.js.map
