import { newE2EPage } from "@stencil/core/testing";
describe('market-table-column', () => {
    it('does not emit an event on click if it is not sortable', async () => {
        const page = await newE2EPage();
        await page.setContent("<market-table-column name='test'>Can't sort me</market-table-column>");
        const columnSelected = await page.spyOnEvent('marketTableColumnSort');
        const el = await page.find('market-table-column');
        await el.click();
        await page.waitForChanges();
        expect(columnSelected).toHaveReceivedEventTimes(0);
    });
    it('emits an event on click if it is sortable', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-column sortable name="test">Sort Me</market-table-column>');
        const columnSelected = await page.spyOnEvent('marketTableColumnSort');
        const el = await page.find('market-table-column');
        await el.click();
        await page.waitForChanges();
        expect(columnSelected).toHaveReceivedEventTimes(1);
        expect(columnSelected.lastEvent.detail.previousSortOrder).toBe(undefined);
        el.setAttribute('sort-order', 'ascending');
        await page.waitForChanges();
        await el.click();
        await page.waitForChanges();
        expect(columnSelected).toHaveReceivedEventTimes(2);
        expect(columnSelected.lastEvent.detail.previousSortOrder).toBe('ascending');
    });
    it('can stick and unstick itself', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-column name="test" slot="starting-slot">Column content</market-table-column>');
        const el = await page.find('market-table-column');
        await el.callMethod('_stickSelf', 'left');
        await page.waitForChanges();
        expect(el).toEqualAttribute('slot', 'sticky-left');
        await el.callMethod('_stickSelf', 'right');
        await page.waitForChanges();
        expect(el).toEqualAttribute('slot', 'sticky-right');
        await el.callMethod('_unstickSelf', '');
        await page.waitForChanges();
        expect(el).toEqualAttribute('slot', 'starting-slot');
    });
    it('emits the correct sticky events on changes to the stick-to property', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-column name="test">Column content</market-table-column>');
        const el = await page.find('market-table-column');
        const columnStuck = await page.spyOnEvent('marketTableColumnStick');
        const columnUnstuck = await page.spyOnEvent('marketTableColumnUnstick');
        el.setAttribute('stick-to', 'left');
        await page.waitForChanges();
        expect(columnStuck).toHaveReceivedEventTimes(1);
        expect(columnStuck.lastEvent.detail.position).toBe('left');
        el.setAttribute('stick-to', 'right');
        await page.waitForChanges();
        expect(columnStuck).toHaveReceivedEventTimes(2);
        expect(columnStuck.lastEvent.detail.position).toBe('right');
        el.removeAttribute('stick-to');
        await page.waitForChanges();
        expect(columnUnstuck).toHaveReceivedEventTimes(1);
        expect(columnUnstuck.lastEvent.detail.position).toBe(null);
    });
    it('emits the correct sticky events when stuck/unstuck', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-column name="test">Column content</market-table-column>');
        const el = await page.find('market-table-column');
        const columnStuck = await page.spyOnEvent('marketTableColumnStick');
        const columnUnstuck = await page.spyOnEvent('marketTableColumnUnstick');
        await el.callMethod('stick', 'left');
        expect(columnStuck).toHaveReceivedEventTimes(1);
        expect(columnStuck.lastEvent.detail.position).toBe('left');
        await el.callMethod('unstick');
        expect(columnUnstuck).toHaveReceivedEventTimes(1);
        expect(columnStuck.lastEvent.detail.position).toBe('left');
    });
});
//# sourceMappingURL=market-table-column.e2e.js.map
