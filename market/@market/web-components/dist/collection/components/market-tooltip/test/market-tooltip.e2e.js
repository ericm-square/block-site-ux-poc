import { newE2EPage } from "@stencil/core/testing";
describe('market-tooltip', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-tooltip>
        <span slot="content">Lorem ipsum dolor sit amet <a href="#">Link</a></span>
      </market-tooltip>
    `);
        const element = await page.find('market-tooltip');
        expect(element).toHaveAttribute('hydrated');
    });
    it("can't be opened when disabled", async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-tooltip interaction="click" disabled>
        <span slot="trigger">Trigger text</span>
        <span slot="content">Lorem ipsum dolor sit amet <a href="#">Link</a></span>
      </market-tooltip>
    `);
        const tooltip = await page.find('market-tooltip');
        const trigger = await tooltip.find('[slot="trigger"]');
        const popover = await tooltip.find('pierce/market-dropdown [slot="popover"]');
        let tooltipVisibility = await popover.isVisible();
        expect(tooltipVisibility).toBe(false);
        await trigger.click();
        tooltipVisibility = await popover.isVisible();
        expect(tooltipVisibility).toBe(false);
    });
    it('mousing over a closed tooltip should open it & mousing out should close it', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-tooltip>
        <span slot="trigger">Trigger text</span>
        <span slot="content">Lorem ipsum dolor sit amet <a href="#">Link</a></span>
      </market-tooltip>
      <div>Some other element</div>
    `);
        const tooltip = await page.find('market-tooltip');
        const trigger = await tooltip.find('[slot="trigger"]');
        const popover = await tooltip.find('pierce/market-dropdown [slot="popover"]');
        const otherElement = await page.find('div');
        let tooltipVisibility = await popover.isVisible();
        expect(tooltipVisibility).toBe(false);
        await trigger.hover(); // hovering on tooltip trigger
        tooltipVisibility = await popover.isVisible();
        expect(tooltipVisibility).toBe(true);
        await otherElement.hover(); // hovering on some other element
        tooltipVisibility = await popover.isVisible();
        expect(tooltipVisibility).toBe(false);
    });
    it('should open and close via component methods', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-tooltip>
        <span slot="trigger">Trigger text</span>
        <span slot="content">Lorem ipsum dolor sit amet <a href="#">Link</a></span>
      </market-tooltip>
      <div>Some other element</div>
    `);
        const tooltip = await page.find('market-tooltip');
        const popover = await tooltip.find('pierce/market-dropdown [slot="popover"]');
        let tooltipVisibility = await popover.isVisible();
        expect(tooltipVisibility).toBe(false);
        tooltip.callMethod('openTooltip');
        tooltipVisibility = await popover.isVisible();
        expect(tooltipVisibility).toBe(true);
        tooltip.callMethod('closeTooltip');
        tooltipVisibility = await popover.isVisible();
        expect(tooltipVisibility).toBe(false);
    });
});
//# sourceMappingURL=market-tooltip.e2e.js.map
