import { newE2EPage } from "@stencil/core/testing";
describe('market-accordion-item', () => {
    let page;
    let element;
    let button;
    let expandedChangeEvent;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-accordion-item name="mock-accordion">
        <span slot="label">Accordion Label</span>
        <p id="content">mockContent</p>
      </market-accordion-item>
    `);
        element = await page.find('market-accordion-item');
        button = await element.find('pierce/button');
        expandedChangeEvent = await page.spyOnEvent('marketAccordionItemExpandedChange');
    });
    it('renders', async () => {
        expect(element).toHaveAttribute('hydrated');
        expect(button.innerHTML).toContain('<slot name="label"></slot>');
        expect(await element.find('pierce/div')).toBeNull();
    });
    it('opens and closes when the label button is clicked', async () => {
        await button.click();
        await page.waitForChanges();
        expect(expandedChangeEvent).toHaveReceivedEventTimes(1);
        expect(expandedChangeEvent.lastEvent.detail.expanded).toEqual(true);
        expect(await element.find('pierce/div')).not.toBeNull();
        await button.click();
        await page.waitForChanges();
        expect(expandedChangeEvent).toHaveReceivedEventTimes(2);
        expect(expandedChangeEvent.lastEvent.detail.expanded).toEqual(false);
        expect(await element.find('pierce/div')).toBeNull();
    });
    describe('when preventDefault() is called on the event', () => {
        beforeEach(async () => {
            await page.$eval('market-accordion-item', (el) => {
                el.addEventListener('marketAccordionItemExpandedChange', (e) => e.preventDefault());
            });
            await page.waitForChanges();
        });
        it('does NOT open when the label button is clicked', async () => {
            await button.click();
            await page.waitForChanges();
            expect(await element.find('pierce/div')).toBeNull();
        });
    });
});
//# sourceMappingURL=market-accordion-item.e2e.js.map
