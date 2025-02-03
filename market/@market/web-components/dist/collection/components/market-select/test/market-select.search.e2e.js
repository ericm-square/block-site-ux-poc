import { newE2EPage } from "@stencil/core/testing";
describe('market-select: with search', () => {
    let page;
    let el;
    let searchEl;
    let appleRowEl;
    let bananaRowEl;
    let orangeRowEl;
    let pearRowEl;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-select>
        <label>Label</label>
        <market-list slot="list">
          <market-input-search slot="search"></market-input-search>
          <market-row value="apple">Apple</market-row>
          <market-row value="banana">Banana</market-row>
          <market-row value="orange">Orange</market-row>
          <market-row value="pear">Pear</market-row>
        </market-list>
      </market-select>
    `);
        el = await page.find('.market-select');
        searchEl = await el.find('.market-input-search');
        appleRowEl = await page.find('.market-row[value="apple"]');
        bananaRowEl = await page.find('.market-row[value="banana"]');
        orangeRowEl = await page.find('.market-row[value="orange"]');
        pearRowEl = await page.find('.market-row[value="pear"]');
    });
    it('renders search input', async () => {
        await el.click();
        await page.waitForChanges();
        expect(await searchEl.isVisible()).toStrictEqual(true);
    });
    it('can search and select', async () => {
        await el.click();
        await page.waitForChanges();
        await searchEl.click();
        await page.keyboard.type('p'); // should yield `apple` and `pear`
        await page.waitForChanges();
        expect(await appleRowEl.isVisible()).toStrictEqual(true);
        expect(await bananaRowEl.isVisible()).toStrictEqual(false);
        expect(await orangeRowEl.isVisible()).toStrictEqual(false);
        expect(await pearRowEl.isVisible()).toStrictEqual(true);
        await pearRowEl.click();
        await page.waitForChanges();
        expect(el.getAttribute('value')).toStrictEqual('pear');
    });
    it('can search and select multiple rows', async () => {
        el.setAttribute('multiselect', '');
        await page.waitForChanges();
        await el.click();
        await page.waitForChanges();
        await searchEl.click();
        await page.keyboard.type('p'); // should yield `apple` and `pear`
        await page.waitForChanges();
        expect(await appleRowEl.isVisible()).toStrictEqual(true);
        expect(await bananaRowEl.isVisible()).toStrictEqual(false);
        expect(await orangeRowEl.isVisible()).toStrictEqual(false);
        expect(await pearRowEl.isVisible()).toStrictEqual(true);
        await appleRowEl.click();
        await pearRowEl.click();
        await page.waitForChanges();
        expect(el.getAttribute('value')).toStrictEqual('apple,pear');
    });
    it('shows empty state when searching for something that does not exist', async () => {
        await el.click();
        await page.waitForChanges();
        await searchEl.click();
        await page.keyboard.type('x'); // should yield nothing
        await page.waitForChanges();
        expect(await appleRowEl.isVisible()).toStrictEqual(false);
        expect(await bananaRowEl.isVisible()).toStrictEqual(false);
        expect(await orangeRowEl.isVisible()).toStrictEqual(false);
        expect(await pearRowEl.isVisible()).toStrictEqual(false);
        const listEl = await page.find('.market-list');
        const emptyStateEl = await listEl.find('pierce/.market-empty-state');
        expect(await emptyStateEl.isVisible()).toStrictEqual(true);
    });
});
//# sourceMappingURL=market-select.search.e2e.js.map
