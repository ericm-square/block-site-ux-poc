import { newE2EPage } from "@stencil/core/testing";
describe('market-action-card', () => {
    it('should render with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-action-card></market-action-card>');
        const el = await page.find('market-action-card');
        expect(el).not.toBeNull();
        expect(el).not.toHaveClass('has-slotted-row');
        expect(el).not.toHaveAttribute('disabled');
        expect(el).not.toHaveAttribute('selected');
    });
    it('should not emit event when disabled', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-action-card disabled></market-action-card>');
        const el = await page.find('market-action-card');
        expect(el).toHaveAttribute('disabled');
        const cardSelected = await page.spyOnEvent('marketCardSelected');
        await el.click();
        await page.waitForChanges();
        expect(cardSelected).not.toHaveReceivedEvent();
    });
    it('should have selected attribute after being selected', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-action-card></market-action-card>');
        const el = await page.find('market-action-card');
        expect(el).not.toHaveAttribute('selected');
        await el.click();
        await page.waitForChanges();
        expect(el).toHaveAttribute('selected');
    });
    it('should emit selection event on click, and deselect on subsequent click', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-action-card></market-action-card>');
        const el = await page.find('market-action-card');
        const cardSelected = await page.spyOnEvent('marketCardSelected');
        const cardDeselected = await page.spyOnEvent('marketCardDeselected');
        await el.click();
        await page.waitForChanges();
        expect(cardSelected).toHaveReceivedEventTimes(1);
        expect(cardDeselected).not.toHaveReceivedEvent();
        await el.click();
        await page.waitForChanges();
        expect(cardSelected).toHaveReceivedEventTimes(1);
        expect(cardDeselected).toHaveReceivedEventTimes(1);
    });
    describe('with a slotted row', () => {
        it('should render with slotted row and slotted row class', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-action-card>
          <market-row>Apple</market-row>
        </market-action-card>
      `);
            const el = await page.find('market-action-card');
            const rowElement = await page.find('market-row');
            expect(rowElement).not.toBeNull();
            expect(el).toHaveClass('has-slotted-row');
        });
        it('should proxy row events with card events after being clicked', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-action-card>
          <market-row interactive>Apple</market-row>
        </market-action-card>
      `);
            const rowElement = await page.find('market-row');
            const cardElement = await page.find('market-action-card');
            const cardSelected = await page.spyOnEvent('marketCardSelected');
            const cardDeselected = await page.spyOnEvent('marketCardDeselected');
            const rowSelected = await page.spyOnEvent('marketRowSelected');
            const rowDeselected = await page.spyOnEvent('marketRowDeselected');
            await rowElement.click();
            await page.waitForChanges();
            expect(cardSelected).toHaveReceivedEventTimes(1);
            expect(rowSelected).not.toHaveReceivedEvent();
            expect(cardElement).toHaveAttribute('selected');
            await rowElement.click();
            await page.waitForChanges();
            expect(cardDeselected).toHaveReceivedEventTimes(1);
            expect(rowDeselected).not.toHaveReceivedEvent();
            expect(cardElement).not.toHaveAttribute('selected');
        });
    });
    describe('in a list with slotted rows', () => {
        it('deselects card when the contained row is deselected', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-list interactive>
          <market-action-card value="apple" class="apple-card">
            <market-row interactive class="apple-row">Apple</market-row>
          </market-action-card>
          <market-action-card value="orange" class="orange-card">
            <market-row interactive class="orange-row">Orange</market-row>
          </market-action-card>
          <market-action-card value="pear">
            <market-row interactive>Pear</market-row>
          </market-action-card>
        </market-list>
      `);
            const appleRowElement = await page.find('.apple-row');
            const orangeRowElement = await page.find('.orange-row');
            const appleCardElement = await page.find('.apple-card');
            const orangeCardElement = await page.find('.orange-card');
            await appleRowElement.click();
            await page.waitForChanges();
            expect(appleCardElement).toHaveAttribute('selected');
            expect(orangeCardElement).not.toHaveAttribute('selected');
            await orangeRowElement.click();
            await page.waitForChanges();
            expect(appleCardElement).not.toHaveAttribute('selected');
            expect(orangeCardElement).toHaveAttribute('selected');
        });
        it('sets the contained row as selected when it is selected', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-list interactive value="apple">
          <market-action-card value="apple">
            <market-row class="apple-row">
              <market-radio slot="control"></market-radio>
              Apple
            </market-row>
          </market-action-card>
          <market-action-card class="orange-row">
            <market-row interactive value="orange">
              <market-radio slot="control"></market-radio>
              Orange
            </market-row>
          </market-action-card>
          <market-action-card class="pear-row">
            <market-row interactive value="pear">
              <market-radio slot="control"></market-radio>
              Pear
            </market-row>
          </market-action-card>
        </market-list>
      `);
            const appleCardElement = await page.find('market-action-card[value="apple"]');
            const appleRowElement = await page.find('.apple-row');
            expect(appleCardElement).toHaveAttribute('selected');
            expect(appleRowElement).toHaveAttribute('selected');
        });
    });
    describe('accessibility', () => {
        let page;
        let card;
        let container;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <div class="container">
          <market-action-card>
            <market-row>
              <label slot="label">Apple</label>
              <market-checkbox slot="control"></market-checkbox>
            </market-row>
          </market-action-card>
        </div>
      `);
            await page.waitForChanges();
            container = await page.find('.container');
            card = await page.find('market-action-card');
        });
        it('can be tabbed into', async () => {
            await container.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(card);
        });
        it('can be tabbed out of', async () => {
            await card.focus();
            expect(await page.find(':focus')).toEqual(card);
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(card);
        });
        it('activates the underlying control when tabbed into', async () => {
            await card.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            const focusedElement = await page.find(':focus');
            expect(focusedElement.tagName).toBe('MARKET-CHECKBOX');
            const checkboxSelected = await page.spyOnEvent('marketCheckboxValueChange');
            expect(checkboxSelected).not.toHaveReceivedEvent();
            await page.keyboard.press('Space');
            await page.waitForChanges();
            // activates the embedded control
            expect(checkboxSelected).toHaveReceivedEvent();
        });
        it('cannot be tabbed into when disabled', async () => {
            card.setProperty('disabled', true);
            await page.waitForChanges();
            await container.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(card);
        });
        it('hitting enter selects the focused card', async () => {
            await card.focus();
            expect(await page.find(':focus')).toEqual(card);
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(card).toHaveAttribute('selected');
        });
        it('hitting space selects the focused card', async () => {
            await card.focus();
            expect(await page.find(':focus')).toEqual(card);
            await page.keyboard.press('Space');
            await page.waitForChanges();
            expect(card).toHaveAttribute('selected');
        });
    });
});
//# sourceMappingURL=market-action-card.e2e.js.map
