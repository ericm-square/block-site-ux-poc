import { newE2EPage } from "@stencil/core/testing";
describe('market-select: multiselect mode', () => {
    let page;
    let el;
    let popover;
    let popoverSelector;
    let marketSelectClosedSpy;
    let marketSelectValueDidChangeSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-select name="my-select" multiselect>
        <label>Label</label>
        <market-list slot="list" name="my-list">
          <market-row value="apple">Apple</market-row>
          <market-row disabled value="banana">Banana</market-row>
          <market-row value="orange">Orange</market-row>
          <market-row value="pear">Pear</market-row>
        </market-list>
      </market-select>
    `);
        el = await page.find('market-select');
        popoverSelector = `#${el.getAttribute('aria-controls')}`;
        marketSelectClosedSpy = await el.spyOnEvent('marketSelectClosed');
        marketSelectValueDidChangeSpy = await el.spyOnEvent('marketSelectValueDidChange');
    });
    it('renders with defaults', async () => {
        expect(el).not.toBeNull();
        expect(el).toHaveAttribute('multiselect');
        expect(el).not.toHaveAttribute('readonly');
        expect(el).not.toHaveAttribute('disabled');
        expect(el).not.toHaveAttribute('focused');
        expect(el).not.toHaveAttribute('invalid');
        expect(el).not.toHaveAttribute('required');
        expect(await el.getProperty('value')).toBe('');
        expect(el.getAttribute('value')).toBe('');
        expect(el.getAttribute('name')).toBe('my-select');
        expect(el.getAttribute('aria-expanded')).toBe('false');
        const caret = await el.find('pierce/svg.caret');
        expect(caret).not.toBeNull();
    });
    it('does not display a selection', async () => {
        const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
        expect(displayedSelection).toBeNull();
    });
    describe('when opened', () => {
        beforeEach(async () => {
            await el.callMethod('openList');
            await page.waitForChanges();
            popover = await page.find(popoverSelector);
        });
        it('renders the popover with a multiselect list', async () => {
            expect(popover).not.toBeNull();
            expect(await popover.isVisible()).toBe(true);
            const list = await popover.find('market-list');
            expect(list).not.toBeNull();
            expect(list.getAttribute('role')).toBe('listbox');
            expect(await list.getProperty('interactive')).toEqual(true);
            expect(await list.getProperty('multiselect')).toEqual(true);
            const rows = await list.findAll('market-row');
            expect(rows.length).toEqual(4);
        });
    });
    describe('API', () => {
        describe('setting multiple values programmatically', () => {
            beforeEach(async () => {
                el.setProperty('value', 'orange,pear');
                await page.waitForChanges();
            });
            it('updates the value attribute and property', async () => {
                expect(el.getAttribute('value')).toBe('orange,pear');
                expect(await el.getProperty('value')).toEqual('orange,pear');
            });
            it('does not emit a change event (like a native <select>)', () => {
                expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
            });
            it('updates the displayed selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).not.toBeNull();
                expect(displayedSelection).toEqualText('2 selected');
            });
        });
    });
    describe('mouse interaction', () => {
        describe('when an option is clicked', () => {
            let orangeRow;
            beforeEach(async () => {
                await el.click();
                popover = await page.find(popoverSelector);
                orangeRow = await popover.find('market-row[value="orange"]');
                await orangeRow.click();
            });
            it('updates the value property & attribute', async () => {
                expect(el.getAttribute('value')).toBe('orange');
                expect(await el.getProperty('value')).toEqual('orange');
            });
            it('emits the change event', () => {
                expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('orange');
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.newSelectedOption).toBeTruthy();
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.newDeselectedOption).toBeFalsy();
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.currentSelectedOptions.length).toEqual(1);
            });
            it('updates the displayed selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).not.toBeNull();
                expect(displayedSelection).toEqualText('Orange');
                expect(displayedSelection.getAttribute('value')).toBe('orange');
            });
            it('does not close or remove the popover', async () => {
                expect(el.getAttribute('aria-expanded')).toBe('true');
                popover = await page.find(popoverSelector);
                expect(popover).not.toBeNull();
                expect(await popover.isVisible()).toBe(true);
                expect(marketSelectClosedSpy).not.toHaveReceivedEvent();
            });
            describe('when a second option is clicked', () => {
                beforeEach(async () => {
                    const appleRow = await popover.find('market-row[value="apple"]');
                    await appleRow.click();
                });
                it('updates the value property & attribute', async () => {
                    expect(el.getAttribute('value')).toBe('orange,apple');
                    expect(await el.getProperty('value')).toEqual('orange,apple');
                });
                it('emits an additional change event', () => {
                    // first event was already fired, this is the second event!
                    expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(2);
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('orange,apple');
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.newSelectedOption).toBeTruthy();
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.newDeselectedOption).toBeFalsy();
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.currentSelectedOptions.length).toEqual(2);
                });
                it('updates the displayed selection', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).not.toBeNull();
                    expect(displayedSelection.innerText).toStrictEqual('2 selected');
                });
                it('does not close or remove the popover', async () => {
                    expect(el.getAttribute('aria-expanded')).toBe('true');
                    popover = await page.find(popoverSelector);
                    expect(popover).not.toBeNull();
                    expect(await popover.isVisible()).toBe(true);
                    expect(marketSelectClosedSpy).not.toHaveReceivedEvent();
                });
                describe('when the first option is clicked again (deselected)', () => {
                    beforeEach(async () => {
                        await orangeRow.click();
                    });
                    it('updates the value property & attribute', async () => {
                        expect(el.getAttribute('value')).toBe('apple');
                        expect(await el.getProperty('value')).toEqual('apple');
                    });
                    it('emits an additional change event', () => {
                        // first two events already fired, this is the third event!
                        expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(3);
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('apple');
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.newSelectedOption).toBeFalsy();
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.newDeselectedOption).toBeTruthy();
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.currentSelectedOptions.length).toEqual(1);
                    });
                    it('updates the displayed selection', async () => {
                        const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                        expect(displayedSelection).not.toBeNull();
                        expect(displayedSelection).toEqualText('Apple');
                        expect(displayedSelection.getAttribute('value')).toBe('apple');
                    });
                    it('does not close or remove the popover', async () => {
                        expect(el.getAttribute('aria-expanded')).toBe('true');
                        popover = await page.find(popoverSelector);
                        expect(popover).not.toBeNull();
                        expect(marketSelectClosedSpy).not.toHaveReceivedEvent();
                    });
                });
            });
        });
    });
    describe('keyboard interaction', () => {
        describe('when an option is selected', () => {
            beforeEach(async () => {
                // focus select
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                // open it
                await page.keyboard.press(' ');
                await page.waitForChanges();
                // focus first option
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                // select it
                await page.keyboard.press(' ');
                await page.waitForChanges();
            });
            it('updates the value property & attribute', async () => {
                expect(el.getAttribute('value')).toEqual('apple');
                expect(await el.getProperty('value')).toEqual('apple');
            });
            it('emits the change event', () => {
                expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('apple');
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.newSelectedOption).toBeTruthy();
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.newDeselectedOption).toBeFalsy();
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.currentSelectedOptions.length).toEqual(1);
            });
            it('updates the displayed selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).toEqualText('Apple');
                expect(displayedSelection.getAttribute('value')).toEqual('apple');
            });
            it('does not close or remove the popover', async () => {
                expect(el.getAttribute('aria-expanded')).toBe('true');
                popover = await page.find(popoverSelector);
                expect(popover).not.toBeNull();
                expect(await popover.isVisible()).toBe(true);
                expect(marketSelectClosedSpy).not.toHaveReceivedEvent();
            });
            describe('when a second option is selected', () => {
                beforeEach(async () => {
                    // focus next option
                    await page.keyboard.press('ArrowDown');
                    await page.waitForChanges();
                    // select it
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
                });
                it('updates the value property & attribute', async () => {
                    expect(el.getAttribute('value')).toBe('apple,orange');
                    expect(await el.getProperty('value')).toEqual('apple,orange');
                });
                it('emits an additional change event', () => {
                    // first event was already fired, this is the second event!
                    expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(2);
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('apple,orange');
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.newSelectedOption).toBeTruthy();
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.newDeselectedOption).toBeFalsy();
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.currentSelectedOptions.length).toEqual(2);
                });
                it('updates the displayed selection', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).not.toBeNull();
                    expect(displayedSelection.innerText).toStrictEqual('2 selected');
                });
                it('does not close or remove the popover', async () => {
                    expect(el.getAttribute('aria-expanded')).toBe('true');
                    popover = await page.find(popoverSelector);
                    expect(popover).not.toBeNull();
                    expect(await popover.isVisible()).toBe(true);
                    expect(marketSelectClosedSpy).not.toHaveReceivedEvent();
                });
                describe('when the second option is deselected', () => {
                    beforeEach(async () => {
                        // already focused, deselect it
                        await page.keyboard.press(' ');
                        await page.waitForChanges();
                    });
                    it('updates the value property & attribute', async () => {
                        expect(el.getAttribute('value')).toBe('apple');
                        expect(await el.getProperty('value')).toEqual('apple');
                    });
                    it('emits an additional change event', () => {
                        // first two events already fired, this is the third event!
                        expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(3);
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('apple');
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.newSelectedOption).toBeFalsy();
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.newDeselectedOption).toBeTruthy();
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.currentSelectedOptions.length).toEqual(1);
                    });
                    it('updates the displayed selection', async () => {
                        const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                        expect(displayedSelection).not.toBeNull();
                        expect(displayedSelection).toEqualText('Apple');
                        expect(displayedSelection.getAttribute('value')).toBe('apple');
                    });
                    it('does not close or remove the popover', async () => {
                        expect(el.getAttribute('aria-expanded')).toBe('true');
                        popover = await page.find(popoverSelector);
                        expect(popover).not.toBeNull();
                        expect(marketSelectClosedSpy).not.toHaveReceivedEvent();
                    });
                });
            });
        });
    });
    describe('localization', () => {
        describe('with a selected translation provided', () => {
            beforeEach(async () => {
                el.innerHTML = `${el.innerHTML}<span slot="selected-translation">fruits selected</span>`;
                await page.waitForChanges();
            });
            describe('when multiple items are selected', () => {
                beforeEach(async () => {
                    await el.click();
                    popover = await page.find(popoverSelector);
                    const appleRow = await popover.find('market-row[value="apple"]');
                    const orangeRow = await popover.find('market-row[value="orange"]');
                    await appleRow.click();
                    await orangeRow.click();
                });
                it('uses the provided translation in the displayed selection', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).not.toBeNull();
                    expect(displayedSelection.innerText).toStrictEqual('2 fruits selected');
                });
            });
        });
    });
});
//# sourceMappingURL=market-select.multiselect.e2e.js.map
