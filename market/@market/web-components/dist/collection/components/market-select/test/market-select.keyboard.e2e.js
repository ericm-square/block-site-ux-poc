import { newE2EPage } from "@stencil/core/testing";
describe('market-select: keyboard interactivity', () => {
    let page;
    let el;
    let popover;
    let popoverSelector;
    let marketSelectOpenedSpy;
    let marketSelectClosedSpy;
    let marketSelectValueDidChangeSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <form action="#">
        <market-select name="my-select">
          <label>Label</label>
          <market-list slot="list" name="my-list">
            <market-input-search slot="search"></market-input-search>
            <market-row value="apple">Apple</market-row>
            <market-row value="banana" disabled>Banana</market-row>
            <market-row value="peach">Peach</market-row>
            <market-row value="pear">Pear</market-row>
          </market-list>
        </market-select>
        <market-button type="submit">Submit</market-button>
      </form>
    `);
        el = await page.find('market-select');
        popoverSelector = `#${el.getAttribute('aria-controls')}`;
        marketSelectOpenedSpy = await el.spyOnEvent('marketSelectOpened');
        marketSelectClosedSpy = await el.spyOnEvent('marketSelectClosed');
        marketSelectValueDidChangeSpy = await el.spyOnEvent('marketSelectValueDidChange');
    });
    it('can be tabbed in & out of', async () => {
        expect(el).not.toHaveAttribute('focused');
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).toHaveAttribute('focused');
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('focused');
    });
    it('cannot be tabbed into while disabled', async () => {
        el.setProperty('disabled', true);
        await page.waitForChanges();
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('focused');
    });
    describe('when the select has focus', () => {
        beforeEach(async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
        });
        it('opens with the spacebar', async () => {
            await page.keyboard.press(' ');
            await page.waitForChanges();
            popover = await page.find(popoverSelector);
            expect(el.getAttribute('aria-expanded')).toBe('true');
            expect(marketSelectOpenedSpy).toHaveReceivedEventTimes(1);
            expect(await popover.isVisible()).toBe(true);
            expect(el).toHaveAttribute('focused');
        });
        it('opens with the down arrow', async () => {
            await page.keyboard.press('ArrowDown');
            await page.waitForChanges();
            popover = await page.find(popoverSelector);
            expect(el.getAttribute('aria-expanded')).toBe('true');
            expect(marketSelectOpenedSpy).toHaveReceivedEventTimes(1);
            expect(await popover.isVisible()).toBe(true);
            expect(el).toHaveAttribute('focused');
        });
        it('opens with the up arrow', async () => {
            await page.keyboard.press('ArrowUp');
            await page.waitForChanges();
            popover = await page.find(popoverSelector);
            expect(el.getAttribute('aria-expanded')).toBe('true');
            expect(marketSelectOpenedSpy).toHaveReceivedEventTimes(1);
            expect(await popover.isVisible()).toBe(true);
            expect(el).toHaveAttribute('focused');
        });
        it('submits the form with enter', async () => {
            const form = await page.find('form');
            const formSubmitSpy = await form.spyOnEvent('submit');
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(formSubmitSpy).toHaveReceivedEventTimes(1);
        });
        describe('and the select is open', () => {
            beforeEach(async () => {
                await page.keyboard.press(' ');
                await page.waitForChanges();
            });
            it('closes with the escape key', async () => {
                await page.keyboard.press('Escape');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
                expect(el.getAttribute('aria-expanded')).toBe('false');
                expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
                expect(popover).toBeNull();
                expect(el).toHaveAttribute('focused');
            });
            it('closes with enter', async () => {
                await page.keyboard.press('Enter');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
                expect(el.getAttribute('aria-expanded')).toBe('false');
                expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
                expect(popover).toBeNull();
                expect(el).toHaveAttribute('focused');
            });
            it('suppresses the tab key (does not close or lose focus)', async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
                expect(el.getAttribute('aria-expanded')).toBe('true');
                expect(marketSelectClosedSpy).not.toHaveReceivedEvent();
                expect(await popover.isVisible()).toBe(true);
                expect(el).toHaveAttribute('focused');
            });
            it('navigates the row options with up and down arrows', async () => {
                popover = await page.find(popoverSelector);
                const rows = await popover.findAll('market-row');
                // focus 1st row
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find('.pseudo-focus')).toEqual(rows[0]);
                // focus 3rd row (skips 2nd disabled row)
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find('.pseudo-focus')).toEqual(rows[2]);
                // focus 4th row
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find('.pseudo-focus')).toEqual(rows[3]);
                // at the end of the list, so focus stays on the last row
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find('.pseudo-focus')).toEqual(rows[3]);
                // focus 3rd row
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find('.pseudo-focus')).toEqual(rows[2]);
                // focus 1st row (skips 2nd disabled row)
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find('.pseudo-focus')).toEqual(rows[0]);
                // at the beginning of the list, so focus stays on the 1st row
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find('.pseudo-focus')).toEqual(rows[0]);
            });
            describe('and a list option has focus', () => {
                beforeEach(async () => {
                    await page.keyboard.press('ArrowDown');
                    await page.waitForChanges();
                });
                it('closes with the escape key', async () => {
                    await page.keyboard.press('Escape');
                    await page.waitForChanges();
                    popover = await page.find(popoverSelector);
                    expect(el.getAttribute('aria-expanded')).toBe('false');
                    expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
                    expect(popover).toBeNull();
                    expect(el).toHaveAttribute('focused');
                });
                describe('and the spacebar is pressed', () => {
                    beforeEach(async () => {
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
                });
                describe('and enter is pressed', () => {
                    beforeEach(async () => {
                        await page.keyboard.press('Enter');
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
                    it('receives focus', () => {
                        expect(el).toHaveAttribute('focused');
                    });
                    it('sets aria-expanded to false', () => {
                        expect(el.getAttribute('aria-expanded')).toBe('false');
                    });
                    it('removes the popover', async () => {
                        popover = await page.find(popoverSelector);
                        expect(popover).toBeNull();
                    });
                    it('emits the close event', () => {
                        expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
                    });
                });
            });
            describe('and the slotted search input has focus', () => {
                let searchInput;
                let innerInput;
                beforeEach(async () => {
                    searchInput = await page.find('market-input-search');
                    innerInput = await searchInput.find('pierce/input');
                    await innerInput.focus();
                    await page.waitForChanges();
                });
                it('typing filters the list to rows that match the search term', async () => {
                    popover = await page.find(popoverSelector);
                    const rows = await popover.findAll('market-row');
                    await page.keyboard.type('p'); // search string 'p'
                    await page.waitForChanges();
                    let visibleRows = rows.filter((row) => !row.className.includes('hidden'));
                    expect(searchInput.getAttribute('value')).toEqual('p');
                    expect(visibleRows.length).toBe(3); // 'apple', 'peach', 'pear'
                    await page.keyboard.type('p'); // search string 'pp'
                    await page.waitForChanges();
                    visibleRows = rows.filter((row) => !row.className.includes('hidden'));
                    expect(searchInput.getAttribute('value')).toEqual('pp');
                    expect(visibleRows.length).toBe(1); // 'apple'
                });
                it('pressing the spacebar does not close the select popover', async () => {
                    expect(el.getAttribute('aria-expanded')).toBe('true');
                    expect(popover).not.toBeNull();
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
                    expect(el.getAttribute('aria-expanded')).toBe('true');
                    expect(popover).not.toBeNull();
                    expect(marketSelectClosedSpy).toHaveReceivedEventTimes(0);
                });
            });
        });
    });
});
//# sourceMappingURL=market-select.keyboard.e2e.js.map
