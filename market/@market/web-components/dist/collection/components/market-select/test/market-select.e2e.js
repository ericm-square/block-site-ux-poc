import { newE2EPage } from "@stencil/core/testing";
describe('market-select', () => {
    let page;
    let el;
    let popover;
    let popoverSelector;
    let marketSelectClosedSpy;
    let marketSelectValueDidChangeSpy;
    describe('when rendered with defaults', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-select name="my-select">
          <label>Label</label>
          <market-list slot="list">
            <market-row value="apple">Apple</market-row>
            <market-row value="banana">Banana</market-row>
            <market-row value="orange">Orange</market-row>
            <market-row value="pear">Pear</market-row>
          </market-list>
        </market-select>
      `);
            el = await page.find('market-select');
            popoverSelector = `#${el.getAttribute('aria-controls')}`;
            marketSelectClosedSpy = await el.spyOnEvent('marketSelectClosed');
        });
        it('renders', () => {
            expect(el).not.toBeNull();
        });
        it('initializes the properties correctly', async () => {
            expect(el.getAttribute('name')).toBe('my-select');
            expect(el).not.toHaveAttribute('readonly');
            expect(el).not.toHaveAttribute('disabled');
            expect(el).not.toHaveAttribute('focused');
            expect(el).not.toHaveAttribute('invalid');
            expect(el).not.toHaveAttribute('required');
            expect(el).not.toHaveAttribute('multiselect');
            expect(el.getAttribute('value')).toBe('');
            expect(await el.getProperty('value')).toBe('');
        });
        it('sets the correct aria attributes', () => {
            expect(el.getAttribute('tabindex')).toBe('0');
            expect(el.getAttribute('role')).toBe('combobox');
            expect(el.getAttribute('aria-expanded')).toBe('false');
            // aria-controls = randomly generated ID of popover
            expect(el.getAttribute('aria-controls')).toMatch(/^popover-/);
        });
        it('renders the caret', async () => {
            const caret = await el.find('pierce/svg.caret');
            expect(caret).not.toBeNull();
        });
        it('does not display a selection', async () => {
            const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
            expect(displayedSelection).toBeNull();
        });
        it('moves the slotted list to the popover', async () => {
            // open the list to inspect the popover
            await el.callMethod('openList');
            await page.waitForChanges();
            popover = await page.find(popoverSelector);
            expect(popover).not.toBeNull();
            expect(await popover.isVisible()).toBe(true);
            const list = await popover.find('market-list');
            expect(list).not.toBeNull();
            expect(list.getAttribute('role')).toBe('listbox');
            expect(await list.getProperty('interactive')).toBe(true);
            expect(await list.getProperty('multiselect')).toBe(false);
            const rows = await list.findAll('market-row');
            expect(rows.length).toEqual(4);
            expect(rows[0].getAttribute('value')).toBe('apple');
            expect(rows[1].getAttribute('value')).toBe('banana');
            expect(rows[2].getAttribute('value')).toBe('orange');
            expect(rows[3].getAttribute('value')).toBe('pear');
        });
        it('closes the list when removed from the DOM', async () => {
            // open the list
            await el.callMethod('openList');
            await page.waitForChanges();
            // remove from DOM
            await el.callMethod('remove');
            popover = await page.find(popoverSelector);
            expect(popover).toBeNull();
            expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
        });
    });
    describe('when rendered with an invalid initial value', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-select name="my-select" value="broccoli">
          <label>Label</label>
          <market-list slot="list">
            <market-row value="apple">Apple</market-row>
            <market-row value="banana">Banana</market-row>
            <market-row value="orange">Orange</market-row>
            <market-row value="pear">Pear</market-row>
          </market-list>
        </market-select>
      `);
            el = await page.find('market-select');
        });
        it('resets the value to empty', async () => {
            expect(el.getAttribute('value')).toBe('');
            expect(await el.getProperty('value')).toBe('');
        });
        it('does not display a current selection', async () => {
            const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
            expect(displayedSelection).toBeNull();
        });
    });
    describe('when rendered with a valid initial value', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-select name="my-select" value="orange">
          <label>Label</label>
          <market-list slot="list">
            <market-row value="apple">Apple</market-row>
            <market-row value="banana">Banana</market-row>
            <market-row value="orange">Orange</market-row>
            <market-row value="pear">Pear</market-row>
          </market-list>
        </market-select>
      `);
            el = await page.find('market-select');
            popoverSelector = `#${el.getAttribute('aria-controls')}`;
            marketSelectValueDidChangeSpy = await el.spyOnEvent('marketSelectValueDidChange');
        });
        it('respects the initial value', async () => {
            expect(el.getAttribute('value')).toBe('orange');
            expect(await el.getProperty('value')).toBe('orange');
        });
        it('displays the current selection', async () => {
            const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
            expect(displayedSelection).not.toBeNull();
            expect(displayedSelection).toEqualText('Orange');
            expect(displayedSelection.getAttribute('value')).toBe('orange');
        });
        describe('when a row is dynamically added to the slotted list', () => {
            beforeEach(async () => {
                const slottedList = await el.find('market-list[slot="list"]');
                slottedList.innerHTML = `${slottedList.innerHTML}<market-row value="strawberry">Strawberry</market-row>`;
                await page.waitForChanges();
            });
            it('correctly updates the moved list in the popover', async () => {
                // open the list to inspect the popover
                await el.callMethod('openList');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
                const rows = await popover.findAll('market-row');
                expect(rows.length).toEqual(5);
                expect(rows[0].getAttribute('value')).toBe('apple');
                expect(rows[1].getAttribute('value')).toBe('banana');
                expect(rows[2].getAttribute('value')).toBe('orange');
                expect(rows[3].getAttribute('value')).toBe('pear');
                expect(rows[4].getAttribute('value')).toBe('strawberry');
            });
            it('maintains the current value', async () => {
                expect(el.getAttribute('value')).toEqual('orange');
                expect(await el.getProperty('value')).toEqual('orange');
            });
            it('maintains the displayed selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).not.toBeNull();
                expect(displayedSelection).toEqualText('Orange');
                expect(displayedSelection.getAttribute('value')).toBe('orange');
            });
            it('does not emit a change event (like native <select>)', () => {
                expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
            });
        });
        describe('when the selected row is dynamically removed from the slotted list', () => {
            beforeEach(async () => {
                const slottedList = await el.find('market-list[slot="list"]');
                const selectedRow = await slottedList.find('market-row[value="orange"]');
                await selectedRow.callMethod('remove');
                await page.waitForChanges();
            });
            it('correctly updates the moved list in the popover', async () => {
                // open the list to inspect the popover
                await el.callMethod('openList');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
                const rows = await popover.findAll('market-row');
                expect(rows.length).toEqual(3);
                expect(rows[0].getAttribute('value')).toBe('apple');
                expect(rows[1].getAttribute('value')).toBe('banana');
                expect(rows[2].getAttribute('value')).toBe('pear');
            });
            it('resets the value to empty', async () => {
                expect(await el.getProperty('value')).toEqual('');
            });
            it('removes the displayed selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).toBeNull();
            });
            it('does not emit a change event (like native <select>)', () => {
                expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
            });
        });
    });
    describe('when a row using all its named slots is selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-select value="orange">
          <label>Label</label>
          <market-list slot="list">
            <market-row value="orange">
              <label slot="label">Orange</label>
              <p slot="subtext">Subtext</p>
              <label slot="side-label">Side label</label>
              <p slot="side-subtext">Side subtext</p>
              <market-checkbox slot="control"></market-checkbox>
              <market-accessory slot="leading-accessory" size="icon">+</market-accessory>
              <market-accessory slot="trailing-accessory" size="icon">+</market-accessory>
            </market-row>
          </market-list>
        </market-select>
      `);
            el = await page.find('market-select');
        });
        it('only shows the main label in the displayed selection', async () => {
            const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
            const label = await displayedSelection.find('[slot="label"]');
            expect(await label.isVisible()).toBe(true);
        });
        it('hides all other named slots in the displayed selection', async () => {
            const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
            const subtext = await displayedSelection.find('[slot="subtext"]');
            const sideLabel = await displayedSelection.find('[slot="side-label"]');
            const sideSubtext = await displayedSelection.find('[slot="side-subtext"]');
            const leadingAccessory = await displayedSelection.find('[slot="leading-accessory"]');
            const trailingAccessory = await displayedSelection.find('[slot="trailing-accessory"]');
            const control = await displayedSelection.find('[slot="control"]');
            expect(await subtext.isVisible()).toBe(false);
            expect(await sideLabel.isVisible()).toBe(false);
            expect(await sideSubtext.isVisible()).toBe(false);
            expect(await leadingAccessory.isVisible()).toBe(false);
            expect(await trailingAccessory.isVisible()).toBe(false);
            expect(await control.isVisible()).toBe(false);
        });
    });
    describe('when popoverContainer is specified', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <div id="outer-container">
          <div id="inner-container">
            <market-select name="my-select" popover-container="#inner-container">
              <label>Label</label>
              <market-list slot="list">
                <market-row value="apple">Apple</market-row>
                <market-row value="banana">Banana</market-row>
                <market-row value="orange">Orange</market-row>
                <market-row value="pear">Pear</market-row>
              </market-list>
            </market-select>
          </div>
        </div>
      `);
            el = await page.find('market-select');
            popoverSelector = `#inner-container > #${el.getAttribute('aria-controls')}`;
        });
        it('appends the popover to the specified container', async () => {
            // open the list to inspect the popover
            await el.callMethod('openList');
            await page.waitForChanges();
            popover = await page.find(popoverSelector);
            expect(popover).not.toBeNull();
            expect(await popover.isVisible()).toBe(true);
        });
    });
});
//# sourceMappingURL=market-select.e2e.js.map
