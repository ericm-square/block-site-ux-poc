import { newE2EPage } from "@stencil/core/testing";
describe('market-pagination-nav', () => {
    let page;
    let el;
    let trigger;
    let navLabel;
    let navFeedback;
    let prevPage;
    let nextPage;
    let page2;
    let page5;
    describe('default', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-pagination-nav current-page="5" page-size="10" total-pages="10"></market-pagination-nav>');
            el = await page.find('market-pagination-nav');
            trigger = await el.find('market-button-dropdown market-filter-button');
            navLabel = await trigger.find('span:first-child');
            navFeedback = await trigger.find('span[slot=feedback]');
            prevPage = await el.find('market-button:first-child');
            nextPage = await el.find('market-button:last-child');
            page2 = await el.find('market-row[value="2"]');
            page5 = await el.find('market-row[value="5"]');
        });
        it('renders', async () => {
            const element = await page.find('market-pagination-nav');
            expect(element).toHaveAttribute('hydrated');
            expect(navLabel.textContent).toBe('Page');
            expect(navFeedback.textContent).toBe('5 of 10');
            expect(page5).toHaveAttribute('selected');
        });
        it('emits the page navigation event when a page is selected', async () => {
            const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
            await trigger.click();
            await page2.click();
            expect(marketInternalPaginationNavigationSpy).toHaveReceivedEventDetail({
                page: '2',
                pageSize: '10',
                prevPage: '5',
            });
        });
        it('emits the page navigation event when the previous page is clicked', async () => {
            const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
            await prevPage.click();
            expect(marketInternalPaginationNavigationSpy).toHaveReceivedEventDetail({
                page: '4',
                pageSize: '10',
                prevPage: '5',
            });
        });
        it('emits the page navigation event when the next page is clicked', async () => {
            const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
            await nextPage.click();
            expect(marketInternalPaginationNavigationSpy).toHaveReceivedEventDetail({
                page: '6',
                pageSize: '10',
                prevPage: '5',
            });
        });
    });
    describe('without page info', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-pagination-nav page-size="10"></market-pagination-nav>');
            el = await page.find('market-pagination-nav');
            trigger = await el.find('market-button-dropdown market-filter-button');
            prevPage = await el.find('market-button:first-child');
            nextPage = await el.find('market-button:last-child');
        });
        it('renders', async () => {
            const element = await page.find('market-pagination-nav');
            expect(element).toHaveAttribute('hydrated');
            expect(trigger).toBeNull();
        });
        it('renders disabled previous page button by default', async () => {
            const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
            expect(prevPage).toHaveAttribute('disabled');
            await prevPage.click();
            expect(marketInternalPaginationNavigationSpy).not.toHaveReceivedEvent();
        });
        it('renders disabled next page button by default', async () => {
            const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
            expect(nextPage).toHaveAttribute('disabled');
            await nextPage.click();
            expect(marketInternalPaginationNavigationSpy).not.toHaveReceivedEvent();
        });
    });
    it('disables the previous page button on the first page', async () => {
        page = await newE2EPage();
        await page.setContent('<market-pagination-nav current-page="1" page-size="10" total-pages="10"></market-pagination-nav>');
        const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
        el = await page.find('market-pagination-nav');
        prevPage = await el.find('market-button:first-child');
        expect(prevPage).toHaveAttribute('disabled');
        await prevPage.click();
        expect(marketInternalPaginationNavigationSpy).not.toHaveReceivedEvent();
    });
    it('enables the previous page button when hasPreviousPage is enabled', async () => {
        page = await newE2EPage();
        await page.setContent('<market-pagination-nav page-size="10" current-page="5" has-previous-page="true"></market-pagination-nav>');
        el = await page.find('market-pagination-nav');
        prevPage = await el.find('market-button:first-child');
        const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
        await prevPage.click();
        expect(marketInternalPaginationNavigationSpy).toHaveReceivedEventDetail({
            page: '4',
            pageSize: '10',
            prevPage: '5',
        });
    });
    it('disables the previous page button when hasPreviousPage is disabled', async () => {
        page = await newE2EPage();
        await page.setContent('<market-pagination-nav page-size="10" has-previous-page="false"></market-pagination-nav>');
        const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
        el = await page.find('market-pagination-nav');
        prevPage = await el.find('market-button:first-child');
        expect(prevPage).toHaveAttribute('disabled');
        await prevPage.click();
        expect(marketInternalPaginationNavigationSpy).not.toHaveReceivedEvent();
    });
    it('disables the next page button on the last page', async () => {
        page = await newE2EPage();
        await page.setContent('<market-pagination-nav current-page="10" page-size="10" total-pages="10"></market-pagination-nav>');
        const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
        el = await page.find('market-pagination-nav');
        nextPage = await el.find('market-button:last-child');
        expect(nextPage).toHaveAttribute('disabled');
        await nextPage.click();
        expect(marketInternalPaginationNavigationSpy).not.toHaveReceivedEvent();
    });
    it('enables the next page button when hasNextPage is enabled', async () => {
        page = await newE2EPage();
        await page.setContent('<market-pagination-nav page-size="10" current-page="5" has-next-page="true"></market-pagination-nav>');
        el = await page.find('market-pagination-nav');
        nextPage = await el.find('market-button:last-child');
        const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
        await nextPage.click();
        expect(marketInternalPaginationNavigationSpy).toHaveReceivedEventDetail({
            page: '6',
            pageSize: '10',
            prevPage: '5',
        });
    });
    it('disables the next page button when hasNextPage is disabled', async () => {
        page = await newE2EPage();
        await page.setContent('<market-pagination-nav page-size="10" has-next-page="false"></market-pagination-nav>');
        const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
        el = await page.find('market-pagination-nav');
        prevPage = await el.find('market-button:last-child');
        expect(prevPage).toHaveAttribute('disabled');
        await prevPage.click();
        expect(marketInternalPaginationNavigationSpy).not.toHaveReceivedEvent();
    });
    it('switches dropdown navigation to every 10 pages for large datasets', async () => {
        page = await newE2EPage();
        await page.setContent('<market-pagination-nav current-page="5" page-size="10" total-pages="56"></market-pagination-nav>');
        const marketInternalPaginationNavigationSpy = await page.spyOnEvent('marketInternalPaginationNavigation');
        el = await page.find('market-pagination-nav');
        trigger = await el.find('market-button-dropdown market-filter-button');
        prevPage = await el.find('market-button:first-child');
        nextPage = await el.find('market-button:last-child');
        expect(await el.find('market-row[value="5"]')).toBeNull();
        expect(await el.find('market-row[value="10"]')).toBeTruthy();
        expect(await el.find('market-row[value="20"]')).toBeTruthy();
        expect(await el.find('market-row[value="30"]')).toBeTruthy();
        expect(await el.find('market-row[value="40"]')).toBeTruthy();
        expect(await el.find('market-row[value="50"]')).toBeTruthy();
        expect(await el.find('market-row[value="60"]')).toBeNull();
        await prevPage.click();
        expect(marketInternalPaginationNavigationSpy).toHaveReceivedEventDetail({
            page: '4',
            pageSize: '10',
            prevPage: '5',
        });
        await nextPage.click();
        expect(marketInternalPaginationNavigationSpy).toHaveReceivedEventDetail({
            page: '6',
            pageSize: '10',
            prevPage: '5',
        });
        await trigger.click();
        await (await el.find('market-row[value="30"]')).click();
        expect(marketInternalPaginationNavigationSpy).toHaveReceivedEventDetail({
            page: '30',
            pageSize: '10',
            prevPage: '5',
        });
    });
    describe('localization support', () => {
        it('allows localized text to be passed in', async () => {
            page = await newE2EPage();
            await page.setContent(`<market-pagination-nav current-page="1" total-pages="10">
          <span slot="nav-label">Pagina</span>
          <span slot="nav-feedback">1 de 10</span>
        </market-pagination-nav>`);
            el = await page.find('market-pagination-nav');
            trigger = await el.find('market-button-dropdown market-filter-button');
            navLabel = await trigger.find('span[slot=nav-label]');
            navFeedback = await trigger.find('span[slot=nav-feedback]');
            expect(navLabel.textContent).toContain('Pagina');
            expect(navFeedback.textContent).toBe('1 de 10');
        });
    });
    describe('disabled attribute', () => {
        it('disables the navigation buttons', async () => {
            page = await newE2EPage();
            await page.setContent('<market-pagination-nav current-page="5" total-pages="10" page-size="10" disabled></market-pagination-nav>');
            el = await page.find('market-pagination-nav');
            trigger = await el.find('market-button-dropdown market-filter-button');
            prevPage = await el.find('market-button:first-child');
            nextPage = await el.find('market-button:last-child');
            expect(trigger).toHaveAttribute('disabled');
            expect(prevPage).toHaveAttribute('disabled');
            expect(nextPage).toHaveAttribute('disabled');
        });
    });
});
//# sourceMappingURL=market-pagination-nav.e2e.js.map
