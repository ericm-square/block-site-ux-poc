import { newE2EPage } from "@stencil/core/testing";
describe('market-filter-group', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-filter-group></market-filter-group>');
        const element = await page.find('market-filter-group');
        expect(element).not.toBeNull();
        expect(element).toHaveAttribute('hydrated');
        const dropdownMenuEl = await element.find('pierce/market-filter-dropdown-menu');
        expect(dropdownMenuEl).toBeNull();
    });
    it('displays a filter', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-group>
        <market-filter name="color" slot="filters">
          <label slot="label">Color</label>
        </market-filter>
      </market-filter-group>
    `);
        await page.waitForChanges(); // extra wait in an attempt to avoid flakiness
        const element = await page.find('market-filter-group');
        const filterEl = await element.find('pierce/market-filter');
        expect(await filterEl.isVisible()).toBe(true);
        expect(filterEl).not.toHaveAttribute('disabled');
        const labelEl = await element.find('pierce/label');
        expect(await labelEl.isVisible()).toBe(true);
        expect(labelEl.innerText).toStrictEqual('Color');
    });
    it('displays three filters', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-group>
        <market-filter name="color" slot="filters">
          <label slot="label">Color</label>
        </market-filter>
        <market-filter name="size" slot="filters">
          <label slot="label">Size</label>
        </market-filter>
        <market-filter name="shape" slot="filters">
          <label slot="label">Shape</label>
        </market-filter>
      </market-filter-group>
    `);
        await page.waitForChanges(); // extra wait in an attempt to avoid flakiness
        const element = await page.find('market-filter-group');
        const colorFilterEl = await element.find('market-filter[name="color"]');
        expect(await colorFilterEl.isVisible()).toBe(true);
        expect((await colorFilterEl.find('pierce/label')).innerText).toStrictEqual('Color');
        const sizeFilterEl = await element.find('market-filter[name="size"]');
        expect(await sizeFilterEl.isVisible()).toBe(true);
        expect((await sizeFilterEl.find('pierce/label')).innerText).toStrictEqual('Size');
        const shapeFilterEl = await element.find('market-filter[name="shape"]');
        expect(await shapeFilterEl.isVisible()).toBe(true);
        expect((await shapeFilterEl.find('pierce/label')).innerText).toStrictEqual('Shape');
        const dropdownMenuEl = await element.find('pierce/market-filter-dropdown-menu');
        expect(dropdownMenuEl).toBeNull();
    });
    it('does not set search to compact mode with 3 or less filters', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-group>
        <market-input-search slot="search"></market-input-search>
        <market-filter name="color" slot="filters">
          <label slot="label">Color</label>
        </market-filter>
      </market-filter-group>
    `);
        const element = await page.find('market-filter-group');
        const inputSearchEl = await element.find('pierce/market-input-search');
        expect(inputSearchEl).not.toHaveAttribute('compact');
    });
    it('sets dropdown menu button size based on the first filter size', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-group>
        <market-filter name="color" slot="filters" size="small"></market-filter>
        <market-filter name="size" slot="filters"></market-filter>
        <market-filter disabled name="start-date" slot="filters"></market-filter>
        <market-filter disabled name="end-date" slot="filters"></market-filter>
      </market-filter-group>
    `);
        await page.waitForChanges();
        const element = await page.find('market-filter-group');
        const dropdownMenuEl = await element.find('pierce/market-filter-dropdown-menu');
        const dropdownMenuButtonEl = await dropdownMenuEl.find('pierce/market-filter-button');
        expect(dropdownMenuButtonEl).toEqualAttribute('size', 'small');
    });
});
//# sourceMappingURL=market-filter-group.e2e.js.map
