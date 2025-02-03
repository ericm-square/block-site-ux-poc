import { newE2EPage } from "@stencil/core/testing";
describe('market-select: typeahead functionality', () => {
    const typeaheadTimeout = 250;
    let page;
    let el;
    let popover;
    let popoverSelector;
    let marketSelectValueDidChangeSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-select name="my-select">
        <label>Label</label>
        <market-list slot="list" name="my-list">
          <market-row value="apple">Apple</market-row>
          <market-row value="banana" disabled>Banana</market-row>
          <market-row value="peach">Peach</market-row>
          <market-row value="pear">Pear</market-row>
        </market-list>
      </market-select>
    `);
        el = await page.find('market-select');
        popoverSelector = `#${el.getAttribute('aria-controls')}`;
        marketSelectValueDidChangeSpy = await el.spyOnEvent('marketSelectValueDidChange');
    });
    describe('when the select has focus but is still closed', () => {
        beforeEach(async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
        });
        describe("when the first letters of an option's value are typed (within the timeout)", () => {
            beforeEach(async () => {
                await page.keyboard.type('pea');
                await page.waitForTimeout(typeaheadTimeout);
                await page.waitForChanges();
            });
            it('selects the first option that starts with those letters', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).toEqualText('Peach');
                expect(displayedSelection.getAttribute('value')).toEqual('peach');
            });
            it('updates the value property & attribute', async () => {
                expect(el.getAttribute('value')).toEqual('peach');
                expect(await el.getProperty('value')).toEqual('peach');
            });
            it('emits the change event', () => {
                expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('peach');
            });
            describe('when the letters are typed again (within the timeout)', () => {
                beforeEach(async () => {
                    await page.keyboard.type('pea');
                    await page.waitForTimeout(typeaheadTimeout);
                    await page.waitForChanges();
                });
                it('selects the next option that starts with those letters', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).toEqualText('Pear');
                    expect(displayedSelection.getAttribute('value')).toEqual('pear');
                });
                it('updates the value property & attribute', async () => {
                    expect(el.getAttribute('value')).toEqual('pear');
                    expect(await el.getProperty('value')).toEqual('pear');
                });
                it('emits another change event', () => {
                    expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(2);
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('pear');
                });
                describe('when the final match is selected and the letters are typed again', () => {
                    beforeEach(async () => {
                        await page.keyboard.type('pea');
                        await page.waitForTimeout(typeaheadTimeout);
                        await page.waitForChanges();
                    });
                    it('wraps around the end of the list and selects the first match again', async () => {
                        const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                        expect(displayedSelection).toEqualText('Peach');
                        expect(displayedSelection.getAttribute('value')).toEqual('peach');
                    });
                    it('updates the value property & attribute', async () => {
                        expect(el.getAttribute('value')).toEqual('peach');
                        expect(await el.getProperty('value')).toEqual('peach');
                    });
                    it('emits another change event', () => {
                        expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(3);
                        expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('peach');
                    });
                });
            });
            describe('when letters are typed that do not match any values', () => {
                beforeEach(async () => {
                    await page.keyboard.type('x');
                    await page.waitForTimeout(typeaheadTimeout);
                    await page.waitForChanges();
                });
                it('does not change the selection', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).toEqualText('Peach');
                    expect(displayedSelection.getAttribute('value')).toEqual('peach');
                });
                it('does not change the value property & attribute', async () => {
                    expect(el.getAttribute('value')).toEqual('peach');
                    expect(await el.getProperty('value')).toEqual('peach');
                });
                it('does not emit another change event', () => {
                    expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(1);
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('peach');
                });
            });
            describe('when letters are typed that match a disabled option', () => {
                beforeEach(async () => {
                    await page.keyboard.type('ban');
                    await page.waitForTimeout(typeaheadTimeout);
                    await page.waitForChanges();
                });
                it('does not change the selection', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).toEqualText('Peach');
                    expect(displayedSelection.getAttribute('value')).toEqual('peach');
                });
                it('does not change the value property & attribute', async () => {
                    expect(el.getAttribute('value')).toEqual('peach');
                    expect(await el.getProperty('value')).toEqual('peach');
                });
                it('does not emit another change event', () => {
                    expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(1);
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('peach');
                });
            });
        });
    });
    describe('when the select has focus and is open', () => {
        let rows;
        beforeEach(async () => {
            await page.keyboard.press('Tab');
            await page.keyboard.press(' ');
            await page.waitForChanges();
            popover = await page.find(popoverSelector);
            rows = await popover.findAll('market-row');
        });
        describe("when the first letters of an option's value are typed (within the timeout)", () => {
            beforeEach(async () => {
                await page.keyboard.type('pea');
                await page.waitForTimeout(typeaheadTimeout);
                await page.waitForChanges();
            });
            it('focuses the first option that starts with those letters', async () => {
                expect(await page.find('.pseudo-focus')).toEqual(rows[2]);
                expect(rows[2].getAttribute('value')).toBe('peach');
            });
            it('does not update the displayed selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).toBeNull();
            });
            it('does not update the value property & attribute', async () => {
                expect(el.getAttribute('value')).toEqual('');
                expect(await el.getProperty('value')).toEqual('');
            });
            it('does not emit the change event', () => {
                expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
            });
            describe('when the letters are typed again (within the timeout)', () => {
                beforeEach(async () => {
                    await page.keyboard.type('pea');
                    await page.waitForTimeout(typeaheadTimeout);
                    await page.waitForChanges();
                });
                it('focuses the next option that starts with those letters', async () => {
                    expect(await page.find('.pseudo-focus')).toEqual(rows[3]);
                    expect(rows[3].getAttribute('value')).toBe('pear');
                });
                it('does not update the displayed selection', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).toBeNull();
                });
                it('does not update the value property & attribute', async () => {
                    expect(el.getAttribute('value')).toEqual('');
                    expect(await el.getProperty('value')).toEqual('');
                });
                it('does not emit the change event', () => {
                    expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
                });
                describe('when the final match is focused and the letters are typed again', () => {
                    beforeEach(async () => {
                        await page.keyboard.type('pea');
                        await page.waitForTimeout(typeaheadTimeout);
                        await page.waitForChanges();
                    });
                    it('wraps around the end of the list and focuses the first match again', async () => {
                        expect(await page.find('.pseudo-focus')).toEqual(rows[2]);
                        expect(rows[2].getAttribute('value')).toBe('peach');
                    });
                    it('does not update the displayed selection', async () => {
                        const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                        expect(displayedSelection).toBeNull();
                    });
                    it('does not update the value property & attribute', async () => {
                        expect(el.getAttribute('value')).toEqual('');
                        expect(await el.getProperty('value')).toEqual('');
                    });
                    it('does not emit the change event', () => {
                        expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
                    });
                });
            });
            describe('when letters are typed that do not match any values', () => {
                beforeEach(async () => {
                    await page.keyboard.type('x');
                    await page.waitForTimeout(typeaheadTimeout);
                    await page.waitForChanges();
                });
                it('keeps focus on the same row', async () => {
                    expect(await page.find('.pseudo-focus')).toEqual(rows[2]);
                    expect(rows[2].getAttribute('value')).toBe('peach');
                });
            });
            describe('when letters are typed that match a disabled option', () => {
                beforeEach(async () => {
                    await page.keyboard.type('ban');
                    await page.waitForTimeout(typeaheadTimeout);
                    await page.waitForChanges();
                });
                it('keeps focus on the same row', async () => {
                    expect(await page.find('.pseudo-focus')).toEqual(rows[2]);
                    expect(rows[2].getAttribute('value')).toBe('peach');
                });
            });
        });
    });
});
//# sourceMappingURL=market-select.typeahead.e2e.js.map
