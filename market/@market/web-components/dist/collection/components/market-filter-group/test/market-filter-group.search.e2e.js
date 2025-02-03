import { CORE_ANIMATION_EXIT_TRANSITION_FAST_SPEED_DURATION } from "@market/market-theme/js/cjs/index.js";
import { newE2EPage } from "@stencil/core/testing";
describe('market-filter-group: search', () => {
    let page;
    let element;
    let inputSearchEl;
    it('displays the search input', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-filter-group>
        <market-input-search slot="search"></market-input-search>
      </market-filter-group>
    `);
        element = await page.find('market-filter-group');
        inputSearchEl = await element.find('pierce/market-input-search');
        expect(inputSearchEl).toBeVisible();
    });
    describe('compact', () => {
        let page;
        let element;
        let inputSearchEl;
        let filterEls;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter-group>
          <market-input-search slot="search"></market-input-search>
          <market-filter name="color" slot="filters">
            <label slot="label">Color</label>
          </market-filter>
          <market-filter name="size" slot="filters">
            <label slot="label">Size</label>
          </market-filter>
          <market-filter disabled name="start-date" slot="filters">
            <label slot="label">Start date</label>
          </market-filter>
          <market-filter disabled name="end-date" slot="filters">
            <label slot="label">End date</label>
          </market-filter>
        </market-filter-group>
      `);
            await page.waitForChanges();
            element = await page.find('market-filter-group');
            inputSearchEl = await element.find('market-input-search');
            filterEls = await element.findAll('market-filter');
        });
        it('focuses on inner input when tabbed into', async () => {
            await page.focus('body');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(inputSearchEl).toHaveAttribute('focused');
            const focusedInput = await inputSearchEl.find('pierce/input:focus');
            expect(focusedInput).not.toBeNull();
        });
        it('hides filters when focused on, shows them otherwise; loses focus when another element is clicked', async () => {
            await inputSearchEl.click();
            await new Promise((r) => setTimeout(r, CORE_ANIMATION_EXIT_TRANSITION_FAST_SPEED_DURATION * 2));
            expect(filterEls[0]).not.toBeVisible();
            expect(filterEls[1]).not.toBeVisible();
            expect(filterEls[2]).not.toBeVisible();
            expect(filterEls[3]).not.toBeVisible();
            await page.click('body'); // focus on something else; blurs search input
            await new Promise((r) => setTimeout(r, CORE_ANIMATION_EXIT_TRANSITION_FAST_SPEED_DURATION * 2));
            expect(filterEls[0]).toBeVisible();
            expect(filterEls[1]).toBeVisible();
            expect(filterEls[2]).toBeVisible();
            expect(filterEls[3]).not.toBeVisible();
        });
        it('hides filters when focused on, shows them otherwise; loses focus when back button is clicked', async () => {
            await inputSearchEl.click();
            await page.waitForChanges();
            await new Promise((r) => setTimeout(r, CORE_ANIMATION_EXIT_TRANSITION_FAST_SPEED_DURATION * 2));
            expect(filterEls[0]).not.toBeVisible();
            expect(filterEls[1]).not.toBeVisible();
            expect(filterEls[2]).not.toBeVisible();
            expect(filterEls[3]).not.toBeVisible();
            const backButtonEl = await inputSearchEl.find('pierce/market-accessory');
            await backButtonEl.click();
            await page.waitForChanges();
            await new Promise((r) => setTimeout(r, CORE_ANIMATION_EXIT_TRANSITION_FAST_SPEED_DURATION * 2));
            expect(filterEls[0]).toBeVisible();
            expect(filterEls[1]).toBeVisible();
            expect(filterEls[2]).toBeVisible();
            expect(filterEls[3]).not.toBeVisible();
        });
        it('focuses on first filter when tabbing out of the search input', async () => {
            await inputSearchEl.click();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            await new Promise((r) => setTimeout(r, CORE_ANIMATION_EXIT_TRANSITION_FAST_SPEED_DURATION * 2));
            const colorFilterEl = await page.find('pierce/market-filter[name="color"]');
            const filterButtonEl = await colorFilterEl.find('pierce/market-filter-button');
            const buttonEl = await filterButtonEl.find('pierce/button:focus');
            expect(buttonEl).not.toBeNull();
        });
    });
});
//# sourceMappingURL=market-filter-group.search.e2e.js.map
