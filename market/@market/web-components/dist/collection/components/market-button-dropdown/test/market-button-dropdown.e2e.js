import { newE2EPage } from "@stencil/core/testing";
describe('market-button-dropdown', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-button-dropdown>
        <market-button slot="trigger">Trigger</market-button>
        <div slot="content">Lorem ipsum dolor sit amet</div>
      </market-button-dropdown>
    `);
        const element = await page.find('market-button-dropdown');
        expect(element).toHaveAttribute('hydrated');
    });
    it('correctly passes aria- attributes required by screen readers', async () => {
        const CONTENT_ID = 'slotted-content-id';
        const page = await newE2EPage();
        await page.setContent(`
      <market-button-dropdown>
        <market-button slot="trigger">Trigger</market-button>
        <div slot="content" id=${CONTENT_ID}>Lorem ipsum dolor sit amet</div>
      </market-button-dropdown>
    `);
        const slottedTrigger = await page.find('[slot="trigger"]');
        const slottedContent = await page.find('[slot="content"]');
        expect(slottedTrigger).toEqualAttribute('aria-expanded', 'false');
        expect(slottedTrigger).toEqualAttribute('aria-controls', CONTENT_ID);
        expect(slottedContent).toEqualAttribute('id', CONTENT_ID);
        await slottedTrigger.click();
        expect(slottedTrigger).toEqualAttribute('aria-expanded', 'true');
    });
    it("can't be opened when disabled", async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-button-dropdown disabled>
        <market-button slot="trigger">Trigger</market-button>
        <div slot="content">Lorem ipsum dolor sit amet</div>
      </market-button-dropdown>
    `);
        const element = await page.find('market-button-dropdown');
        const trigger = await element.find('market-button');
        const popover = await element.find('pierce/market-dropdown [slot="popover"]');
        let buttonDropdownVisibility = await popover.isVisible();
        expect(buttonDropdownVisibility).toBe(false);
        await trigger.click();
        buttonDropdownVisibility = await popover.isVisible();
        expect(buttonDropdownVisibility).toBe(false);
    });
    it('passes its disabled state to its slotted <market-button>', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-button-dropdown disabled>
        <market-button slot="trigger">Trigger</market-button>
        <div slot="content">Lorem ipsum dolor sit amet</div>
      </market-button-dropdown>
    `);
        const buttonDropdown = await page.find('market-button-dropdown');
        expect(buttonDropdown).toHaveAttribute('disabled');
        const trigger = await page.find('market-button');
        expect(trigger).toHaveAttribute('disabled');
    });
    it("syncs its open/closed state with the slotted <market-button>'s up/down caret", async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-button-dropdown>
        <market-button slot="trigger">Trigger</market-button>
        <div slot="content">Lorem ipsum dolor sit amet</div>
      </market-button-dropdown>
    `);
        const el = await page.find('market-button-dropdown');
        const trigger = await el.find('market-button');
        const popover = await el.find('pierce/market-dropdown [slot="popover"]');
        // when dropdown is closed, caret should point down
        let buttonDropdownVisibility = await popover.isVisible();
        expect(buttonDropdownVisibility).toBe(false);
        let triggerCaret = await trigger.getProperty('caret');
        expect(triggerCaret).toBe('down');
        await trigger.click();
        // when dropdown is open (active), caret should point up
        buttonDropdownVisibility = await popover.isVisible();
        expect(buttonDropdownVisibility).toBe(true);
        triggerCaret = await trigger.getProperty('caret');
        expect(triggerCaret).toBe('up');
    });
    it('is compatible with a <market-filter-button> trigger', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-button-dropdown>
        <market-filter-button slot="trigger">Trigger</market-filter-button>
        <div slot="content">Lorem ipsum dolor sit amet</div>
      </market-button-dropdown>
    `);
        const el = await page.find('market-button-dropdown');
        const trigger = await el.find('market-filter-button');
        const popover = await el.find('pierce/market-dropdown [slot="popover"]');
        expect(await popover.isVisible()).toBe(false);
        await trigger.click();
        expect(await popover.isVisible()).toBe(true);
    });
    describe('when used with a slotted market-list', () => {
        it('market-row selections do not persist after the dropdown has been closed', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-button-dropdown>
          <market-button slot="trigger">Trigger</market-button>
          <market-list slot="content">
            <market-row>Apple</market-row>
            <market-row>Orange</market-row>
            <market-row>Banana</market-row>
          </market-list>
        </market-button-dropdown>
      `);
            const trigger = await page.find('market-button-dropdown market-button');
            const list = await page.find('market-button-dropdown market-list');
            const firstRow = await list.find('market-row');
            expect(await list.getProperty('transient')).toEqual(true);
            expect(await firstRow.getProperty('transient')).toEqual(true);
            expect(firstRow).not.toHaveAttribute('selected');
            await trigger.click(); // open popover
            await firstRow.click(); // clicking row closes popover
            await trigger.click(); // re-open popover
            expect(firstRow).not.toHaveAttribute('selected');
            // We check re-opening and re-clicking here, since we had a bug arise
            // where selection was persisted on re-open:
            // https://square.slack.com/archives/CTU91JFU0/p1635990917212700?thread_ts=1635809467.171900&cid=CTU91JFU0
            await trigger.click(); // open popover
            await firstRow.click(); // clicking row closes popover
            await trigger.click(); // re-open popover
            expect(firstRow).not.toHaveAttribute('selected');
        });
        it('persists row selections when persist-list option is passed', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-button-dropdown persist-list>
          <market-button slot="trigger">Trigger</market-button>
          <market-list slot="content">
            <market-row>Apple</market-row>
            <market-row>Orange</market-row>
            <market-row>Banana</market-row>
          </market-list>
        </market-button-dropdown>
      `);
            const trigger = await page.find('market-button-dropdown market-button');
            const list = await page.find('market-button-dropdown market-list');
            const firstRow = await list.find('market-row');
            expect(await list.getProperty('transient')).toEqual(false);
            expect(await firstRow.getProperty('transient')).toEqual(false);
            expect(firstRow).not.toHaveAttribute('selected');
            await trigger.click(); // open popover
            await firstRow.click(); // clicking row closes popover
            await trigger.click(); // re-open popover
            expect(firstRow).toHaveAttribute('selected');
            await trigger.click(); // open popover
            await firstRow.click(); // clicking row closes popover
            await trigger.click(); // re-open popover
            expect(firstRow).toHaveAttribute('selected');
        });
    });
});
//# sourceMappingURL=market-button-dropdown.e2e.js.map
