import { newE2EPage } from "@stencil/core/testing";
describe('market-table-column: accessibility', () => {
    let page;
    let el;
    it('has aria sort description for sortable column', async () => {
        page = await newE2EPage();
        await page.setContent(`<market-table-column sortable name="Sortable-1" sort-order="ascending">Sort Me</market-table-column>`);
        el = await page.find('market-table-column');
        const sortOrder = await el.getProperty('sortOrder');
        expect(el).toEqualAttribute('aria-sort', sortOrder);
    });
});
//# sourceMappingURL=market-table-column.a11y.e2e.js.map
