import { newE2EPage } from "@stencil/core/testing";
describe('market-pagination', () => {
    let page;
    beforeEach(async () => {
        page = await newE2EPage();
    });
    describe('default configuration', () => {
        beforeEach(async () => {
            await page.setContent('<market-pagination current-page="5" total-pages="10" page-size-options="10,25,50,100"></market-pagination>');
        });
        it('renders', async () => {
            const element = await page.find('market-pagination');
            expect(element).toHaveAttribute('hydrated');
        });
        describe('emits subcomponent events', () => {
            it('changes the page size', async () => {
                const pageSizeChanged = await page.spyOnEvent('marketPaginationPageSizeChange');
                const pageSize = await page.find('pierce/market-pagination-page-size');
                await pageSize.click();
                const pageSizeOption = await page.find('pierce/market-row[value="100"]');
                await pageSizeOption.click();
                expect(pageSizeChanged).toHaveReceivedEventDetail({ value: '100' });
            });
            it('navigates between pages', async () => {
                const pageNavChanged = await page.spyOnEvent('marketPaginationNavigation');
                const navButtons = await page.findAll('pierce/market-button');
                await navButtons[0].click();
                expect(pageNavChanged).toHaveReceivedEventDetail({ page: '4', prevPage: '5' });
                await navButtons[1].click();
                expect(pageNavChanged).toHaveReceivedEventDetail({ page: '6', prevPage: '5' });
            });
        });
    });
    describe('being at edges of the range disables navigation', () => {
        it('stops you going backwards', async () => {
            await page.setContent('<market-pagination current-page="1" total-pages="10" page-size-options="10,25,50,100"></market-pagination>');
            const navButtons = await page.findAll('pierce/market-button');
            expect(navButtons[0]).toHaveAttribute('disabled');
        });
        it('stops you going forwards', async () => {
            await page.setContent('<market-pagination current-page="10" total-pages="10" page-size-options="10,25,50,100"></market-pagination>');
            const navButtons = await page.findAll('pierce/market-button');
            expect(navButtons[1]).toHaveAttribute('disabled');
        });
    });
    describe('disabled attribute', () => {
        it('disables the navigation buttons and the page size dropdown', async () => {
            await page.setContent('<market-pagination current-page="5" total-pages="10" page-size-options="10,25,50,100" disabled></market-pagination>');
            const navButtons = await page.findAll('pierce/market-button');
            expect(navButtons[0]).toHaveAttribute('disabled');
            expect(navButtons[1]).toHaveAttribute('disabled');
            const pageSize = await page.find('pierce/market-pagination-page-size');
            expect(pageSize).toHaveAttribute('disabled');
        });
    });
});
//# sourceMappingURL=market-pagination.e2e.js.map
