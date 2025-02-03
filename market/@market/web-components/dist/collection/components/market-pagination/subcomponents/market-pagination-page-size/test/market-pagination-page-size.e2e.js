import { newE2EPage } from "@stencil/core/testing";
describe('market-pagination-page-size', () => {
    let page;
    let el;
    let trigger;
    let pageSizeLabel;
    let pageSizeFeedback;
    let row10;
    let row25;
    describe('default', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-pagination-page-size page-size-options="10,25,50,100" value="10"></market-pagination-page-size>');
            el = await page.find('market-pagination-page-size');
            trigger = await el.find('market-filter-button');
            pageSizeLabel = await trigger.find('span:first-child');
            pageSizeFeedback = await trigger.find('span[slot=feedback]');
            row10 = await el.find('market-row[value="10"]');
            row25 = await el.find('market-row[value="25"]');
        });
        it('renders', async () => {
            const element = await page.find('market-pagination-page-size');
            expect(element).toHaveAttribute('hydrated');
            expect(pageSizeLabel.textContent).toBe('Results per page');
            expect(pageSizeFeedback.textContent).toBe('10');
            expect(row10).toHaveAttribute('selected');
        });
        it('emits the page size change event', async () => {
            const marketInternalPaginationPageSizeChangeSpy = await page.spyOnEvent('marketInternalPaginationPageSizeChange');
            await trigger.click();
            await row25.click();
            expect(marketInternalPaginationPageSizeChangeSpy).toHaveReceivedEvent();
        });
        it('persists the selected page size', async () => {
            await trigger.click();
            await row25.click();
            expect(row25).toHaveAttribute('selected');
        });
    });
    it('accepts custom page size options', async () => {
        page = await newE2EPage();
        await page.setContent(`<market-pagination-page-size value="30" page-size-options="10,20,30,All">
        Results per page
      </market-pagination-page-size>`);
        el = await page.find('market-pagination-page-size');
        trigger = await el.find('market-filter-button');
        expect(await el.find('market-row[value="10"]')).toBeTruthy();
        expect(await el.find('market-row[value="20"]')).toBeTruthy();
        expect(await el.find('market-row[value="30"]')).toHaveAttribute('selected');
        expect(await el.find('market-row[value="All"]')).toBeTruthy();
    });
    describe('localization support', () => {
        it('allows localized text to be passed in', async () => {
            page = await newE2EPage();
            await page.setContent(`<market-pagination-page-size page-size-options="10,25,50,100" value="10">
          <span slot="page-size-label">Resultados por pagina</span>
        </market-pagination-page-size>`);
            el = await page.find('market-pagination-page-size');
            trigger = await el.find('market-filter-button');
            pageSizeLabel = await trigger.find('span[slot=page-size-label]');
            pageSizeFeedback = await trigger.find('span[slot=feedback]');
            expect(pageSizeLabel.textContent).toBe('Resultados por pagina');
            expect(pageSizeFeedback.textContent).toBe('10');
        });
    });
    describe('disabled attribute', () => {
        it('disables the page size dropdown', async () => {
            page = await newE2EPage();
            await page.setContent('<market-pagination-page-size page-size-options="10,25,50,100" value="10" disabled></market-pagination-page-size>');
            el = await page.find('market-pagination-page-size');
            trigger = await el.find('market-filter-button');
            expect(trigger).toHaveAttribute('disabled');
        });
    });
});
//# sourceMappingURL=market-pagination-page-size.e2e.js.map
