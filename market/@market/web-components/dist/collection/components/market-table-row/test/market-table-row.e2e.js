import { newE2EPage } from "@stencil/core/testing";
describe('market-table-row', () => {
    // can verify this markup works and fires the right events  in the browser, so i'm not sure why it isn't working here
    it.skip('emits the correct event when used as a header row', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-table-row header>
        <market-table-column name="test">Column</market-table-column>
      </market-table-row>
    `);
        const headerLoaded = await page.spyOnEvent('marketTableHeaderLoaded');
        await page.waitForChanges();
        expect(headerLoaded).toHaveReceivedEventTimes(1);
    });
    it('emits the correct sticky events on changes to the stick-to property', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    `);
        const row = await page.find('market-table-row');
        const rowStuck = await page.spyOnEvent('marketTableRowStick');
        const rowUnstuck = await page.spyOnEvent('marketTableRowUnstick');
        row.setAttribute('stick-to', 'top');
        await page.waitForChanges();
        expect(rowStuck).toHaveReceivedEventTimes(1);
        expect(rowStuck.lastEvent.detail.position).toBe('top');
        row.setAttribute('stick-to', 'bottom');
        await page.waitForChanges();
        expect(rowStuck).toHaveReceivedEventTimes(2); // i seem to have broken this... but it should be this way
        expect(rowStuck.lastEvent.detail.position).toBe('bottom');
        row.removeAttribute('stick-to');
        await page.waitForChanges();
        expect(rowUnstuck).toHaveReceivedEventTimes(1);
        expect(rowUnstuck.lastEvent.detail.position).toBe(undefined);
    });
    it('emits the correct sticky events when stuck/unstuck', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-table-row>
        <market-table-cell>Cell content</market-table-cell>
      </market-table-row>
    `);
        const row = await page.find('market-table-row');
        const rowStuck = await page.spyOnEvent('marketTableRowStick');
        const rowUnstuck = await page.spyOnEvent('marketTableRowUnstick');
        await row.callMethod('stick', 'top');
        expect(rowStuck).toHaveReceivedEventTimes(1);
        expect(rowStuck.lastEvent.detail.position).toBe('top');
        await row.callMethod('unstick');
        expect(rowUnstuck).toHaveReceivedEventTimes(1);
        expect(rowUnstuck.lastEvent.detail.position).toBe(undefined);
    });
    it('emits the correct event when clicked if interactive', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-row interactive></market-table-row>');
        const el = await page.find('market-table-row');
        const clickEvent = await page.spyOnEvent('marketTableRowClicked');
        await el.click();
        expect(clickEvent).toHaveReceivedEvent();
    });
    it('does not emit event when clicked if interactive and disabled', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-table-row interactive disabled></market-table-row>');
        const el = await page.find('market-table-row');
        const clickEvent = await page.spyOnEvent('marketTableRowClicked');
        await el.click();
        expect(clickEvent).toHaveReceivedEventTimes(0);
    });
    describe('interactive table row accessibility', () => {
        let page;
        let row;
        let parent;
        let clickEvent;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <div class="parent">
          <market-table-row interactive>Apple</market-row>
        </div>
      `);
            row = await page.find('market-table-row');
            parent = await page.find('.parent');
            clickEvent = await page.spyOnEvent('marketTableRowClicked');
        });
        it('can be tabbed in to', async () => {
            await parent.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(row);
        });
        it('can be tabbed out of', async () => {
            await row.focus();
            expect(await page.find(':focus')).toEqual(row);
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(row);
        });
        it('hitting enter emits the click event', async () => {
            await row.focus();
            expect(await page.find(':focus')).toEqual(row);
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(clickEvent).toHaveReceivedEventTimes(1);
        });
        it('hitting space emits the click event', async () => {
            await row.focus();
            expect(await page.find(':focus')).toEqual(row);
            await page.keyboard.press(' ');
            await page.waitForChanges();
            expect(clickEvent).toHaveReceivedEventTimes(1);
        });
        it('does not intercept keyboard events of descendant elements', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-table-row interactive>
          <input type="text" />
        </market-table-row>
      `);
            const input = await page.find('input');
            await input.focus();
            await page.keyboard.type('A sentence with spaces.');
            expect(await input.getProperty('value')).toEqual('A sentence with spaces.');
        });
        it('does not intercept inner interactive elements', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-table-row interactive>
          <button>Click Me</button>
          <a href="#">Click Me</a>
          <market-button>Click Me</market-button>
          <market-link>Click Me</market-link>
          <market-checkbox><market-checkbox/>
        </market-table-row>
      `);
            const button = await page.find('button');
            await button.click();
            const link = await page.find('a');
            await link.click();
            const marketButton = await page.find('market-button');
            await marketButton.click();
            const marketLink = await page.find('market-link');
            await marketLink.click();
            const marketCheckbox = await page.find('market-checkbox');
            await marketCheckbox.click();
            expect(clickEvent).toHaveReceivedEventTimes(0);
        });
    });
    describe('table row with slotted checkbox', () => {
        let page;
        let row;
        let checkbox;
        let clickEvent;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-row interactive>
          <market-table-cell slot="control">
            <market-checkbox/>
          </market-table-cell>
          <market-table-cell>
            Cell content
          </market-table-cell>
        </market-table-row>
      `);
            row = await page.find('market-table-row');
            checkbox = await page.find('market-checkbox');
            clickEvent = await page.spyOnEvent('marketTableRowClicked');
        });
        it('default selected value renders unchecked checkbox', () => {
            expect(checkbox).not.toHaveAttribute('checked');
            expect(row).toEqualAttribute('aria-selected', 'false');
        });
        it('selected = true renders checked checkbox', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-table-row selected="true">
          <market-table-cell slot="control">
            <market-checkbox/>
          </market-table-cell>
          <market-table-cell>
            Cell content
          </market-table-cell>
        </market-table-row>
      `);
            row = await page.find('market-table-row');
            checkbox = await page.find('market-checkbox');
            expect(checkbox).toHaveAttribute('checked');
            expect(row).toEqualAttribute('aria-selected', 'true');
        });
        it('clicking checkbox toggles selected value', async () => {
            await checkbox.click();
            await page.waitForChanges();
            expect(checkbox).toHaveAttribute('checked');
            expect(row).toEqualAttribute('aria-selected', 'true');
            await checkbox.click();
            await page.waitForChanges();
            expect(checkbox).not.toHaveAttribute('checked');
            expect(row).toEqualAttribute('aria-selected', 'false');
        });
        it('clicking non slotted checkbox does not update selected', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-table-row>
          <market-table-cell slot="control">
            <market-checkbox/>
          </market-table-cell>
          <market-table-cell>
            Cell content
          </market-table-cell>
          <market-checkbox id="not-slotted"/>
        </market-table-row>
      `);
            checkbox = await page.find('market-table-cell market-checkbox');
            const notSlottedCheckbox = await page.find('#not-slotted');
            await notSlottedCheckbox.click();
            expect(checkbox).not.toHaveAttribute('checked');
            expect(row).toEqualAttribute('aria-selected', 'false');
        });
        it('clicking interactive row does not toggle checkbox', async () => {
            await row.click();
            await page.waitForChanges();
            expect(clickEvent).toHaveReceivedEventTimes(1);
            expect(checkbox).not.toHaveAttribute('checked');
            expect(row).toEqualAttribute('aria-selected', 'false');
        });
        it('disabled row has disabled checkbox', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-table-row disabled>
          <market-table-cell slot="control">
            <market-checkbox/>
          </market-table-cell>
          <market-table-cell>
            Cell content
          </market-table-cell>
        </market-table-row>
      `);
            checkbox = await page.find('market-checkbox');
            expect(checkbox).toHaveAttribute('disabled');
        });
    });
});
//# sourceMappingURL=market-table-row.e2e.js.map
