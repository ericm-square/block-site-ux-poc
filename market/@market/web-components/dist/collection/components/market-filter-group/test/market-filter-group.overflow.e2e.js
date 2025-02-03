import { newE2EPage } from "@stencil/core/testing";
describe('market-filter-group: overflow', () => {
    let page;
    let element;
    let colorFilterEl;
    let sizeFilterEl;
    let startDateFilterEl;
    let endDateFilterEl;
    let shapeFilterEl;
    let amountFilterEl;
    let dropdownMenuEl;
    let dropdownMenuButtonEl;
    let popoverEl;
    const openDropdown = async () => {
        popoverEl = await dropdownMenuEl.find('pierce/market-popover');
        expect(await popoverEl.isVisible()).toBe(false);
        await dropdownMenuButtonEl.click();
        expect(await popoverEl.isVisible()).toBe(true);
        endDateFilterEl = await dropdownMenuEl.find('pierce/market-row[value="end-date"]');
        shapeFilterEl = await dropdownMenuEl.find('pierce/market-row[value="shape"]');
        amountFilterEl = await dropdownMenuEl.find('pierce/market-row[value="amount"]');
    };
    const getDropdownFilterList = async () => dropdownMenuEl.find('pierce/market-list.filter-list');
    const isFilterListVisible = async () => {
        const filterListEl = await getDropdownFilterList();
        return filterListEl ? filterListEl.isVisible() : Promise.resolve(false);
    };
    const getDropdownFilterOptions = async () => dropdownMenuEl.find('[slot="filter-options"]');
    const isFilterOptionsVisible = async () => {
        const filterOptionsEl = await getDropdownFilterOptions();
        return filterOptionsEl ? filterOptionsEl.isVisible() : Promise.resolve(false);
    };
    const getBackButtonEl = async () => popoverEl.find('pierce/market-header market-button[slot="navigation"]');
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-filter-group>
        <market-filter name="color" slot="filters">
          <label slot="label">Color</label>
        </market-filter>
        <market-filter name="size" slot="filters">
          <label slot="label">Size</label>
        </market-filter>
        <market-filter disabled name="start-date" slot="filters">
          <label slot="label">Start date</label>
        </market-filter>
        <!-- filter visibility cutoff here -->
        <market-filter disabled name="end-date" slot="filters">
          <label slot="label">End date</label>
        </market-filter>
        <market-filter name="shape" slot="filters">
          <label slot="label">Shape</label>
          <market-list multiselect slot="list" value="square">
            <market-row value="square">
              <label slot="label">Square</label>
            </market-row>
            <market-row value="circle">
              <label slot="label">Circle</label>
            </market-row>
            <market-row value="triangle">
              <label slot="label">Triangle</label>
            </market-row>
          </market-list>
        </market-filter>
        <market-filter name="amount" slot="filters">
          <label slot="label">Amount</label>
          <market-list slot="list">
            <market-row>
              <label slot="label">None</label>
            </market-row>
            <market-row value="1">
              <label slot="label">1</label>
            </market-row>
            <market-row value="2">
              <label slot="label">2</label>
            </market-row>
            <market-row value="3">
              <label slot="label">3</label>
            </market-row>
          </market-list>
        </market-filter>
      </market-filter-group>
    `);
        await page.waitForChanges();
        element = await page.find('market-filter-group');
        colorFilterEl = await element.find('market-filter[name="color"]');
        sizeFilterEl = await element.find('market-filter[name="size"]');
        startDateFilterEl = await element.find('market-filter[name="start-date"]');
        endDateFilterEl = await element.find('market-filter[name="end-date"]');
        shapeFilterEl = await element.find('market-filter[name="shape"]');
        amountFilterEl = await element.find('market-filter[name="amount"]');
        dropdownMenuEl = await element.find('pierce/market-filter-dropdown-menu');
        dropdownMenuButtonEl = await dropdownMenuEl.find('pierce/market-filter-button');
    });
    it('does not show more than 3 filters', async () => {
        expect(await colorFilterEl.isVisible()).toBe(true);
        expect(await sizeFilterEl.isVisible()).toBe(true);
        expect(await startDateFilterEl.isVisible()).toBe(true);
        expect(await endDateFilterEl.isVisible()).toBe(false);
        expect(await shapeFilterEl.isVisible()).toBe(false);
        expect(await amountFilterEl.isVisible()).toBe(false);
    });
    it('dropdown shows overflowed filters', async () => {
        await openDropdown();
        expect(await isFilterListVisible()).toBe(true);
        expect(await endDateFilterEl.isVisible()).toBe(true);
        expect(await shapeFilterEl.isVisible()).toBe(true);
        expect(await amountFilterEl.isVisible()).toBe(true);
    });
    it('disabled filter in dropdown menu cannot be selected', async () => {
        await openDropdown();
        expect(endDateFilterEl).toHaveAttribute('disabled');
        await endDateFilterEl.click();
        expect(await isFilterOptionsVisible()).toBe(false);
    });
    it('displays the dropdown menu button with feedback', async () => {
        expect(await dropdownMenuEl.isVisible()).toBe(true);
        expect(dropdownMenuButtonEl.textContent).toBe('1'); // 'shape' filter has a default value
    });
    describe('max-visible-filters', () => {
        it('has a value of 0', async () => {
            element.setAttribute('max-visible-filters', 0);
            await page.waitForChanges();
            expect(await colorFilterEl.isVisible()).toBe(false);
            expect(await sizeFilterEl.isVisible()).toBe(false);
            expect(await startDateFilterEl.isVisible()).toBe(false);
            expect(await endDateFilterEl.isVisible()).toBe(false);
            expect(await shapeFilterEl.isVisible()).toBe(false);
            expect(await amountFilterEl.isVisible()).toBe(false);
        });
        it('has a value of 1', async () => {
            element.setAttribute('max-visible-filters', 1);
            await page.waitForChanges();
            expect(await colorFilterEl.isVisible()).toBe(true);
            expect(await sizeFilterEl.isVisible()).toBe(false);
            expect(await startDateFilterEl.isVisible()).toBe(false);
            expect(await endDateFilterEl.isVisible()).toBe(false);
            expect(await shapeFilterEl.isVisible()).toBe(false);
            expect(await amountFilterEl.isVisible()).toBe(false);
        });
        it('has a value of 5', async () => {
            element.setAttribute('max-visible-filters', 5);
            await page.waitForChanges();
            expect(await colorFilterEl.isVisible()).toBe(true);
            expect(await sizeFilterEl.isVisible()).toBe(true);
            expect(await startDateFilterEl.isVisible()).toBe(true);
            expect(await endDateFilterEl.isVisible()).toBe(true);
            expect(await shapeFilterEl.isVisible()).toBe(true);
            expect(await amountFilterEl.isVisible()).toBe(false);
        });
        it('has a massive value', async () => {
            element.setAttribute('max-visible-filters', Number.MAX_SAFE_INTEGER);
            await page.waitForChanges();
            expect(await colorFilterEl.isVisible()).toBe(true);
            expect(await sizeFilterEl.isVisible()).toBe(true);
            expect(await startDateFilterEl.isVisible()).toBe(true);
            expect(await endDateFilterEl.isVisible()).toBe(true);
            expect(await shapeFilterEl.isVisible()).toBe(true);
            expect(await amountFilterEl.isVisible()).toBe(true);
        });
    });
    describe('selects a filter', () => {
        it('displays selected filter’s options', async () => {
            await openDropdown();
            // filter options not shown yet
            expect(await getDropdownFilterOptions()).toBeNull();
            await amountFilterEl.click();
            expect(await isFilterOptionsVisible()).toBe(true);
            const listOptionsEl = await getDropdownFilterOptions();
            expect(await (await listOptionsEl.find('market-row[value="1"]')).isVisible()).toBe(true);
            expect(await (await listOptionsEl.find('market-row[value="2"]')).isVisible()).toBe(true);
            expect(await (await listOptionsEl.find('market-row[value="3"]')).isVisible()).toBe(true);
        });
        it('back button', async () => {
            await openDropdown();
            // back button isn't displayed yet until we select a filter
            expect(await getBackButtonEl()).toBeNull();
            // select a filter
            await amountFilterEl.click();
            expect(await isFilterOptionsVisible()).toBe(true);
            // click on back button to go back to filter list
            const backButtonEl = await getBackButtonEl();
            await backButtonEl.click();
            expect(await isFilterListVisible()).toBe(true);
        });
        it('emits event when a filter is selected in the overflow menu', async () => {
            const filterGroupEventSpy = await element.spyOnEvent('marketFilterValueDidChange');
            const filterEventSpy = await shapeFilterEl.spyOnEvent('marketFilterValueDidChange');
            await openDropdown();
            await shapeFilterEl.click();
            const circleValueRowEl = await dropdownMenuEl.find('pierce/market-row[value="circle"]');
            await circleValueRowEl.click();
            expect(filterEventSpy).toHaveReceivedEventTimes(1);
            expect(filterEventSpy).toHaveReceivedEventDetail({
                name: 'shape',
                prevValue: 'square',
                value: ['square', 'circle'],
            });
            expect(filterGroupEventSpy).toHaveReceivedEventTimes(1);
            expect(filterGroupEventSpy).toHaveReceivedEventDetail({
                name: 'shape',
                prevValue: 'square',
                value: ['square', 'circle'],
            });
        });
        describe('single select list', () => {
            it('can select; exits option list after selection', async () => {
                await openDropdown();
                await amountFilterEl.click();
                expect(await isFilterOptionsVisible()).toBe(true);
                const oneValueRowEl = await dropdownMenuEl.find('pierce/market-row[value="1"]');
                await oneValueRowEl.click();
                expect(await isFilterListVisible()).toBe(true);
            });
            it('feedback is updated after selection', async () => {
                expect(dropdownMenuButtonEl.textContent).toBe('1');
                await openDropdown();
                // add selection on 'amount' filter, feedback becomes '2'
                await amountFilterEl.click();
                const oneValueRowEl = await dropdownMenuEl.find('pierce/market-row[value="1"]');
                await oneValueRowEl.click();
                expect(dropdownMenuButtonEl.textContent).toBe('2');
                // remove selection on 'amount' filter, feedback becomes '1'
                await amountFilterEl.click();
                const noneValueRowEl = await dropdownMenuEl.find('pierce/market-row:not([value])');
                await noneValueRowEl.click();
                expect(dropdownMenuButtonEl.textContent).toBe('1');
            });
        });
        describe('multi select list', () => {
            it('can select; does not exit option list after selection', async () => {
                await openDropdown();
                await shapeFilterEl.click();
                expect(await isFilterOptionsVisible()).toBe(true);
                const squareValueEl = await dropdownMenuEl.find('pierce/market-row[value="square"]');
                await squareValueEl.click();
                expect(await isFilterOptionsVisible()).toBe(true);
                const circleValueEl = await dropdownMenuEl.find('pierce/market-row[value="circle"]');
                await circleValueEl.click();
                expect(await isFilterOptionsVisible()).toBe(true);
                const triangleValueEl = await dropdownMenuEl.find('pierce/market-row[value="triangle"]');
                await triangleValueEl.click();
                expect(await isFilterOptionsVisible()).toBe(true);
            });
            it('feedback is updated after selection', async () => {
                // 'shape' filter has a default value of 'square'
                expect(dropdownMenuButtonEl.textContent).toBe('1');
                await openDropdown();
                await shapeFilterEl.click();
                // deselect 'square'
                const squareValueEl = await dropdownMenuEl.find('pierce/market-row[value="square"]');
                await squareValueEl.click();
                expect(dropdownMenuButtonEl.textContent).toBe('0');
                // select 'circle', feedback becomes '1'
                const circleValueEl = await dropdownMenuEl.find('pierce/market-row[value="circle"]');
                await circleValueEl.click();
                expect(dropdownMenuButtonEl.textContent).toBe('1');
                // select 'triangle', feedback stays at '1'
                const triangleValueEl = await dropdownMenuEl.find('pierce/market-row[value="triangle"]');
                await triangleValueEl.click();
                expect(dropdownMenuButtonEl.textContent).toBe('1');
                // unselect all / multiple options, feedback becomes '0'
                await circleValueEl.click();
                await triangleValueEl.click();
                expect(dropdownMenuButtonEl.textContent).toBe('0');
            });
        });
    });
});
//# sourceMappingURL=market-filter-group.overflow.e2e.js.map
