import { newE2EPage } from "@stencil/core/testing";
describe('market-table-cell', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-cell>Cell content</market-table-cell>');
        const element = await page.find('market-table-cell');
        expect(element).toHaveAttribute('hydrated');
    });
    it('inherits properties from header market-table-column correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-table>
        <market-table-row slot="header">
          <market-table-column name="fruit" align="right">Fruit</market-table-column>
        </market-table-row>
        <market-table-row>
          <market-table-cell>Mango</market-table-cell>
        </market-table-row>
      </market-table>
    `);
        const column = await page.find('market-table-column');
        const cell = await page.find('market-table-cell');
        expect(column).toEqualAttribute('align', 'right');
        expect(column).toEqualAttribute('name', 'fruit');
        await page.waitForChanges();
        expect(cell).toEqualAttribute('align', 'right');
        expect(cell).toEqualAttribute('column', 'fruit');
    });
    it('inherits indentation from parent market-table-row correctly', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-table>
        <market-table-row leading-indentation="1">
          <market-table-cell>One</market-table-cell>
          <market-table-cell>Two</market-table-cell>
          <market-table-cell>Three</market-table-cell>
        </market-table-row>
      </market-table>
    `);
        const row = await page.find('market-table-row');
        const cells = await page.findAll('market-table-cell');
        expect(row).toEqualAttribute('leading-indentation', '1');
        await page.waitForChanges();
        const computedStyles = await Promise.all([
            cells[0].getComputedStyle(),
            cells[1].getComputedStyle(),
            cells[2].getComputedStyle(),
        ]);
        // note that these values will change if there are indentation-related design token changes
        expect(computedStyles[0].paddingLeft).toBe('48px');
        expect(computedStyles[1].paddingLeft).toBe('8px');
        expect(computedStyles[2].paddingLeft).toBe('8px');
    });
    it('can stick and unstick itself', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-cell>Cell content</market-table-cell>');
        const cell = await page.find('market-table-cell');
        await cell.callMethod('_stickSelf', 'left');
        await page.waitForChanges();
        expect(cell).toEqualAttribute('slot', 'sticky-left');
        await cell.callMethod('_stickSelf', 'right');
        await page.waitForChanges();
        expect(cell).toEqualAttribute('slot', 'sticky-right');
        await cell.callMethod('_unstickSelf', '');
        await page.waitForChanges();
        expect(cell).not.toHaveAttribute('slot');
    });
    it('emits the correct event when clicked if interactive', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-cell interactive></market-table-cell>');
        const el = await page.find('market-table-cell');
        const clickEvent = await page.spyOnEvent('marketTableCellClicked');
        await el.click();
        expect(clickEvent).toHaveReceivedEvent();
    });
    it('does not emit event when clicked if interactive and disabled', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-cell interactive disabled></market-table-cell>');
        const el = await page.find('market-table-cell');
        const clickEvent = await page.spyOnEvent('marketTableCellClicked');
        await el.click();
        expect(clickEvent).toHaveReceivedEventTimes(0);
    });
    describe('interactive table cell accessibility', () => {
        let page;
        let cell;
        let parent;
        let clickEvent;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <div class="parent">
          <market-table-cell interactive>Apple</market-table-cell>
        </div>
      `);
            cell = await page.find('market-table-cell');
            parent = await page.find('.parent');
            clickEvent = await page.spyOnEvent('marketTableCellClicked');
        });
        it('can be tabbed in to', async () => {
            await parent.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(cell);
        });
        it('can be tabbed out of', async () => {
            await cell.focus();
            expect(await page.find(':focus')).toEqual(cell);
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(cell);
        });
        it('hitting enter emits the click event', async () => {
            await cell.focus();
            expect(await page.find(':focus')).toEqual(cell);
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(clickEvent).toHaveReceivedEventTimes(1);
        });
        it('hitting space emits the click event', async () => {
            await cell.focus();
            expect(await page.find(':focus')).toEqual(cell);
            await page.keyboard.press(' ');
            await page.waitForChanges();
            expect(clickEvent).toHaveReceivedEventTimes(1);
        });
        it('does not intercept keyboard events of descendant elements', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-table-cell interactive>
          <input type="text" />
        </market-table-cell>
      `);
            const input = await page.find('input');
            await input.focus();
            await page.keyboard.type('A sentence with spaces.');
            expect(await input.getProperty('value')).toEqual('A sentence with spaces.');
        });
    });
});
//# sourceMappingURL=market-table-cell.e2e.js.map
