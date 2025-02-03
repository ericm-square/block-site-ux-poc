import { newE2EPage } from "@stencil/core/testing";
describe('market-popover', () => {
    it('it renders with default', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-popover>Some Stuff</market-popover>');
        const el = await page.find('market-popover');
        expect(el).not.toBeNull();
        expect(el).toHaveAttribute('hydrated');
        expect(el.innerText).toEqual('Some Stuff');
    });
    it('it renders with List', async () => {
        const page = await newE2EPage();
        await page.setContent(`
    <market-popover>
      <market-list>
        <market-row>Apple</market-row>
        <market-row>Orange</market-row>
        <market-row>Pear</market-row>
      </market-list>
    </market-popover>`);
        const el = await page.find('market-popover');
        const list = await page.find('market-list');
        const row = await page.find('market-row');
        expect(el).not.toBeNull();
        expect(el).toHaveAttribute('hydrated');
        expect(list).not.toBeNull();
        expect(row).not.toBeNull();
        // auto-sets list to interactive
        expect(await list.getProperty('interactive')).toEqual(true);
    });
});
//# sourceMappingURL=market-popover.e2e.js.map
