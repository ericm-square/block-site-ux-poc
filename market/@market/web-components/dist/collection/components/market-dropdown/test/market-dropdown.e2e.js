import { newE2EPage } from "@stencil/core/testing";
describe('market-dropdown', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown>
        <market-link slot="trigger">Trigger</market-link>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
    `);
        const element = await page.find('market-dropdown');
        expect(element).toHaveAttribute('hydrated');
    });
    it('correctly passes aria- attributes required by screen readers', async () => {
        const POPOVER_ID = 'slotted-popover-id';
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown>
        <market-link slot="trigger">Trigger</market-link>
        <market-popover slot="popover" id=${POPOVER_ID}>Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
    `);
        const slottedTrigger = await page.find('[slot="trigger"]');
        const slottedPopover = await page.find('[slot="popover"]');
        expect(slottedTrigger).toEqualAttribute('aria-expanded', 'false');
        expect(slottedTrigger).toEqualAttribute('aria-controls', POPOVER_ID);
        expect(slottedPopover).toEqualAttribute('id', POPOVER_ID);
        await slottedTrigger.click();
        expect(slottedTrigger).toEqualAttribute('aria-expanded', 'true');
    });
    it('passes its disabled state to slotted <market-link>s', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown disabled>
        <market-link href="#" slot="trigger">Trigger</market-link>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
    `);
        const dropdown = await page.find('market-dropdown');
        expect(dropdown).toHaveAttribute('disabled');
        const link = await page.find('market-link');
        expect(link).toHaveAttribute('disabled');
        const innerLink = await link.find('pierce/a');
        expect(innerLink).toEqualAttribute('aria-disabled', 'true');
    });
    it('passes its disabled state to slotted <market-button>s', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown disabled>
        <market-button slot="trigger">Trigger</market-button>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
    `);
        const dropdown = await page.find('market-dropdown');
        expect(dropdown).toHaveAttribute('disabled');
        const button = await page.find('market-button');
        expect(button).toHaveAttribute('disabled');
    });
    it('clicking on a closed dropdown should toggle the popover open and closed', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown>
        <market-button slot="trigger">Trigger</market-button>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
    `);
        const trigger = await page.find('market-button');
        const popover = await page.find('market-popover');
        let popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
        await trigger.click();
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(true);
    });
    it('if interaction="hover", mousing over a closed dropdown should open it & mousing out should close it', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown interaction="hover">
        <market-button slot="trigger">Trigger</market-button>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
      <div>Some other element</div>
    `);
        const trigger = await page.find('market-button');
        const popover = await page.find('market-popover');
        const otherElement = await page.find('div');
        let popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
        await trigger.hover(); // hovering on dropdown trigger
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(true);
        await otherElement.hover(); // hovering on some other element
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
    });
    it('if interaction="persistent", only clicks to the trigger should toggle the dropdown open/closed', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown interaction="persistent">
        <market-button slot="trigger">Trigger</market-button>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
      <div>Some other element</div>
    `);
        const trigger = await page.find('market-button');
        const popover = await page.find('market-popover');
        let popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
        await trigger.click();
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(true);
        await popover.click();
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(true);
        await trigger.click();
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
    });
    it('if interaction="none", mouse events should not toggle the dropdown open/closed', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown interaction="none">
        <market-button slot="trigger">Trigger</market-button>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
    `);
        const trigger = await page.find('market-button');
        const popover = await page.find('market-popover');
        let popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
        await trigger.hover();
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
        await trigger.click();
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
    });
    it('clicks outside the dropdown should close the dropdown', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown>
        <market-button slot="trigger">Trigger</market-button>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>
      <div>Some other element</div>
    `);
        const trigger = await page.find('market-button');
        const popover = await page.find('market-popover');
        const otherElement = await page.find('div');
        let popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
        await trigger.click(); // open popover
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(true);
        await otherElement.click(); // click an unrelated element
        popoverVisibility = await popover.isVisible();
        expect(popoverVisibility).toBe(false);
    });
    it('clicking on a component using dropdown should open it and close all other components w/ dropdown functionality on the page', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dropdown>
        <market-button slot="trigger">Dropdown</market-button>
        <market-popover slot="popover">Lorem ipsum dolor sit amet</market-popover>
      </market-dropdown>

      <market-button-dropdown>
        <market-button slot="trigger">Button</market-button>
        <span slot="content">Lorem ipsum dolor sit amet</span>
      </market-button-dropdown>

      <market-tooltip>
        <span slot="trigger">Tooltip</span>
        <span slot="content">Lorem ipsum dolor sit amet <a href="#">Link</a></span>
      </market-tooltip>
    `);
        const dropdownTrigger = await page.find('market-dropdown market-button');
        const dropdownPopover = await page.find('market-dropdown market-popover');
        const buttonDropdown = await page.find('market-button-dropdown');
        const buttonDropdownTrigger = await buttonDropdown.find('market-button');
        const buttonDropdownPopover = await buttonDropdown.find('pierce/market-dropdown [slot="popover"]');
        const tooltip = await page.find('market-tooltip');
        const tooltipTrigger = await tooltip.find('span[slot="trigger"]');
        const tooltipPopover = await tooltip.find('pierce/market-dropdown [slot="popover"]');
        let dropdownVisibility = await dropdownPopover.isVisible();
        expect(dropdownVisibility).toBe(false);
        let buttonDropdownVisibility = await buttonDropdownPopover.isVisible();
        expect(buttonDropdownVisibility).toBe(false);
        let tooltipVisibility = await tooltipPopover.isVisible();
        expect(tooltipVisibility).toBe(false);
        // clicking <market-dropdown> should open it, other components are closed
        await dropdownTrigger.click();
        dropdownVisibility = await dropdownPopover.isVisible();
        expect(dropdownVisibility).toBe(true);
        buttonDropdownVisibility = await buttonDropdownPopover.isVisible();
        expect(buttonDropdownVisibility).toBe(false);
        tooltipVisibility = await tooltipPopover.isVisible();
        expect(tooltipVisibility).toBe(false);
        // clicking <market-button-dropdown> should open it, other components are closed
        await buttonDropdownTrigger.click();
        dropdownVisibility = await dropdownPopover.isVisible();
        expect(dropdownVisibility).toBe(false);
        buttonDropdownVisibility = await buttonDropdownPopover.isVisible();
        expect(buttonDropdownVisibility).toBe(true);
        tooltipVisibility = await tooltipPopover.isVisible();
        expect(tooltipVisibility).toBe(false);
        // clicking <market-tooltip> should open it, other components are closed
        await tooltipTrigger.click();
        dropdownVisibility = await dropdownPopover.isVisible();
        expect(dropdownVisibility).toBe(false);
        buttonDropdownVisibility = await buttonDropdownPopover.isVisible();
        expect(buttonDropdownVisibility).toBe(false);
        tooltipVisibility = await tooltipPopover.isVisible();
        expect(tooltipVisibility).toBe(true);
    });
    describe('preventDefault', () => {
        it('prevents dropdown from opening on click', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-dropdown>
          <market-link slot="trigger">Link</market-link>
          <market-popover slot="popover">Boo</market-popover>
        </market-dropdown>
      `);
            const element = await page.find('market-dropdown');
            const triggerEl = await element.find('pierce/market-link');
            const popoverEl = await element.find('pierce/market-popover');
            await page.$eval('market-dropdown', (el) => {
                el.addEventListener('marketDropdownOpened', (e) => {
                    e.preventDefault();
                });
            });
            expect(await popoverEl.isVisible()).toBe(false);
            await triggerEl.click();
            await page.waitForChanges();
            expect(await popoverEl.isVisible()).toBe(false); // still closed
        });
        it('prevents dropdown from opening on hover', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-dropdown interaction="hover">
          <market-link slot="trigger">Link</market-link>
          <market-popover slot="popover">Boo</market-popover>
        </market-dropdown>
      `);
            const element = await page.find('market-dropdown');
            const triggerEl = await element.find('pierce/market-link');
            const popoverEl = await element.find('pierce/market-popover');
            await page.$eval('market-dropdown', (el) => {
                el.addEventListener('marketDropdownOpened', (e) => {
                    e.preventDefault();
                });
            });
            expect(await popoverEl.isVisible()).toBe(false);
            await triggerEl.hover();
            await page.waitForChanges();
            expect(await popoverEl.isVisible()).toBe(false); // still closed
        });
        it('prevents dropdown from closing on click', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-dropdown>
          <market-link slot="trigger">Link</market-link>
          <market-popover slot="popover">Boo</market-popover>
        </market-dropdown>
      `);
            const element = await page.find('market-dropdown');
            const triggerEl = await element.find('pierce/market-link');
            const popoverEl = await element.find('pierce/market-popover');
            await page.$eval('market-dropdown', (el) => {
                el.addEventListener('marketDropdownClosed', (e) => {
                    e.preventDefault();
                });
            });
            await triggerEl.click();
            await page.waitForChanges();
            expect(await popoverEl.isVisible()).toBe(true);
            await triggerEl.click();
            await page.waitForChanges();
            expect(await popoverEl.isVisible()).toBe(true); // still opened
        });
        it('prevents dropdown from closing on hover', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-dropdown interaction="hover">
          <market-link slot="trigger">Link</market-link>
          <market-popover slot="popover">Boo</market-popover>
        </market-dropdown>
        <div data-test-id="other">bye</div>
      `);
            const element = await page.find('market-dropdown');
            const triggerEl = await element.find('pierce/market-link');
            const popoverEl = await element.find('pierce/market-popover');
            const otherEl = await page.find('[data-test-id="other"]');
            await page.$eval('market-dropdown', (el) => {
                el.addEventListener('marketDropdownClosed', (e) => {
                    e.preventDefault();
                });
            });
            await triggerEl.hover();
            await page.waitForChanges();
            expect(await popoverEl.isVisible()).toBe(true);
            await otherEl.hover();
            await page.waitForChanges();
            expect(await popoverEl.isVisible()).toBe(true); // still opened
        });
    });
});
//# sourceMappingURL=market-dropdown.e2e.js.map
