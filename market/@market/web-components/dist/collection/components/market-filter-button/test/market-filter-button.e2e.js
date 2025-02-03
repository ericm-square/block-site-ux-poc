import { newE2EPage } from "@stencil/core/testing";
describe('market-filter-button', () => {
    it('renders with all defaults', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-button>
        Label
        <span slot="feedback">Feedback</span>
      </market-filter-button>
    `);
        const element = await page.find('market-filter-button');
        const button = await element.find('pierce/button');
        const label = await element.find('pierce/.label');
        const svg = await element.find('pierce/svg');
        expect(element).toEqualAttribute('size', 'medium');
        expect(element).not.toHaveAttribute('disabled');
        expect(button).toEqualAttribute('type', 'button');
        expect(button).not.toHaveAttribute('aria-disabled');
        expect(button).not.toHaveAttribute('tabindex');
        expect(await label.isVisible()).toBe(true);
        expect(await svg.isVisible()).toBe(false);
    });
    it('can display an icon instead of the label text', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-button icon-only>
        Label
        <span slot="feedback">Feedback</span>
      </market-filter-button>
    `);
        const element = await page.find('market-filter-button');
        const label = await element.find('pierce/.label');
        const svg = await element.find('pierce/svg');
        expect(await label.isVisible()).toBe(false);
        expect(await svg.isVisible()).toBe(true);
    });
    it('can update size', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-button size="small">
        Label
        <span slot="feedback">Feedback</span>
      </market-filter-button>
    `);
        const element = await page.find('market-filter-button');
        expect(element).toEqualAttribute('size', 'small');
    });
    it('can be disabled', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-button disabled>
        Label
        <span slot="feedback">Feedback</span>
      </market-filter-button>
    `);
        const element = await page.find('market-filter-button');
        const button = await element.find('pierce/button');
        expect(element).toHaveAttribute('disabled');
        expect(button).toHaveAttribute('aria-disabled');
    });
    it('does not emit click events when disabled', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-filter-button disabled>
        Label
        <span slot="feedback">Feedback</span>
      </market-filter-button>
    `);
        const element = await page.find('market-filter-button');
        const elementClickSpy = await element.spyOnEvent('click');
        await page.click('market-filter-button');
        await page.waitForChanges();
        expect(elementClickSpy).not.toHaveReceivedEvent();
    });
});
//# sourceMappingURL=market-filter-button.e2e.js.map
